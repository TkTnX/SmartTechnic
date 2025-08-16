import { Injectable } from "@nestjs/common";
import { PaymentDto } from "./dto/payment.dto";
import {
  YooCheckout,
  IPaymentMethodType,
  IConfirmationType,
} from "@a2seven/yoo-checkout";
@Injectable()
export class PaymentService {
  public async createPayment(dto: PaymentDto) {
    const checkout = new YooCheckout({
      shopId: process.env.YOOKASSA_SHOP_ID!,
      secretKey: process.env.YOOKASSA_SECRET_KEY!,
    });

    const paymentData = {
      amount: {
        value: String(dto.value),
        currency: "RUB",
      },
      payment_method_data: {
        type: "bank_card" as IPaymentMethodType,
      },

      confirmation: {
        type: "redirect" as IConfirmationType,
        return_url: `${process.env.CLIENT_URL}/order/${dto.orderId}`,
      },
      description: `Заказ №${dto.orderId}`,
    };

    const payment = await checkout.createPayment(paymentData);

    return payment;
  }
}
