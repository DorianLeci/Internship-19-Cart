import { ProductVariantResponseDto } from '@cart-app/types';
import { ProductVariant } from '@prisma/client';
declare const mapToVariantDto: (variant: ProductVariant) => ProductVariantResponseDto;
export default mapToVariantDto;
