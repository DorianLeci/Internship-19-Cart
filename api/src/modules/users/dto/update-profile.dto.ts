import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserAddressDto } from './user-address.dto';
import { UserCardDto } from './user-card.dto';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ type: () => UserAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserAddressDto)
  address?: UserAddressDto;

  @ApiPropertyOptional({ type: () => UserCardDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserCardDto)
  card?: UserCardDto;
}
