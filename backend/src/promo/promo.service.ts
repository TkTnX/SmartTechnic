import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PromoService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getPromos() {
    return await this.prismaService.promo.findMany();
  }

  public async getPromo(promoId: string) {
    return await this.prismaService.promo.findUnique({
      where: { id: promoId },
    });
  }
}
