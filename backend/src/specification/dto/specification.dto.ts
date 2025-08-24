import { IsNotEmpty } from "class-validator"

export class SpecificationDto {
    @IsNotEmpty({ message: "Название не может быть пустым" })
    title: string

    @IsNotEmpty({ message: "Значение не может быть пустым" })
    value: string

    @IsNotEmpty({ message: "Категория обязательна!" })
    categoryId: string
}