import type { AllCategoriesDto } from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const getAllCategories = (): Promise<AllCategoriesDto[]> => {
  return api.get<AllCategoriesDto[]>("/categories");
};

export const useCategories = () => {
  return useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: getAllCategories,
  });
};
