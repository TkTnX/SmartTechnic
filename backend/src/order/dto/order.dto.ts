import { DeliveryType, PaymentType } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty({ message: "Тип доставки обязателен" })
  @IsEnum(DeliveryType, { message: "Некорректный тип доставки" })
  deliveryType: DeliveryType;

  @IsOptional()
  deliveryFlat: string;
  @IsOptional()
  deliveryDate: string;

  @IsNotEmpty({ message: "Город не может быть пустым" })
  city: string;

  @IsNotEmpty({ message: "Улица не может быть пустой" })
  street: string;

  @IsNotEmpty({ message: "Тип оплаты обязателен" })
  @IsEnum(PaymentType, { message: "Некорректный тип оплаты" })
  paymentType: PaymentType;

  @IsNotEmpty({ message: "Имя не может быть пустым" })
  username: string;

  @IsNotEmpty({ message: "Индекс не может быть пустой" })
  index: string;

  @IsNotEmpty({ message: "Номер телефона не может быть пустым" })
  @IsPhoneNumber("RU", { message: "Некорректный номер телефона" })
  userPhone: string;

  @IsNotEmpty({ message: "Email не может быть пустым" })
  @IsEmail({}, { message: "Некорректный email" })
  userEmail: string;

  @IsOptional()
  comment?: string;

  @IsNotEmpty({ message: "Сумма не может быть пустой" })
  @IsNumber({}, { message: "Сумма должна быть числом" })
  totalPrice: number;
}
