import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [UserModule],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, UserService, ProductService],
})
export class ReviewModule {}
