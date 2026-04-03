import { ProductColor } from "@cart-app/types";

const colorMap: Record<ProductColor, string> = {
  [ProductColor.WHITE]: "#ffffff",
  [ProductColor.BLACK]: "#000000",
  [ProductColor.GRAY]: "#808080",
  [ProductColor.BLUE]: "#0000ff",
  [ProductColor.GREEN]: "#008000",
  [ProductColor.RED]: "#ff0000",
  [ProductColor.YELLOW]: "#ffff00",
};

export default colorMap;
