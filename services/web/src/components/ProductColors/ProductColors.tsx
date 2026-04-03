import type { ProductImageResponseDto } from "@cart-app/types";

interface ProductColorsProps {
  images: ProductImageResponseDto[];
}

const ProductColors = ({ images }: ProductColorsProps) => {
  return (
    <>
      {images
        .filter((img) => img.color !== undefined)
        .map((img) => (
          <div
            key={img.color}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: img.color?.toLowerCase(),
              border: "1px solid black",
            }}
          />
        ))}
    </>
  );
};

export default ProductColors;
