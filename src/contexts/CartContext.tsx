import React, { useReducer, useEffect } from "react";
import type {
  CartItem,
  CartState,
  CartAction,
  CartContextType,
} from "./cartTypes";
import { CartContext } from "./cartContext";

// Начальное состояние
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Функция для вычисления ключа товара (id + size)
const getItemKey = (id: number, size?: "small" | "big") =>
  `${id}-${size || "default"}`;

// Редьюсер для корзины
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;
      const itemKey = getItemKey(newItem.id, newItem.size);

      const existingItemIndex = state.items.findIndex(
        (item) => getItemKey(item.id, item.size) === itemKey
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Если товар уже есть, увеличиваем количество
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Если товара нет, добавляем новый
        newItems = [...state.items, newItem];
      }

      const newTotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newItemCount = newItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "REMOVE_ITEM": {
      const { id, size } = action.payload;
      const itemKey = getItemKey(id, size);

      const newItems = state.items.filter(
        (item) => getItemKey(item.id, item.size) !== itemKey
      );

      const newTotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newItemCount = newItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity, size } = action.payload;
      const itemKey = getItemKey(id, size);

      const newItems = state.items.map((item) =>
        getItemKey(item.id, item.size) === itemKey
          ? { ...item, quantity }
          : item
      );

      const newTotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newItemCount = newItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "CLEAR_CART":
      return initialState;

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

// Функция инициализации состояния
const initializeState = (): CartState => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Проверяем, что загруженные данные имеют правильную структуру
      if (
        parsedCart &&
        typeof parsedCart === "object" &&
        "items" in parsedCart
      ) {
        console.log("Корзина загружена из localStorage:", parsedCart);
        return parsedCart;
      }
    }
  } catch (error) {
    console.error("Ошибка при загрузке корзины из localStorage:", error);
  }
  console.log("Используется начальное состояние корзины");
  return initialState;
};

// Провайдер контекста
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initializeState());

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    try {
      // Сохраняем только если корзина не пустая или если это не первая загрузка
      if (state.items.length > 0 || localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify(state));
        console.log("Корзина сохранена в localStorage:", state);
      }
    } catch (error) {
      console.error("Ошибка при сохранении корзины в localStorage:", error);
    }
  }, [state]);

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity: number }) => {
    dispatch({ type: "ADD_ITEM", payload: item as CartItem });
  };

  const removeItem = (id: number, size?: "small" | "big") => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
  };

  const updateQuantity = (
    id: number,
    quantity: number,
    size?: "small" | "big"
  ) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity, size } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
