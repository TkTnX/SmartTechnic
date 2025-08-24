import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { NewsDto } from "./dto/news.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(@Query() query: Record<string, string>) {
    return await this.newsService.getNews(query);
  }

  @Get(":newsId")
  async getNewsItem(@Param("newsId") newsId: string) {
    return await this.newsService.getNewsItem(newsId);
  }

  @Authorization("ADMIN")
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
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
  async createNews(
    @Body() dto: NewsDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    
    return await this.newsService.createNews({
      ...dto,
      image: `${process.env.SERVER_URL}/uploads/${image.filename}`,
    });
  }
}
