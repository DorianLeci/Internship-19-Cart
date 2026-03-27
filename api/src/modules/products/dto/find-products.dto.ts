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

  @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageNumber?: number = 1;

  @ApiPropertyOptional({ description: 'Limit for products per pagination', default: 4 })
  @IsOptional()
  @IsInt()
  @Min(4)
  limit?: number = 4;
}
