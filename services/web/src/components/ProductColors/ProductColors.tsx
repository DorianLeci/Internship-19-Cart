import type { ProductImageResponseDto } from "@cart-app/types";
import Color from "@components/Color";

interface ProductColorsProps {
  images: ProductImageResponseDto[];
}

const ProductColors = ({ images }: ProductColorsProps) => {
  return (
    <>
      {images
        .filter((img) => img.color !== undefined)
        .map((img) => (
          <Color key={img.color} color={img.color} />
        ))}
    </>
  );
};

export default ProductColors;
