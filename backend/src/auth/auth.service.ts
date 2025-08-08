import {
  BadGatewayException,
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
@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
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

    return this.saveSession(req, newUser);
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmailOrPhone(dto.emailOrPhone);

    if (!user) throw new BadGatewayException("Пользователь не найден");

    const isPasswordValid = await argon2.verify(user.password, dto.password);

    if (!isPasswordValid)
      throw new UnauthorizedException("Неверные данные для входа");

    return this.saveSession(req, user);
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
        resolve()
      });
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
}
