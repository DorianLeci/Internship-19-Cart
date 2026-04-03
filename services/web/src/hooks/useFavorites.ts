import { FavoritesContext } from "@context/FavoritesContext";
import { useContext } from "react";

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useAuthProvider must be used within a AuthProvider");
  return context;
};

export default useFavorites;
