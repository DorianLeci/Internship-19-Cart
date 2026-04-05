import { ProductColor } from '@cart-app/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive, IsUUID } from 'class-validator';

export class CartItemDto {
  @ApiProperty({ description: 'Id of product variant which is placed in cart' })
  @IsUUID()
  variantId: string;

  @ApiProperty({ description: 'Quantity of product variant which is placed in cart' })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Color of product variant which is placed in cart',
    enum: ProductColor,
  })
  @IsEnum(ProductColor)
  color: ProductColor;
}
