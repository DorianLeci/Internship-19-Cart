import { SortOrder } from '@enums/sort-order.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { paginate } from '@utils/paginate.util';
import { PaginatedResponse } from 'src/common/response/paginated-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductListDto } from './dto/product-list.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mapToImageDto from './helpers/map-to-image-dto.helper';

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true;
    favorites: true;
  };
}>;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findProducts(
    query: FindProductsDto,
    userId: string | null,
  ): Promise<PaginatedResponse<ProductListDto>> {
    const where: any = {};

    if (query.search) where.name = { contains: query.search, mode: 'insensitive' };
    const orderBy = { name: query.sortOrder || SortOrder.ASC };

    if (query.inStock === true) where.stock = { gt: 0 };
    else if (query.inStock === false) where.stock = { lte: 0 };

    if (query.categoryId) where.categoryId = query.categoryId;

    const paginated = await paginate({
      model: this.prisma.product,
      where,
      orderBy,
      page: query.pageNumber,
      limit: query.limit,
      include: { images: true, favorites: userId ? { where: { userId } } : false },
    });

    let favoriteIds = new Set<string>();
    if (userId) {
      const favorites = await this.prisma.favorite.findMany({
        where: {
          userId,
          productId: { in: paginated.results.map((p: ProductWithRelations) => p.id) },
        },
        select: { productId: true },
      });

      favoriteIds = new Set(favorites.map((f) => f.productId));
    }

    const resultsWithFavorite = paginated.results.map((p: ProductWithRelations) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      images: p.images.map((img) => mapToImageDto(img)),
      isFavorite: favoriteIds.has(p.id),
    }));

    return {
      ...paginated,
      results: resultsWithFavorite,
    };
  }

  async findOne(productId: string, userId: string): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) throw new NotFoundException(`Product with ${productId} not found`);

    let isFavorite = false;
    if (userId) {
      const favorite = await this.prisma.favorite.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
      isFavorite = !!favorite;
    }

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      description: product.description,
      brand: product.brand,
      stock: product.stock,
      type: product.type,
      shirtSize: product.shirtSize ?? undefined,
      shoeSize: product.shoeSize ?? undefined,
      images: product.images.map((img) => mapToImageDto(img)),
      isFavorite,
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
