import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: Record<string, string>) {
    return await this.productService.getProducts(query);
  }
  @Get("/:productId")
  async getProduct(@Param("productId") productId: string) {
    
    return await this.productService.getProduct(productId);
  }

  @Authorization("ADMIN")
  @Post()
  @UseInterceptors(
    FilesInterceptor("images", 10, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              "-" +
              uniqueSuffix +
              path.extname(file.originalname)
          );
        },
      }),
    })
  )
  async createProduct(
    @Body() dto: ProductDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    const imagesArray = images.map(
      (image) => `${process.env.SERVER_URL}/uploads/${image.filename}`
    );

    return await this.productService.createProduct({
      ...dto,
      images: imagesArray,
    });
  }
}
