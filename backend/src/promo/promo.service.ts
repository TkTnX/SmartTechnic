import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PromoDto } from "src/promo/dto/promo.dto";

@Injectable()
export class PromoService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getPromos() {
    return await this.prismaService.promo.findMany();
  }

  public async getPromo(promoId: string) {
    const promo = await this.prismaService.promo.findUnique({
      where: { id: promoId },
    });

    if (!promo) throw new NotFoundException("Промо акция не найдена");

    return promo;
  }

  public async createPromo(dto: PromoDto) {
    return await this.prismaService.promo.create({ data: dto });
  }

  public async deletePromo(promoId: string) {
    const promo = await this.getPromo(promoId);

    return await this.prismaService.promo.delete({ where: { id: promo.id } });
  }
}
