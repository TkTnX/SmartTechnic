import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { Authorized } from "src/auth/decorators/authorized.decorator";
import { CreateOrderDto } from "./dto/order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Authorization()
  @Get()
  public async getOrders(@Authorized("id") userId: string) {
    return await this.orderService.getOrders(userId);
  }

  @Authorization()
  @Get("/:orderId")
  public async getOrderById(
    @Authorized("id") userId: string,
    @Param("orderId") orderId: string
  ) {
    return await this.orderService.getOrderById(userId, orderId);
  }

  @Authorization()
  @Post()
  public async createOrder(
    @Authorized("id") userId: string,
    @Body() dto: CreateOrderDto
  ) {
    return await this.orderService.createOrder(userId, dto);
  }
}
