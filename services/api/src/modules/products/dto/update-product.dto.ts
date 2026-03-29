import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import {
  CreateProductDto,
  CreateProductImageDto,
  CreateProductVariantDto,
} from './create-product.dto';

export class UpdateProductVariantDto extends PartialType(CreateProductVariantDto) {
  @ApiProperty({ description: 'Id of variant which you want to update' })
  @IsUUID()
  id: string;
}
export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {
  @ApiProperty({ description: 'Id of image which you want to update' })
  @IsUUID()
  id: string;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['type', 'variants', 'images'] as const),
) {
  @ApiPropertyOptional({
    description: 'Product variants (stock, shoe size, shirt size)',
    type: () => [UpdateProductVariantDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDto)
  variants?: UpdateProductVariantDto[];

  @ApiPropertyOptional({
    description: 'Product images (url, color)',
    type: () => [UpdateProductImageDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto[];
}
