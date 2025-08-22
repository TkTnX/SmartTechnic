import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) { }
    
    public async getCategories() {
      return await this.prismaService.category.findMany();
    }
}
