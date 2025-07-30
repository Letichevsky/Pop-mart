# Meta Pixel Setup для Pop Mart

## Настройка

### 1. Получите Pixel ID

1. Зайдите в [Facebook Business Manager](https://business.facebook.com/)
2. Перейдите в Events Manager
3. Создайте новый Pixel или используйте существующий
4. Скопируйте Pixel ID

### 2. Замените Pixel ID в коде

Замените `YOUR_PIXEL_ID_HERE` на ваш реальный Pixel ID в следующих файлах:

- `index.html` (строка с `fbq('init', 'YOUR_PIXEL_ID_HERE')`)
- `src/App.tsx` (строка с `pixelId="YOUR_PIXEL_ID_HERE"`)

### 3. Проверка установки

1. Откройте DevTools в браузере
2. Перейдите на вкладку Network
3. Обновите страницу
4. Найдите запросы к `facebook.com` - они должны отправляться

## Использование

### Базовое отслеживание

```typescript
import { useMetaPixelContext } from "@/contexts/MetaPixelContext";

const MyComponent = () => {
  const { trackEvent, trackPageView } = useMetaPixelContext();

  // Отслеживание кастомного события
  const handleClick = () => {
    trackEvent("CustomEvent", {
      custom_parameter: "value",
    });
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

### Отслеживание товаров

```typescript
const { trackViewContent, trackAddToCart } = useMetaPixelContext();

// Просмотр товара
trackViewContent({
  id: 123,
  name: "Product Name",
  category: "Category",
  price: 29.99,
});

// Добавление в корзину
trackAddToCart({
  id: 123,
  name: "Product Name",
  category: "Category",
  price: 29.99,
  quantity: 2,
  size: "small",
});
```

### Отслеживание корзины

```typescript
const { trackInitiateCheckout, trackPurchase } = useMetaPixelContext();

// Начало оформления заказа
trackInitiateCheckout({
  items: [{ id: 123, name: "Product", price: 29.99, quantity: 2 }],
  total: 59.98,
});

// Завершение покупки
trackPurchase({
  id: "order_123",
  items: [{ id: 123, name: "Product", price: 29.99, quantity: 2 }],
  total: 59.98,
});
```

## События для отслеживания

### Автоматически отслеживаемые события:

- ✅ PageView - при переходе между страницами
- ✅ ViewContent - при просмотре товара
- ✅ AddToCart - при добавлении в корзину
- ✅ InitiateCheckout - при начале оформления заказа
- ✅ Purchase - при завершении покупки

### Рекомендуемые дополнительные события:

- 🔄 Search - при поиске товаров
- 🔄 ViewCategory - при просмотре категории
- 🔄 AddToWishlist - при добавлении в избранное
- 🔄 Lead - при заполнении форм
- 🔄 CompleteRegistration - при регистрации

## Интеграция в компоненты

### Страница товара

```typescript
// В ProductPage.tsx
useEffect(() => {
  if (product) {
    trackViewContent({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.smallPrice,
    });
  }
}, [product]);
```

### Корзина

```typescript
// В CartContext.tsx
const addItem = (item) => {
  // ... логика добавления
  trackAddToCart({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
  });
};
```

## Тестирование

### В режиме разработки

1. Установите [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Откройте DevTools
3. Перейдите на вкладку Facebook Pixel Helper
4. Проверьте, что события отправляются корректно

### В продакшене

1. Используйте Facebook Events Manager
2. Проверьте вкладку Test Events
3. Убедитесь, что события приходят в реальном времени

## Troubleshooting

### События не отправляются

1. Проверьте правильность Pixel ID
2. Убедитесь, что нет блокировщиков рекламы
3. Проверьте консоль на ошибки JavaScript

### События дублируются

1. Проверьте, что MetaPixelTracker не дублируется
2. Убедитесь, что хук useMetaPixel инициализируется только один раз

### Проблемы с типами TypeScript

1. Проверьте импорты типов
2. Убедитесь, что все интерфейсы определены корректно
