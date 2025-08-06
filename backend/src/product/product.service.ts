import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getProducts(query: Record<string, string>) {
    const { take, sortBy, ...restQuery } = query;

    return await this.prismaService.product.findMany({
      where: restQuery,
      orderBy: {
        [sortBy]: "desc",
      },
      take: +take || undefined,
      include: {
        category: true,
        reviews: true,
      },
    });
  }

  public async createProduct(dto: ProductDto) {
    await this.prismaService.product.create({ data: dto });
    return { ok: true };
  }
}
