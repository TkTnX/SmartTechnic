import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "Имя не может быть пустым" })
  name: string;

  @IsNotEmpty({ message: "Email не может быть пустым" })
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @IsNotEmpty({ message: "Номер телефона не может быть пустым" })
  @IsPhoneNumber("RU", { message: "Некорректный номер телефона" })
  phone: string;

  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(6, { message: "Пароль должен быть не менее 6 символов" })
  password: string;
}
