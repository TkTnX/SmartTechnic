import { Module } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService, ProductService],
})
export class FavoriteModule {}
