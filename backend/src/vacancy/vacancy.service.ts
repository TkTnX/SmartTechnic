import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class VacancyService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getVacancies() {
    return await this.prismaService.vacancy.findMany();
  }
}
