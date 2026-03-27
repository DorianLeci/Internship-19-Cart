import { ProductImage } from '@prisma/client';
import { ProductImageResponseDto } from '../dto/product-image-response.dto';

const mapToImageDto = (img: ProductImage): ProductImageResponseDto => {
  return {
    id: img.id,
    url: img.url,
    color: img.color ?? undefined,
  };
};

export default mapToImageDto;
