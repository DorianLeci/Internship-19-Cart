import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserAddressDto } from './user-address.dto';
import { UserCardDto } from './user-card.dto';

export class ProfileResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;

  @ApiPropertyOptional({ description: 'Avatar URL' })
  avatarUrl?: string;

  @ApiPropertyOptional({ description: 'User address', type: () => UserAddressDto })
  address?: UserAddressDto;

  @ApiPropertyOptional({ description: 'User card info', type: () => UserCardDto })
  card?: UserCardDto;
}
