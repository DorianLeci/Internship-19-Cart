import { SortOrder } from '@enums/sort-order.enum';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { paginate } from '@utils/paginate.util';
import { PaginatedResponse } from 'src/common/response/paginated-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findProducts(query: FindProductsDto): Promise<PaginatedResponse<ProductResponseDto>> {
    const where: any = {};

    if (query.search) where.name = { contains: query.search, mode: 'insensitive' };
    const orderBy = { name: query.sortOrder || SortOrder.ASC };

    if (query.inStock === true) where.stock = { gt: 0 };
    else if (query.inStock === false) where.stock = { lte: 0 };

    if (query.categoryId) where.categoryId = query.categoryId;

    return paginate({
      model: this.prisma.product,
      where,
      orderBy,
      page: query.pageNumber,
      limit: query.limit,
    });
  }

  async findOne(id: number) {}

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
