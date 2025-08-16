import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [UserModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, PaymentService],
})
export class OrderModule {}
