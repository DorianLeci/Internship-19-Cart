import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserAddressDto {
  @ApiPropertyOptional({ description: 'Street address' })
  @IsOptional()
  @IsString()
  street: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({ description: 'ZIP / Postal code' })
  @IsOptional()
  @IsString()
  zipcode: string;

  @ApiPropertyOptional({ description: 'Country' })
  @IsOptional()
  @IsString()
  country: string;
}
