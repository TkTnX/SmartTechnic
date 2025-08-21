import { Controller, Get, Param, Query } from "@nestjs/common";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(@Query() query: Record<string, string>) {
    return await this.newsService.getNews(query);
  }

  @Get(':newsId')
  async getNewsItem(@Param("newsId") newsId: string) {
    return await this.newsService.getNewsItem(newsId)
  }
}
