import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, UserService],
})
export class ReviewModule {}
