import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateMailDto {
    @IsNotEmpty({ message: "Email не может быть пустым" })
        @IsEmail({}, { message: "Некорректный email" })
    to: string

    @IsNotEmpty({ message: "Тема не может быть пустой" })
    subject: string

    @IsNotEmpty({ message: "Текст не может быть пустым" })
    html: string
}