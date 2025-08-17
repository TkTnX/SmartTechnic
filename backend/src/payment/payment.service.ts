import { Injectable } from "@nestjs/common";
import { PaymentDto } from "./dto/payment.dto";
import {
  YooCheckout,
  IPaymentMethodType,
  IConfirmationType,
} from "@a2seven/yoo-checkout";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderStatus } from "@prisma/client";
@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
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

  public async changeStatus(body: any) {
    const checkout = new YooCheckout({
      shopId: process.env.YOOKASSA_SHOP_ID!,
      secretKey: process.env.YOOKASSA_SECRET_KEY!,
    });
    const event = body.event;
    const payment = body.object;

    if (event === "payment.waiting_for_capture") {
      await checkout.capturePayment(payment.id, {
        amount: payment.amount,
      });

      return true;
    }

    if (event === "payment.succeeded") {
      await this.prismaService.order.update({
        where: {
          id: payment.description.split("№")[1],
        },
        data: {
          status: OrderStatus.CONFIRMED,
        },
      });

      return true;
    }

    if (event === "payment.canceled") {
      await this.prismaService.order.update({
        where: {
          id: payment.description.split("№")[1],
        },
        data: {
          status: OrderStatus.CANCELED,
        },
      });

      return true;
    }
  }
}
