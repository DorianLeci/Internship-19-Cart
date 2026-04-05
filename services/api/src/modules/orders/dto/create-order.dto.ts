import { MIN_CART_ITEMS_NUM } from '@cart-app/types';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsEnum, ValidateNested } from 'class-validator';
import { CartItemDto } from 'src/modules/cart/dto/cart-item.dto';

export class CreateOrderDto {
  @ApiProperty({ type: () => [CartItemDto] })
  @ArrayMinSize(MIN_CART_ITEMS_NUM)
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cartItems: CartItemDto[];

  @ApiProperty({ enum: PaymentMethod, description: 'Selected payment method for the order' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
