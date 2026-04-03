import { addFavorite, deleteFavorite } from "@api/favorite";
import { QueryKeys } from "@api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface UseToggleFavoriteProps {
  productId: string;
  isFavorite?: boolean;
}

export const useToggleFavorite = ({
  productId,
  isFavorite,
}: UseToggleFavoriteProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      isFavorite ? deleteFavorite(productId) : addFavorite(productId),
    onSuccess: (data) => {
      toast.success(data.message || "Action successful");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVORITES] });
    },
    onError: (error: any) => {
      toast.error(error || "Something went wrong");
    },
  });
};
