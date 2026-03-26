import { ApiProperty } from '@nestjs/swagger';

export class UserAddressDto {
  @ApiProperty({ description: 'Street address' })
  street: string;

  @ApiProperty({ description: 'City' })
  city: string;

  @ApiProperty({ description: 'ZIP / Postal code' })
  zipcode: string;

  @ApiProperty({ description: 'Country' })
  country: string;
}
