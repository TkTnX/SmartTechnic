import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductDto } from "./dto/product.dto";
import { ProductStatus } from "@prisma/client";
import { isBoolean } from "src/utils/isBoolean.util";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getProducts(query: Record<string, string>) {
    const {
      take,
      sortBy,
      category,
      от,
      до,
      isAdminPage,
      search,
      ...restQuery
    } = query;
    const isAdmin = isBoolean(isAdminPage as "true" | "false");

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
        status: isAdmin ? undefined : ProductStatus.AVAILABLE,
        name: search ? { contains: search, mode: "insensitive" } : undefined,
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

  public async getProduct(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        reviews: {
          include: {
            user: true,
          },
        },
        specifications: true,
      },
    });

    if (!product) throw new NotFoundException("Продукт не найден");

    return product;
  }

  public async createProduct(dto: ProductDto) {
    await this.prismaService.product.create({
      data: { ...dto, status: ProductStatus.AVAILABLE },
    });
    return { ok: true };
  }
  public async updateProduct(productId: string, dto: ProductDto) {
    await this.prismaService.product.update({
      where: { id: productId },
      data: { ...dto, status: ProductStatus.AVAILABLE },
    });
    return { ok: true };
  }

  public async deleteProduct(productId: string) {
    const product = await this.getProduct(productId)

    return await this.prismaService.product.delete({
      where: { id: product.id },
    });
  }
}
