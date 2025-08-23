import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryDto } from "./dto/category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCategories() {
    return await this.prismaService.category.findMany();
  }

  private async getCategory(categoryId: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) throw new NotFoundException("Категория не найдена");

    return category;
  }

  public async createCategory(dto: CategoryDto) {
    return await this.prismaService.category.create({ data: dto });
  }

  public async deleteCategory(categoryId: string) {
    const category = await this.getCategory(categoryId);

    await this.prismaService.product.deleteMany({
      where: { categoryId: category.id },
    });

    await this.prismaService.specification.deleteMany({
      where: { categoryId: category.id },
    });

    return await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }
}
