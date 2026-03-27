import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidName } from '@validators/name.validator';
import { Type } from 'class-transformer';
import { IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { UserAddressDto } from './user-address.dto';
import { UserCardDto } from './user-card.dto';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsValidName()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsValidName()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
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
