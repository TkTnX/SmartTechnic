import { ProductStatus } from "@prisma/client";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class ProductDto {
  @IsNotEmpty({ message: "Название не может быть пустым" })
  name: string;

  @IsNotEmpty({ message: "Цена не может быть пустой" })
  @IsInt({ message: "Цена должна быть числом" })
  price: number;

  @IsOptional()
  oldPrice: number;

  @IsNotEmpty({ message: "Бренд не может быть пустым" })
  brand: string;

  @IsNotEmpty({ message: "Описание не может быть пустым" })
  description: string;

  @IsNotEmpty({ message: "Статус заказа обязателен" })
  status: ProductStatus;

  @IsNotEmpty({ message: "Количество товара обязательно" })
  quantity: number;

  @IsArray({ message: "Картинки обязательны" })
  @IsString({ each: true, message: "Картинка должна быть строкой" })
  images: string[];

  @IsNotEmpty({ message: "Категория обязательна" })
  categoryId: string;
}
