import { useFavorites } from "@api/favorite";
import type { ProductListDto } from "@cart-app/types";
import { createContext } from "react";

export interface FavoritesContextType {
  favorites: ProductListDto[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, isError, refetch } = useFavorites();

  return (
    <FavoritesContext.Provider
      value={{
        favorites: data ?? [],
        isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
