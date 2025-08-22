import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ReviewDto } from "src/review/dto/review.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  public async writeReview(userId: string, productId: string, dto: ReviewDto) {
    const user = await this.userService.findById(userId);


    return this.prismaService.review.create({
      data: {
        ...dto,
        userId: user.id,
        productId,
      },
    });
  }
}
