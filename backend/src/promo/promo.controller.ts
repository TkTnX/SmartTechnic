import { Controller, Get, Param } from '@nestjs/common';
import { PromoService } from './promo.service';

@Controller('promos')
export class PromoController {
  constructor(private readonly promoService: PromoService) { }
  
  @Get()
  async getPromos() {
    return await this.promoService.getPromos()
  }

  @Get(":promoId")
  async getPromoById(@Param("promoId") promoId: string) {
    return await this.promoService.getPromo(promoId)
  }
}
