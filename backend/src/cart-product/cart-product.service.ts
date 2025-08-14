import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";

@Injectable()
export class CartProductService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService
  ) {}

  public async addToCart(userId: string, productId: string) {
    const product = await this.productService.getProduct(productId);

    const isAlreadyAdded = await this.prismaService.cartProduct.findFirst({
      where: {
        AND: [{ productId: product.id }, { userId }],
      },
    });

    if (isAlreadyAdded) {
      await this.prismaService.cartProduct.update({
        where: { id: isAlreadyAdded.id },
        data: { quantity: isAlreadyAdded.quantity + 1 },
      });

      return {
        message: `Новое количество товара: ${isAlreadyAdded.quantity + 1}`,
      };
    } else {
      await this.prismaService.cartProduct.create({
        data: {
          productId: product.id,
          quantity: 1,
          userId,
        },
      });

      return { message: "Успешное добавление в корзину" };
    }
  }

  public async changeQuantity(cartProductId: string, value: "minus" | "plus") {
    const cartProduct = await this.findCartProductById(cartProductId);
    if (value === "minus" && cartProduct.quantity !== 1) {
      await this.prismaService.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity - 1,
        },
      });

      return { message: "Количество товара уменьшено" };
    }

    if (
      value === "plus" &&
      cartProduct.product.quantity !== cartProduct.quantity
    ) {
      await this.prismaService.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity + 1,
        },
      });


      return { message: "Количество товара увеличено" };
    }

    return { message: "Что-то пошло не так" };
  }

  public async removeFromCart(cartProductId: string) {
    const cartProduct = await this.findCartProductById(cartProductId)

    await this.prismaService.cartProduct.delete({
      where: { id: cartProduct.id },
    });

    return { message: "Товар удален из корзины" };
  }

  private async findCartProductById(cartProductId: string) {
    const cartProduct = await this.prismaService.cartProduct.findUnique({
      where: { id: cartProductId },
      include: { product: true },
    });

    if (!cartProduct) throw new NotFoundException("Товар не найден в корзине");

    return cartProduct;
  }
}
