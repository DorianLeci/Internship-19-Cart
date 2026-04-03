import type { ActionResponseDto, ProductListDto } from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const addFavorite = async (
  productId: string,
): Promise<ActionResponseDto> => {
  return api.post<ActionResponseDto>(`/favorites/${productId}`);
};

export const deleteFavorite = async (
  productId: string,
): Promise<ActionResponseDto> => {
  return api.delete<ActionResponseDto>(`/favorites/${productId}`);
};

export const getFavorites = async (): Promise<ProductListDto[]> => {
  return api.get<ProductListDto[]>("/favorites");
};

export const useFavorites = () => {
  return useQuery({
    queryKey: [QueryKeys.FAVORITES],
    queryFn: getFavorites,
  });
};
