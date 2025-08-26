import { DeliveryType, PaymentType } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserDto {
  @IsOptional()
  @MinLength(3, { message: "Имя должно быть не менее 3 символов!" })
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @IsEmail({}, { message: "Некорректная почта" })
  email: string;

  @IsOptional()
  @IsEnum(PaymentType, { message: "Некорректный тип оплаты" })
  paymentType: PaymentType;

  @IsOptional()
  @IsPhoneNumber("RU", { message: "Некорректный номер телефона" })
  phone: string;

  @IsOptional()
  @IsEnum(DeliveryType, { message: "Некорректный тип доставки" })
  deliveryType: DeliveryType;

  @IsOptional()
  city: string;

  @IsOptional()
  avatar: Express.Multer.File;

  @IsOptional()
  @MaxLength(6, { message: "Индекс должен быть не более 6 символов" })
  index: string;

  @IsOptional()
  @IsString()
  @IsEnum(["true", "false"])
  isTwoFactorEnabled: 'true' | 'false';
}
