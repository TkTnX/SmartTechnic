import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "src/user/user.service";
import { User } from "@prisma/client";
import { Request } from "express";

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}
  public async register(req: Request, dto: RegisterDto) {
    const isUserExists = await this.userService.findByEmail(dto.email);

    if (isUserExists)
      throw new BadGatewayException(
        "Пользователь с таким email уже существует"
      );

    const newUser = await this.userService.create(dto);

    return this.saveSession(req, newUser);
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
