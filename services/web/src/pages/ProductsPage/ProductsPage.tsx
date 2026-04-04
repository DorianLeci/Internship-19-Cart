import { ColorFilterProvider } from "@context/ColorFilterContext";
import ProductsContent from "./ProductsContent";

const ProductsPage = () => {
  return (
    <ColorFilterProvider>
      <ProductsContent />
    </ColorFilterProvider>
  );
};

export default ProductsPage;
