import { useContext } from "react";
import { MetaPixelContext } from "@/contexts/MetaPixelContextTypes";

export const useMetaPixelContext = () => {
  const context = useContext(MetaPixelContext);
  if (!context) {
    throw new Error(
      "useMetaPixelContext must be used within a MetaPixelProvider"
    );
  }
  return context;
};
