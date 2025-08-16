import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductModule } from './product/product.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SpecificationModule } from './specification/specification.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    PrismaModule,
    NewsModule,
    AuthModule,
    UserModule,
    SpecificationModule,
    FavoriteModule,
    CartProductModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
