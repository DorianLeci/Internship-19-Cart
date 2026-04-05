import { ClothingSize, ProductVariantResponseDto } from '@cart-app/types';
import { ProductType, ProductVariant } from '@prisma/client';

const mapToVariantDto = (variant: ProductVariant): ProductVariantResponseDto => {
  return {
    id: variant.id,
    clothingSize: (variant.clothingSize as ClothingSize) ?? undefined,
    shoeSize: variant.shoeSize ?? undefined,
    stock: variant.stock,
  };
};

const us = ProductType;
export default mapToVariantDto;
