import type { ProductColor } from "@cart-app/types";
import { createContext, useState, type ReactNode } from "react";

interface ColorFilterContextType {
  selectedColors: ProductColor[];
  setSelectedColors: (colors: ProductColor[]) => void;
}

export const ColorFilterContext = createContext<
  ColorFilterContextType | undefined
>(undefined);

export const ColorFilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([]);

  return (
    <ColorFilterContext.Provider value={{ selectedColors, setSelectedColors }}>
      {children}
    </ColorFilterContext.Provider>
  );
};
