import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "Имя не может быть пустым" })
  name: string;

  @IsNotEmpty({ message: "Email не может быть пустым" })
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @Min(6, { message: "Пароль должен быть не менее 6 символов" })
  password: string;
}
