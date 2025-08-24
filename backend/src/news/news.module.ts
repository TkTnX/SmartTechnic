import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
})
export class NewsModule {}
