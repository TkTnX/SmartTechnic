import { Controller, Get, Query } from "@nestjs/common";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getProducts(@Query() query: Record<string, string>) {
    return await this.newsService.getNews(query);
  }
}
