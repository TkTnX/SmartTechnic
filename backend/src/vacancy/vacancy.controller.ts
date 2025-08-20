import { Controller, Get } from "@nestjs/common";
import { VacancyService } from "./vacancy.service";

@Controller("vacancies")
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  public async getVacancies() {
    return await this.vacancyService.getVacancies();
  }
}
