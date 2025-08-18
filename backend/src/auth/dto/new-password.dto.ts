import { Equals, IsNotEmpty, Matches, MinLength, Validate } from "class-validator";

export class NewPasswordDto {
  @IsNotEmpty({ message: "Старый пароль обязательный!" })
  @MinLength(6, { message: "Пароль должен быть не менее 6 символов!" })
  oldPassword: string;

  @IsNotEmpty({ message: "Новый пароль обязательный!" })
  @MinLength(6, { message: "Пароль должен быть не менее 6 символов!" })
  newPassword: string;

  @IsNotEmpty({ message: "Повторите пароль!" })
  @MinLength(6, { message: "Пароль должен быть не менее 6 символов!" })
  @Validate((value: string, dto: NewPasswordDto) => value === dto.newPassword, {
    message: "Пароли не совпадают!",
  })
  repeatPassword: string;
}
