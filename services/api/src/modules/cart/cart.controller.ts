import { RolesAuth } from '@decorators/auth.decorator';
import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ActionResponseDto } from 'src/common/dto/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItemResponseDto } from './dto/response.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @RolesAuth(Role.USER, Role.ADMIN)
  @Get()
  @ApiOkResponse({ description: 'Returns user cart items', type: () => CartItemResponseDto })
  findAll(@Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.cartService.findAll(userId);
  }

  @RolesAuth(Role.USER, Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Add or update a cart item for the authenticated user' })
  @ApiOkResponse({
    description: 'Cart item successfully added or updated',
    type: () => ActionResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid data or exceeds stock' })
  addItem(@Req() req: RequestWithJwtUser, @Body() dto: CartItemDto) {
    const userId = req.user.sub;
    return this.cartService.addItem(userId, dto);
  }

  @RolesAuth(Role.USER, Role.ADMIN)
  @Delete()
  @ApiOkResponse({
    description: 'Cart items connected to user successfully removed',
    type: () => ActionResponseDto,
  })
  removeAll(@Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.cartService.removeAll(userId);
  }
}
