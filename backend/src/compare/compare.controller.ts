import { Controller, Get, Param, Post } from "@nestjs/common";
import { CompareService } from "./compare.service";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { Authorized } from "src/auth/decorators/authorized.decorator";

@Controller("compare")
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Authorization()
  @Post(":productId")
  public async addToCompare(
    @Authorized("id") userId: string,
    @Param("productId") productId: string
  ) {
    return this.compareService.addToCompare(userId, productId);
  }
}
