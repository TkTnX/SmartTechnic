import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Post()
  public async createCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.createCategory(dto)
  }

  @Delete(':categoryId')
  public async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory(categoryId)
  }
}
