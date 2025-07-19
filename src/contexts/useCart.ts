import { useContext } from "react";
import { CartContext } from "./cartContext";

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
};
