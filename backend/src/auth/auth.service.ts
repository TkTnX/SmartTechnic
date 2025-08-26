import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import { ConfigService } from "@nestjs/config";
import { NewPasswordDto } from "./dto/new-password.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MailService } from "src/mail/mail.service";
@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}
  public async register(req: Request, dto: RegisterDto) {
    const isUserExists = await this.userService.findByEmailOrPhone(dto.email);

    if (isUserExists)
      throw new BadGatewayException(
        "Пользователь с таким email уже существует"
      );

    const hashedPassword = await argon2.hash(dto.password);

    const newUser = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    await this.saveSession(req, newUser);

    return await this.verifyEmail(dto.email);
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmailOrPhone(dto.emailOrPhone);

    if (!user) throw new BadGatewayException("Пользователь не найден");

    const isPasswordValid = await argon2.verify(user.password, dto.password);

    if (!isPasswordValid)
      throw new UnauthorizedException("Неверные данные для входа");

    if (user.isTwoFactorEnabled && !dto.code) {
      const token = await this.prismaService.token.create({
        data: {
          email: user.email,
          token: Math.floor(100000 + Math.random() * 900000).toString(),
          type: "TWO_FACTOR",
        },
      });

      await this.mailService.send({
        to: user.email,
        subject: "Двухфакторная аутентификация",
        html: `
        <h1>Двухфакторная аутентификация</h1>
        <p>Код: ${token.token}</p>
        `,
      });

      return {
        message: "Введите код двухфакторной аутентификации",
      };
    }

    if (user.isTwoFactorEnabled && dto.code) {
      const token = await this.prismaService.token.findFirst({
        where: {
          email: user.email,
          type: "TWO_FACTOR",
        },
      });

      if (dto.code === token?.token) {
        await this.prismaService.token.delete({
          where: {
            id: token.id,
          },
        });
      }
    }

    await this.saveSession(req, user);
    return {
      message: "Вы успешно вошли в аккаунт",
    };
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, rej) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(
            new InternalServerErrorException("Не удалось выйти из аккаунта")
          );
        }
        res.clearCookie(this.configService.getOrThrow("SESSION_NAME"), {
          httpOnly: true,
        });
        resolve();
      });
    });
  }

  public async updatePassword(userId: string, dto: NewPasswordDto) {
    const user = await this.userService.findById(userId);

    const isPasswordValid = await argon2.verify(user.password, dto.oldPassword);

    if (!isPasswordValid)
      throw new UnauthorizedException("Неверные данные для входа");

    const hashedPassword = await argon2.hash(dto.newPassword);

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
  }

  private async saveSession(req: Request, user: User) {
    return new Promise((res, rej) => {
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          console.log(err);
          return rej(
            new InternalServerErrorException("Не удалось сохранить сессию")
          );
        }

        res(user);
      });
    });
  }

  public async verifyEmail(email: string, queryToken?: string) {
    const token = await this.prismaService.token.findFirst({
      where: { email, type: "VERIFY_EMAIL" },
    });

    if (queryToken && token) {
      await this.prismaService.user.update({
        where: { email },
        data: { isEmailVerified: true },
      });

      return await this.prismaService.token.delete({ where: { id: token.id } });
    } else {
      const token = await this.prismaService.token.create({
        data: {
          email,
          type: "VERIFY_EMAIL",
        },
      });

      return await this.mailService.send({
        to: email,
        subject: "Подтверждение почты",
        html: `
      <h1>Пожалуйста, подтвердите свою почту</h1>
      <a href="${this.configService.getOrThrow("CLIENT_URL")}/auth/verify-email/${token.id}?email=${email}">Подтвердить</a>`,
      });
    }
  }
  public async forgotPassword(
    email: string,
    queryToken?: string,
    newPassword?: string
  ) {
    const token = await this.prismaService.token.findFirst({
      where: { email, type: "RESET_PASSWORD" },
    });

    if (queryToken && token && newPassword) {
      if (queryToken !== token.id)
        throw new BadRequestException("Неверный токен");
      const hashedPassword = await argon2.hash(newPassword);

      await this.prismaService.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return await this.prismaService.token.delete({ where: { id: token.id } });
    } else {
      const token = await this.prismaService.token.create({
        data: {
          email,
          type: "RESET_PASSWORD",
        },
      });

      return await this.mailService.send({
        to: email,
        subject: "Восстановление пароля",
        html: `
      <h1>Для восстановления пароля, перейдите по ссылке</h1>
      <a href="${this.configService.getOrThrow("CLIENT_URL")}/auth/new-password?token=${token.id}&email=${email}">Восстановить</a>`,
      });
    }
  }
}
