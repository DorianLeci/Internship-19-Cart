import { ClothingSize, ProductColor } from "@prisma/client";

export class CartItemResponseDto {
  productId: string;
  variantId: string;
  name: string;
  brand: string;
  imageUrl: string;
  size: ClothingSize | number | null;
  color: ProductColor;
  quantity: number;
  price: number;
}
