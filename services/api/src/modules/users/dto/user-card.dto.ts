import {
  CVC_LENGTH,
  cvcRegex,
  ibanRegex,
  MAX_EXPIRTY_MONTH,
  MIN_EXPIRY_MONTH,
} from '@cart-app/types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotExpired } from '@validators/expiry-date.validator';
import { IsInt, Length, Matches, Max, Min, Validate } from 'class-validator';

export class UserCardDto {
  @ApiProperty({ description: 'Card expiry month' })
  @IsInt()
  @Min(MIN_EXPIRY_MONTH)
  @Max(MAX_EXPIRTY_MONTH)
  expiryMonth: number;

  @ApiProperty({ description: 'Card expiry year' })
  @IsInt()
  expiryYear: number;

  @ApiProperty({ description: 'IBAN number' })
  @Matches(ibanRegex, { message: 'Invalid IBAN format' })
  iban: string;

  @ApiProperty({ description: 'Card CVC code' })
  @Length(CVC_LENGTH)
  @Matches(cvcRegex, { message: 'CVC must contain only numbers' })
  cvc: string;

  @Validate(IsNotExpired)
  _expiryCheck?: any;
}

export class UpdateUserCardDto extends PartialType(UserCardDto) {}
