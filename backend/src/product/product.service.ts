import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getProducts(query: Record<string, string>) {
    const { take, sortBy, category, от, до, ...restQuery } = query;
    const splitedSortBy = sortBy ? sortBy.split("-") : [];
    let price: { gte?: number; lte?: number } = {};

    if (от !== undefined) {
      price.gte = +от;
    }

    if (до !== undefined) {
      price.lte = +до;
    }
    return await this.prismaService.product.findMany({
      where: {
        categoryId: category,
        price,
        // Фильтрация по характеристикам с помощью title
        AND: Object.entries(restQuery).map(([title, value]) => ({
          specifications: {
            some: {
              title,
              value: {
                in: value.split(",").map((v) => v.trim()),
              },
            },
          },
        })),
      },
      orderBy: sortBy ? { [splitedSortBy[0]]: splitedSortBy[1] } : undefined,
      take: +take || undefined,
      include: {
        category: true,
        reviews: true,
        specifications: true,
      },
    });
  }
  public async createProduct(dto: ProductDto) {
    await this.prismaService.product.create({ data: dto });
    return { ok: true };
  }
}
