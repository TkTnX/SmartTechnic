import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}
  public async getNews(query: Record<string, string>) {
    const { take, sortBy, category, ...restQuery } = query;
    return await this.prismaService.news.findMany({
      take: +take || undefined,
    });
  }

  public async getNewsItem(newsId: string) {
    const newsItem = await this.prismaService.news.findUnique({
      where: { id: newsId },
    });

    if (!newsItem) throw new NotFoundException("Новость не найдена");

    return newsItem;
  }
}
