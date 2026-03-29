import { MIN_PAGE_LIMIT, MIN_PAGE_NUMBER } from '@cart-app/types';
import { SortOrder } from '@enums/sort-order.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class FindProductsDto {
  @ApiPropertyOptional({ description: 'Filter products by category id' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Search by product name' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiPropertyOptional({ description: 'Filter products in stock' })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ description: 'Page number for pagination', default: MIN_PAGE_NUMBER })
  @IsOptional()
  @IsInt()
  @Min(MIN_PAGE_NUMBER)
  pageNumber?: number = MIN_PAGE_NUMBER;

  @ApiPropertyOptional({
    description: 'Limit for products per pagination',
    default: MIN_PAGE_LIMIT,
  })
  @IsOptional()
  @IsInt()
  @Min(MIN_PAGE_LIMIT)
  limit?: number = MIN_PAGE_LIMIT;
}
