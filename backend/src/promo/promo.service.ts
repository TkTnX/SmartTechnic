import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PromoDto } from "src/promo/dto/promo.dto";

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

    public async createPromo(dto: PromoDto) {
      return await this.prismaService.promo.create({ data: dto });
    }
}
