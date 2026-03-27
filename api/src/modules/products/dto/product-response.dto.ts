import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType, ShirtSize } from '@prisma/client';
import { ProductListDto } from './product-list.dto';

export class ProductResponseDto extends ProductListDto {
  @ApiProperty({ description: 'Full product description' })
  description: string;

  @ApiProperty({ description: 'Brand of the product' })
  brand: string;

  @ApiProperty({ description: 'Stock available for the product' })
  stock: number;

  @ApiProperty({ description: 'Product type (CLOTHING, SHOES)', enum: ProductType })
  type: ProductType;

  @ApiPropertyOptional({ description: 'Shirt size if applicable', enum: ShirtSize })
  shirtSize?: ShirtSize;

  @ApiPropertyOptional({ description: 'Shoe size if applicable' })
  shoeSize?: number;
}
