import React from "react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useDynamicPixel } from "@/hooks/useDynamicPixel";
import {
  MetaPixelContext,
  type MetaPixelProviderProps,
} from "./MetaPixelContextTypes";

export const MetaPixelProvider: React.FC<MetaPixelProviderProps> = ({
  children,
  pixelId: defaultPixelId,
}) => {
  const { pixelId: dynamicPixelId } = useDynamicPixel();
  // Используем динамический Pixel ID, если он есть, иначе дефолтный
  const finalPixelId = dynamicPixelId || defaultPixelId;
  const pixel = useMetaPixel(finalPixelId);

  return (
    <MetaPixelContext.Provider value={pixel}>
      {children}
    </MetaPixelContext.Provider>
  );
};
