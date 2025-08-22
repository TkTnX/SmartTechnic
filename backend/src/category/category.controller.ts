import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getCategories() {
    return this.categoryService.getCategories();
  }
}
