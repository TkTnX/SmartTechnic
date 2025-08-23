import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/order.dto";
import { PrismaService } from "src/prisma/prisma.service";
import {
  CartProduct,
  Order,
  OrderStatus,
  ProductStatus,
  User,
} from "@prisma/client";
import { PaymentService } from "src/payment/payment.service";

@Injectable()
export class OrderService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentService: PaymentService
  ) {}

  public async getOrders(userId: string) {
    return await this.prismaService.order.findMany({ where: { userId } });
  }

  public async getOrderById(userId: string, orderId: string) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) throw new NotFoundException("Заказ не найден");

    return order;
  }

  public async createOrder(userId: string, dto: CreateOrderDto) {
    const isCard = dto.paymentType === "CARD";
    let order:
      | null
      | (Order & {
          products: CartProduct[];
          user: User & { cartProducts: CartProduct[] };
        }) = null;
    let payment: null | any = null;
    if (isCard) {
      order = await this.prismaService.order.create({
        data: {
          ...dto,
          userId,
          status: OrderStatus.PENDING,
        },
        include: {
          products: true,
          user: {
            include: {
              cartProducts: true,
            },
          },
        },
      });

      payment = await this.paymentService.createPayment({
        value: order.totalPrice,
        orderId: order.id,
      });
    } else {
      order = await this.prismaService.order.create({
        data: {
          ...dto,
          userId,
          status: OrderStatus.CONFIRMED,
        },
        include: {
          products: true,
          user: {
            include: {
              cartProducts: true,
            },
          },
        },
      });
    }

    // Уменьшение количества товара в магазине
    await Promise.all(
      order.user.cartProducts.map(async (cartProduct) => {
        const product = await this.prismaService.product.update({
          where: { id: cartProduct.productId },
          data: {
            quantity: { decrement: cartProduct.quantity },
            sales: { increment: cartProduct.quantity },
          },
        });

        if (product.quantity <= 1)
          await this.prismaService.product.update({
            where: { id: product.id },
            data: { status: ProductStatus.UNAVAILABLE },
          });
      })
    );

    // Создание OrderItems

    await this.prismaService.orderItem.createMany({
      data: order.user.cartProducts.map((product) => ({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
      })),
    });

    // Удаление товаров из корзины

    await this.prismaService.cartProduct.deleteMany({
      where: { userId },
    });

    return {
      orderId: order.id,
      paymentUrl: payment?.confirmation?.confirmation_url || null,
    };
  }
}
