import { Body, Controller, Param, Post } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { Authorized } from "src/auth/decorators/authorized.decorator";
import { ReviewDto } from "./dto/review.dto";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Authorization()
  @Post(":productId")
  public async writeReview(
    @Authorized("id") userId: string,
    @Param("productId") productId: string,
    @Body() dto: ReviewDto
  ) {
    return this.reviewService.writeReview(userId, productId, dto);
  }
}
