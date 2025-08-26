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
import { PromoModule } from './promo/promo.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompareModule } from './compare/compare.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';

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
    PromoModule,
    VacancyModule,
    CompareModule,
    ReviewModule,
    CategoryModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
