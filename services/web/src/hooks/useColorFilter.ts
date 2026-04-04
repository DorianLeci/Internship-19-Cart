import { ColorFilterContext } from "@context/ColorFilterContext";
import { useContext } from "react";

const useFilterContext = () => {
  const context = useContext(ColorFilterContext);
  if (!context)
    throw new Error("useCOlorFilter must be used within a ColorFilterProvider");
  return context;
};

export default useFilterContext;
