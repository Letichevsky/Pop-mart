// Типы для товара в корзине
export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  size?: "small" | "big";
  category: string;
}

// Состояние корзины
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Действия для корзины
export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number; size?: "small" | "big" } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: number; quantity: number; size?: "small" | "big" };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

// Контекст корзины
export interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity: number }) => void;
  removeItem: (id: number, size?: "small" | "big") => void;
  updateQuantity: (
    id: number,
    quantity: number,
    size?: "small" | "big"
  ) => void;
  clearCart: () => void;
  openCart: () => void;
}
