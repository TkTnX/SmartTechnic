import { Injectable } from "@nestjs/common";
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
}
