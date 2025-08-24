import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { SpecificationDto } from './dto/specification.dto';
import { Authorization } from 'src/auth/decorators/auth.decorator';

@Controller('specifications')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) { }
  

  @Get('')
  async getSpecifications() {
    return await this.specificationService.getSpecifications()
  }

  @Get('/:categoryId')
  async getSpecificationsByCategory(@Param('categoryId') categoryId: string) {
    return await this.specificationService.getSpecificationsByCategory(categoryId)
  }

  @Authorization("ADMIN")
  @Post('/:productId')
  async createSpecification(@Param('productId') productId: string, @Body() dto: SpecificationDto) {
    return await this.specificationService.createSpecification(productId, dto)
  }

  @Authorization("ADMIN")
  @Delete('/:specificationId')
  async deleteSpecification(@Param('specificationId') specificationId: string) {
    return await this.specificationService.deleteSpecification(specificationId)
  }
}
