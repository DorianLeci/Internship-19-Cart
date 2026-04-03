import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AllCategoriesDto } from './dto/response.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {}

  async findAll(): Promise<AllCategoriesDto[]> {
    const categories = await this.prisma.category.findMany();

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
