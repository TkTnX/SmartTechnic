import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: Record<string, string>) {
    return await this.productService.getProducts(query);
  }
  @Get('/:productId')
  async getProduct(@Param('productId') productId: string) {
    return await this.productService.getProduct(productId);
  }

  @Post()
  async createProduct(@Body() dto: ProductDto) {
    return await this.productService.createProduct(dto);
  }
}
