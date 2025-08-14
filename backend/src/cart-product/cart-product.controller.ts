import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
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

  @Authorization()
  @Patch("quantity/:cartProductId")
  async changeQuantity(@Param("cartProductId") cartProductId: string, @Body("value") value: 'minus' | 'plus') {
    return await this.cartProductService.changeQuantity(cartProductId, value);
  }

  @Authorization()
  @Delete(':cartProductId')
  async removeFromCart(@Param("cartProductId") cartProductId: string) {
    return await this.cartProductService.removeFromCart(cartProductId)
  }
}
