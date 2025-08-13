import { Controller, Param, Post } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller("cart-products")
export class CartProductController {
  constructor(private readonly cartProductService: CartProductService) {}

  @Authorization()
  @Post(":productId")
  async addToFavorites(
    @Authorized("id") userId: string,
    @Param("productId") productId: string
  ) {
    return await this.cartProductService.addToCart(userId, productId);
  }
}
