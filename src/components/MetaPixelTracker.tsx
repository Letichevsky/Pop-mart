import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMetaPixelContext } from "@/hooks/useMetaPixelContext";

export const MetaPixelTracker = () => {
  const location = useLocation();
  const { trackPageView } = useMetaPixelContext();
  const lastPathname = useRef<string>("");

  useEffect(() => {
    // Отслеживаем просмотр страницы при изменении маршрута
    // Предотвращаем дублирование событий
    if (lastPathname.current !== location.pathname) {
      trackPageView();
      lastPathname.current = location.pathname;
    }
  }, [location.pathname, trackPageView]);

  return null; // Этот компонент не рендерит ничего
};
