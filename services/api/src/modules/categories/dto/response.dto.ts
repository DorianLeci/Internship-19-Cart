import { ApiProperty } from '@nestjs/swagger';

export class AllCategoriesDto {
  @ApiProperty({
    description: 'Unique identifier of the category',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Clothing',
  })
  name: string;
}
