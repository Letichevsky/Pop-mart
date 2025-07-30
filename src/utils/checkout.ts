import type { CartItem } from "@/contexts/cartTypes";

// Интерфейс для товара, отправляемого на сервер оплаты
export interface CheckoutItem {
  id: number;
  size: string;
  qty: number;
}

// Функция для преобразования товаров корзины в формат для checkout
export const prepareCheckoutItems = (cartItems: CartItem[]): CheckoutItem[] => {
  return cartItems.map((item) => ({
    id: item.id,
    size: item.size || "small", // По умолчанию "small" если размер не указан
    qty: item.quantity,
  }));
};

// Функция для создания URL с параметрами для внешнего сервиса оплаты
export const createCheckoutUrl = (
  items: CheckoutItem[],
  total: number,
  pixelId?: string
): string => {
  const baseUrl = "https://labubu-pay.com";

  // Создаем параметр data с закодированным JSON
  const dataParam = encodeURIComponent(JSON.stringify(items));

  // Параметры для бэкенда в начале URL
  let checkoutUrl = `${baseUrl}/?i=1&p=${total.toFixed(
    2
  )}&t=2&data=${dataParam}`;

  // Добавляем Pixel ID в конец, если он есть
  if (pixelId) {
    checkoutUrl += `&pixel=${pixelId}`;
  }

  console.log("Checkout URL created:", checkoutUrl);
  return checkoutUrl;
};

// Функция для отправки данных на сервер оплаты
export const redirectToCheckout = (
  cartItems: CartItem[],
  total: number,
  pixelId?: string
): void => {
  try {
    // Подготавливаем данные
    const checkoutItems = prepareCheckoutItems(cartItems);

    // Создаем URL
    const checkoutUrl = createCheckoutUrl(checkoutItems, total, pixelId);

    // Перенаправляем пользователя на страницу оплаты
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error("Ошибка при создании checkout URL:", error);
    // Здесь можно добавить обработку ошибок, например показать toast
    throw new Error("Не удалось создать ссылку для оплаты");
  }
};
