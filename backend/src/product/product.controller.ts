import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  // Получение продуктов
  @Get()
  async getProducts(@Query() query: Record<string, string>) {
    return await this.productService.getProducts(query);
  }

  // Получение продукта по ID
  @Get("/:productId")
  async getProduct(@Param("productId") productId: string) {
    return await this.productService.getProduct(productId);
  }

  // Создание продукта
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

  // Редактирование продукта
  @Authorization("ADMIN")
  @Patch(":productId")
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
  async updateProduct(
    @Param("productId") productId: string,
    @Body() dto: ProductDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    const product = await this.productService.getProduct(productId);
    const imagesArray = images.map(
      (image) => `${process.env.SERVER_URL}/uploads/${image.filename}`
    );


    return await this.productService.updateProduct(productId, {
      ...dto,
      images: imagesArray.length ? imagesArray : product.images,
    });
  }

  // Удаление продукта
  @Authorization("ADMIN")
  @Delete(":productId")
  async deleteProduct(@Param("productId") productId: string) {
    return await this.productService.deleteProduct(productId);
  }
}
