import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SpecificationService {
  public constructor(private readonly prismaService: PrismaService) {}

  async getSpecificationsByCategory(categoryId: string) {
    const specifications = await this.prismaService.specification.findMany({
      where: { categoryId },
    });

    return specifications;
  }
}
