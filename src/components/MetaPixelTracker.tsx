import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMetaPixelContext } from "@/hooks/useMetaPixelContext";

export const MetaPixelTracker = () => {
  const location = useLocation();
  const { trackPageView } = useMetaPixelContext();

  useEffect(() => {
    // Отслеживаем просмотр страницы при изменении маршрута
    trackPageView();
  }, [location.pathname, trackPageView]);

  return null; // Этот компонент не рендерит ничего
};
