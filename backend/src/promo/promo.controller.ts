import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { PromoService } from "./promo.service";
import { Authorization } from "src/auth/decorators/auth.decorator";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import { PromoDto } from "./dto/promo.dto";

@Controller("promos")
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Get()
  async getPromos() {
    return await this.promoService.getPromos();
  }

  @Get(":promoId")
  async getPromoById(@Param("promoId") promoId: string) {
    return await this.promoService.getPromo(promoId);
  }

  @Authorization("ADMIN")
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "image", maxCount: 1 },
        { name: "preview", maxCount: 1 },
      ],
      {
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
      }
    )
  )
  async createNews(
    @Body() dto: PromoDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; preview?: Express.Multer.File[] }
  ) {
    const image = files.image?.[0];
    const preview = files.preview?.[0];

    return await this.promoService.createPromo({
      ...dto,
      image: image
        ? `${process.env.SERVER_URL}/uploads/${image.filename}`
        : null,
      preview: preview
        ? `${process.env.SERVER_URL}/uploads/${preview.filename}`
        : null,
    });
  }


    @Authorization("ADMIN")
    @Delete(':promoId')

    async deleteNews(@Param("promoId") promoId: string) {
      return await this.promoService.deletePromo(promoId);
    }
}
