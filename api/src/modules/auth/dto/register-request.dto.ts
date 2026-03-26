import { ApiProperty } from '@nestjs/swagger';
import { IsValidName } from '@validators/name.validator';
import { IsStrongPassword } from '@validators/password.validator';
import { IsEmail, MinLength } from 'class-validator';

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
    description:
      'User password, minimum 8 characters. Must have one at least one character, one number and one special character',
    minLength: 8,
  })
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
