import { ApiProperty } from '@nestjs/swagger';
import { ClothingSize, ProductColor } from '@prisma/client';

export class CartItemResponseDto {
  @ApiProperty({
    description: 'Product ID',
  })
  productId: string;

  @ApiProperty({
    description: 'Selected product variant ID (size variant)',
  })
  variantId: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Classic Sports Jacket',
  })
  name: string;

  @ApiProperty({
    description: 'Brand of the product',
    example: 'Nike',
  })
  brand: string;

  @ApiProperty({
    description: 'URL of the product image for the selected color',
    example: 'https://example.com/images/product_123_red.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Size of the selected variant (ClothingSize or numeric for shoes)',
    example: ClothingSize.M,
    enum: ClothingSize,
  })
  size: ClothingSize | number | null;

  @ApiProperty({
    description: 'Color of the selected variant',
    example: ProductColor.BLACK,
    enum: ProductColor,
  })
  color: ProductColor;

  @ApiProperty({
    description: 'Quantity of the product in the cart',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Price per item',
    example: 99.99,
  })
  price: number;
}
