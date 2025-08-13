import { Controller, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }
  
  @Authorization()
  @Post(":productId")
  async addToFavorites(@Authorized("id") userId: string, @Param("productId") productId: string) {
    return await this.favoriteService.addToFavorites(userId, productId)
  }
}
