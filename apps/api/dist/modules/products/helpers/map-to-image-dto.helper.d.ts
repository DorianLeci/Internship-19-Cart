import { ProductImageResponseDto } from '@cart-app/types';
import { ProductImage } from '@prisma/client';
declare const mapToImageDto: (img: ProductImage) => ProductImageResponseDto;
export default mapToImageDto;
