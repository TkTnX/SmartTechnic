import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SpecificationDto } from "./dto/specification.dto";

@Injectable()
export class SpecificationService {
  public constructor(private readonly prismaService: PrismaService) {}

  async getSpecifications() {
    const specifications = await this.prismaService.specification.findMany({
      include: { product: { include: { category: true, reviews: true } } },
    });

    return specifications;
  }
  async getSpecificationsByCategory(categoryId: string) {
    const specifications = await this.prismaService.specification.findMany({
      where: { categoryId },
      include: { category: true },
    });

    return specifications;
  }

  async createSpecification(productId: string, dto: SpecificationDto) {
    return await this.prismaService.specification.create({
      data: { ...dto, productId },
    });
  }

  async deleteSpecification(specificationId: string) {
    const specification = await this.prismaService.specification.findUnique({
      where: { id: specificationId },
    });

    if (!specification)
      throw new NotFoundException("Характеристика не найдена!");

    return await this.prismaService.specification.delete({
      where: { id: specificationId },
    });
  }
}
