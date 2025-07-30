import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const useMetaPixel = (pixelId: string | null) => {
  const isInitialized = useRef(false);

  // Инициализация Meta Pixel
  const initializePixel = () => {
    if (typeof window === "undefined" || isInitialized.current || !pixelId)
      return;

    // Проверяем, что Meta Pixel уже загружен из HTML
    if (window.fbq) {
      console.log("Initializing Meta Pixel with ID:", pixelId);
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
      isInitialized.current = true;
    }
  };

  // Отправка событий
  const trackEvent = (
    eventName: string,
    parameters?: Record<string, unknown>
  ) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (parameters) {
      window.fbq("track", eventName, parameters);
    } else {
      window.fbq("track", eventName);
    }
  };

  // Отслеживание просмотра страницы
  const trackPageView = () => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "PageView");
  };

  // Отслеживание просмотра товара
  const trackViewContent = (product: {
    id: number;
    name: string;
    category: string;
    price: number;
  }) => {
    trackEvent("ViewContent", {
      content_ids: [product.id],
      content_name: product.name,
      content_category: product.category,
      value: product.price,
      currency: "AUD",
    });
  };

  // Отслеживание добавления в корзину
  const trackAddToCart = (product: {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    size?: string;
  }) => {
    trackEvent("AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      content_category: product.category,
      value: product.price * product.quantity,
      currency: "AUD",
      contents: [
        {
          id: product.id,
          quantity: product.quantity,
          item_price: product.price,
        },
      ],
      custom_data: {
        size: product.size,
      },
    });
  };

  // Отслеживание инициации покупки
  const trackInitiateCheckout = (cart: {
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
  }) => {
    trackEvent("InitiateCheckout", {
      content_ids: cart.items.map((item) => item.id),
      value: cart.total,
      currency: "AUD",
      contents: cart.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price,
      })),
      num_items: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    });
  };

  // Отслеживание покупки
  const trackPurchase = (order: {
    id: string;
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
  }) => {
    trackEvent("Purchase", {
      content_ids: order.items.map((item) => item.id),
      value: order.total,
      currency: "AUD",
      contents: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price,
      })),
      num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
    });
  };

  // Отслеживание поиска
  const trackSearch = (searchTerm: string) => {
    trackEvent("Search", {
      search_string: searchTerm,
    });
  };

  // Отслеживание просмотра каталога
  const trackViewCategory = (category: string) => {
    trackEvent("ViewCategory", {
      content_category: category,
    });
  };

  // Отслеживание добавления в список желаний
  const trackAddToWishlist = (product: {
    id: number;
    name: string;
    category: string;
    price: number;
  }) => {
    trackEvent("AddToWishlist", {
      content_ids: [product.id],
      content_name: product.name,
      content_category: product.category,
      value: product.price,
      currency: "AUD",
    });
  };

  // Отслеживание начала заполнения формы
  const trackLead = () => {
    trackEvent("Lead");
  };

  // Отслеживание завершения регистрации
  const trackCompleteRegistration = () => {
    trackEvent("CompleteRegistration");
  };

  useEffect(() => {
    initializePixel();
  }, [pixelId]);

  return {
    trackEvent,
    trackPageView,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackSearch,
    trackViewCategory,
    trackAddToWishlist,
    trackLead,
    trackCompleteRegistration,
  };
};
