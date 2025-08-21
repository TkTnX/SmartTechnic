import { Module } from "@nestjs/common";
import { CompareService } from "./compare.service";
import { CompareController } from "./compare.controller";
import { UserModule } from "src/user/user.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Module({
  imports: [UserModule],
  controllers: [CompareController],
  providers: [CompareService, PrismaService, UserService],
})
export class CompareModule {}
