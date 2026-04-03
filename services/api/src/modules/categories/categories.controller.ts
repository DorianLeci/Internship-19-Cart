import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AllCategoriesDto } from './dto/response.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    type: AllCategoriesDto,
    description: 'Returns list of all product categories',
  })
  findAll() {
    return this.categoriesService.findAll();
  }
}
