import { useState } from "react";

const useDisableFavorite = () => {
  const [disabledFavorite, setDisabledFavorite] = useState(false);

  const disable = () => setDisabledFavorite(true);
  const enable = () => setDisabledFavorite(false);

  return { disabledFavorite, disable, enable };
};

export default useDisableFavorite;
