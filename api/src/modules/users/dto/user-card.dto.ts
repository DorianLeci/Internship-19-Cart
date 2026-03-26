import { ApiProperty } from '@nestjs/swagger';

export class UserCardDto {
  @ApiProperty({ description: 'Card expiry month' })
  expiryMonth: number;

  @ApiProperty({ description: 'Card expiry year' })
  expiryYear: number;

  @ApiProperty({ description: 'IBAN number' })
  iban: string;

  @ApiProperty({ description: 'Card CVC code' })
  cvc: string;
}
