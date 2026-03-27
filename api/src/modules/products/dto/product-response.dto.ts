import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  shirtSize: string;

  @ApiProperty()
  shoeSize: number;

  @ApiProperty({ type: [ProductResponseDto] })
  images: ProductResponseDto[];
}
