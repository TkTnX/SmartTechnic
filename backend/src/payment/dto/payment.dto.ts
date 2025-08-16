import { IsNotEmpty } from "class-validator";

export class PaymentDto {
    @IsNotEmpty({ message: "Сумма не может быть пустой" })
    value: number

    @IsNotEmpty({ message: "Заказ обязателен" })
    orderId: string
}