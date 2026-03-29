import { MIN_PASSWORD_LENGTH } from '@cart-app/types';
import { ApiProperty } from '@nestjs/swagger';
import { UserAddressDto } from '@users/dto/user-address.dto';
import { UserCardDto } from '@users/dto/user-card.dto';
import { IsValidName } from '@validators/name.validator';
import { IsStrongPassword } from '@validators/password.validator';
import { Type } from 'class-transformer';
import { IsDefined, IsEmail, MinLength, ValidateNested } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ description: 'User email, must be unique' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsValidName()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsValidName()
  lastName: string;

  @ApiProperty({
    description: `User password, minimum ${MIN_PASSWORD_LENGTH} characters. Must have one at least one character, one number and one special character`,
    minLength: MIN_PASSWORD_LENGTH,
  })
  @MinLength(MIN_PASSWORD_LENGTH)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ type: () => UserAddressDto })
  @IsDefined({ message: 'Address is required' })
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto;

  @ApiProperty({ type: () => UserCardDto })
  @IsDefined({ message: 'Card is required' })
  @ValidateNested()
  @Type(() => UserCardDto)
  card: UserCardDto;
}
