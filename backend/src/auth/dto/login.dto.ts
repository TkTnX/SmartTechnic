import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "Почта или пароль обязательны! " })
  emailOrPhone: string;

  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(6, { message: "Пароль должен быть не менее 6 символов" })
  password: string;
}
