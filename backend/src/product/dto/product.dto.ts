import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ProductDto {
  @IsNotEmpty({ message: "Название не может быть пустым" })
  name: string;

  @IsNotEmpty({ message: "Цена не может быть пустой" })
  @IsNumber({}, { message: "Цена должна быть числом" })
  @Type(() => Number)
  price: number;

  @IsOptional()
  @Type(() => Number)
  oldPrice: number;

  @IsNotEmpty({ message: "Бренд не может быть пустым" })
  brand: string;

  @IsNotEmpty({ message: "Описание не может быть пустым" })
  description: string;

  @IsNotEmpty({ message: "Количество товара обязательно" })
  @IsNumber({}, { message: "Количество должно быть числом" })
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  images: string[];

  @IsNotEmpty({ message: "Категория обязательна" })
  categoryId: string;
}
