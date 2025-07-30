import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useDynamicPixel() {
  const [searchParams] = useSearchParams();
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Получаем Pixel ID из URL параметров
    const urlPixelId =
      searchParams.get("sub_id_12") ||
      searchParams.get("pixel") ||
      searchParams.get("fb_pixel");

    if (urlPixelId) {
      // Сохраняем в localStorage для сохранения между сессиями
      localStorage.setItem("dynamic_pixel_id", urlPixelId);
      setPixelId(urlPixelId);
      setIsInitialized(true);
    } else {
      // Проверяем, есть ли сохраненный Pixel ID в localStorage
      const savedPixelId = localStorage.getItem("dynamic_pixel_id");
      if (savedPixelId) {
        setPixelId(savedPixelId);
        setIsInitialized(true);
      }
    }
  }, [searchParams]);

  // Функция для получения текущего Pixel ID
  const getCurrentPixelId = () => pixelId;

  // Функция для проверки, инициализирован ли Pixel
  const isPixelInitialized = () => isInitialized && pixelId !== null;

  // Функция для очистки Pixel ID (например, при выходе пользователя)
  const clearPixelId = () => {
    localStorage.removeItem("dynamic_pixel_id");
    setPixelId(null);
    setIsInitialized(false);
  };

  // Функция для создания URL с Pixel ID
  const createUrlWithPixel = (
    baseUrl: string,
    additionalParams?: Record<string, string>
  ) => {
    if (!pixelId) return baseUrl;

    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set("sub_id_12", pixelId);

    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    return url.toString();
  };

  return {
    pixelId,
    isInitialized: isPixelInitialized(),
    getCurrentPixelId,
    clearPixelId,
    createUrlWithPixel,
  };
}

export { useDynamicPixel };
