import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";

@Injectable()
export class FavoriteService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService
  ) {}

  public async addToFavorites(userId: string, productId: string) {
    const product = await this.productService.getProduct(productId);

    const isAlreadyFavorited =
      await this.prismaService.favoriteProduct.findFirst({
        where: {
          AND: [{ productId: product.id }, { userId }],
        },
      });

    if (isAlreadyFavorited) {
      await this.prismaService.favoriteProduct.delete({
        where: { id: isAlreadyFavorited.id },
      });

      return { message: "Успешное удаление из избранного" };
    } else {
      await this.prismaService.favoriteProduct.create({
        data: {
          productId: product.id,
          userId,
        },
      });

      return { message: "Успешное добавление в избранное" };
    }
  }
}
