import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";
import { ReviewDto } from "src/review/dto/review.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {}

  public async writeReview(userId: string, productId: string, dto: ReviewDto) {
    const user = await this.userService.findById(userId);
    const product = await this.productService.getProduct(productId);

    const avgRating =
      product.reviews.reduce(
        (acc, review) => acc + review.rating + dto.rating,
        0
      ) /
      (product.reviews.length + 1);


    await this.prismaService.product.update({
      where: { id: product.id },
      data: {
        rating: Math.round(avgRating),
      },
    });

    return this.prismaService.review.create({
      data: {
        ...dto,
        userId: user.id,
        productId,
      },
    });
  }
}
