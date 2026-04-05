import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ActionResponseDto } from 'src/common/dto/common';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItemResponseDto } from './dto/response.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addItem(userId: string, dto: CartItemDto): Promise<ActionResponseDto> {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: { items: true },
    });

    const existingItem = cart.items.find(
      (i) => i.variantId === dto.variantId && i.color === dto.color,
    );

    let desiredQuantity = dto.quantity;

    if (existingItem) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: existingItem?.variantId },
      });

      if (!variant) throw new BadRequestException(`Variant ${dto.variantId} not found`);

      desiredQuantity += existingItem.quantity;

      if (desiredQuantity > variant.stock) {
        throw new BadRequestException(
          `Cannot add ${dto.quantity} items. Only ${variant.stock - existingItem.quantity} left in stock.`,
        );
      }
      const updatedItem = await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: desiredQuantity },
      });

      return { message: 'Cart item successfully updated', id: updatedItem.id };
    } else {
      const newItem = await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId: dto.variantId,
          color: dto.color,
          quantity: desiredQuantity,
        },
      });

      return { message: 'New cart item successfully created', id: newItem.id };
    }
  }

  async findAll(userId: string): Promise<CartItemResponseDto[]> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: { include: { product: { include: { images: true } } } },
          },
        },
      },
    });

    if (!cart) return [];

    return cart.items.map((item) => {
      const variant = item.variant;
      const product = variant.product;

      const image = product.images.find((img) => img.color === item.color);

      if (!image)
        throw new BadRequestException(`Image with color ${item.color.toLowerCase()} not found`);

      return {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        brand: product.brand,
        size: variant.shoeSize ?? variant.clothingSize,
        imageUrl: image.url,
        color: item.color,
        quantity: item.quantity,
        price: Number(product.price),
      };
    });
  }
}
