import { IsNotEmpty } from "class-validator";

export class CategoryDto {
    @IsNotEmpty({ message: "Название не может быть пустым" })
    name: string
}