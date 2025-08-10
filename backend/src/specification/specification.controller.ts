import { Controller, Get } from '@nestjs/common';
import { SpecificationService } from './specification.service';

@Controller('specifications')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) { }
  
  @Get('/:categoryId')
  async getSpecificationsByCategory(categoryId: string) {
    return await this.specificationService.getSpecificationsByCategory(categoryId)
  }
}
