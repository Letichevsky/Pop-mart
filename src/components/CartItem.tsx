import React from "react";
import { useCart } from "@/contexts/useCart";
import type { CartItem as CartItemType } from "@/contexts/cartTypes";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity, item.size);
    }
  };

  const handleRemove = () => {
    removeItem(item.id, item.size);
  };

  return (
    <div className="flex items-center gap-[16px] p-[16px] border-b border-gray-200">
      {/* Изображение товара */}
      <div className="w-[80px] h-[80px] bg-[#F6F6F6] overflow-hidden flex-shrink-0">
        <img
          src={`/products${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Информация о товаре */}
      <div className="flex-1 flex flex-col gap-[8px]">
        <h3 className="text-[16px] font-[600] text-[#000]">{item.name}</h3>
        <p className="text-[14px] text-[#666]">{item.description}</p>
        {item.size && (
          <p className="text-[12px] text-[#999] uppercase">
            Size: {item.size === "small" ? "Single Box" : "Whole Set"}
          </p>
        )}
        <p className="text-[18px] font-[600] text-[#d20001]">${item.price}</p>
      </div>

      {/* Управление количеством */}
      <div className="flex items-center gap-[8px]">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-[32px] h-[32px] flex items-center justify-center bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors select-none rounded-none border-[1px] border-[#000] text-[16px] leading-none"
        >
          -
        </button>
        <span className="w-[40px] h-[32px] flex items-center justify-center bg-white text-center font-[600] text-[16px] border-[1px] border-[#000]">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-[32px] h-[32px] flex items-center justify-center bg-white hover:bg-gray-50 transition-colors select-none rounded-none border-[1px] border-[#000] text-[16px] leading-none"
        >
          +
        </button>
      </div>

      {/* Общая стоимость товара */}
      <div className="flex flex-col items-end gap-[8px] min-w-[80px]">
        <p className="text-[18px] font-[600] text-[#000]">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-[12px] text-[#999] hover:text-[#d20001] transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
