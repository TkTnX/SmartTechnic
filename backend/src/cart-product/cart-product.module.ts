import { Module } from "@nestjs/common";
import { CartProductService } from "./cart-product.service";
import { CartProductController } from "./cart-product.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [CartProductController],
  providers: [CartProductService, PrismaService, ProductService],
})
export class CartProductModule {}
