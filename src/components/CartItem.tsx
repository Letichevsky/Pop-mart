import React from "react";
import { useCart } from "@/contexts/useCart";
import type { CartItem as CartItemType } from "@/contexts/cartTypes";
import products from "@/data/products.json";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  // Находим продукт для определения ограничений
  const product = products.products.find((p) => p.id === item.id);

  // Определяем максимальное количество
  const getMaxQuantity = () => {
    if (!product?.sizeImages) return Infinity;
    return item.size === "small" ? 12 : 2;
  };

  const maxQuantity = getMaxQuantity();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      updateQuantity(item.id, newQuantity, item.size);
    }
  };

  const handleRemove = () => {
    removeItem(item.id, item.size);
  };

  return (
    <div className="flex items-start justify-between gap-[16px] p-[16px] border-b border-[#E5E5E5] select-none">
      <div className="flex items-start gap-[16px]">
        {/* Изображение товара */}
        <div className="w-[120px] h-[120px] bg-[#F6F6F6] overflow-hidden flex-shrink-0">
          <img
            src={`/products${item.image}`}
            alt={item.name}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>

        {/* Информация о товаре */}
        <div className="flex-1 flex flex-col gap-[8px]">
          <h3 className="text-[16px] font-[600] text-[#000]">{item.name}</h3>
          {item.size && (
            <p className="text-[12px] text-[#999] uppercase">
              Size: {item.size === "small" ? "Single Box" : "Whole Set"}
            </p>
          )}
          <div className="">
            <p className="text-[18px] font-[600] text-[#d20001]">
              AU$ {item.price.toFixed(2)}
            </p>
            <p className="text-[12px] text-[#000]">
              Estimated Shipping Date:{" "}
              {new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Управление количеством */}
          <div className="flex flex-col gap-[8px]">
            {/* Информация о максимальном количестве */}
            {product?.sizeImages && (
              <div className="flex items-center gap-[8px]">
                <span className="text-[12px] font-[600] text-[#777]">
                  Max {maxQuantity} (
                  {item.size === "small" ? "Single Box" : "set"}) per person
                </span>
              </div>
            )}

            {/* Кнопки управления количеством */}
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
                disabled={item.quantity >= maxQuantity}
                className="w-[32px] h-[32px] flex items-center justify-center bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors select-none rounded-none border-[1px] border-[#000] text-[16px] leading-none"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Общая стоимость товара */}
      <div className="h-[100%] flex flex-col items-end gap-[4px] min-w-[80px]">
        <p className="text-[18px] font-[600] text-[#000] text-nowrap">
          AU$ {(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-[12px] text-[#000] hover:text-[#d20001] transition-colors underline bg-[#fff] border-none cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
