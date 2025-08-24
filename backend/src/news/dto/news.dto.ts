import { IsNotEmpty, IsOptional } from "class-validator";

export class NewsDto {
    @IsNotEmpty({ message: "Заголовок не может быть пустым" })
    title: string

    @IsNotEmpty({ message: "Текст не может быть пустым" })
    text: string

    @IsOptional()
    image: any
}