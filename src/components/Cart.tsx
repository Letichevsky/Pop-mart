import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/useCart";
import CartItem from "./CartItem";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state } = useCart();

  // Блокировка скролла страницы когда корзина открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение фона */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-[0] bg-[#000]/50 z-[60]"
            onClick={onClose}
          />

          {/* Окно корзины */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.3,
            }}
            className="fixed top-[0] right-[0] h-[100vh] w-[50%] bg-[#fff] z-[70] flex flex-col"
          >
            {/* Заголовок с крестиком */}
            <div className="flex items-center justify-end p-[24px] flex-shrink-0">
              <button
                onClick={onClose}
                className="w-[24px] h-[24px] flex items-center justify-center bg-[#fff] border-none cursor-pointer"
              >
                <svg
                  className="w-[24px] h-[24px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Содержимое корзины */}
            <div className="p-[24px] pt-[0px] flex flex-col flex-1 overflow-hidden">
              {/* Заголовок */}
              <div className="mb-[24px] flex-shrink-0">
                <h2 className="text-[24px] font-[600] text-[#000] mb-[8px]">
                  Shopping Cart ({state.itemCount} items)
                </h2>
                <p className="text-[16px] text-[#666]">
                  Total: ${state.total.toFixed(2)}
                </p>
              </div>

              {/* Список товаров */}
              <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-[18px] text-[#666] mb-[16px]">
                      Your cart is empty
                    </p>
                    <p className="text-[14px] text-[#999]">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-[0px]">
                    {state.items.map((item, index) => (
                      <CartItem
                        key={`${item.id}-${item.size || "default"}-${index}`}
                        item={item}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Фиксированный низ с суммой и кнопкой */}
              {state.items.length > 0 && (
                <div className="flex-shrink-0 bg-[#f6f6f6] p-[24px] -mx-[24px] -mb-[24px]">
                  <div className="space-y-[16px] flex flex-col gap-[8px]">
                    {/* Строка с subtotal */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#000] font-[600]">Subtotal</span>
                      <span className="text-[#000] font-[700]">
                        AU${state.total.toFixed(2)}{" "}
                        <span className="text-[#000] text-[10px]">AUD</span>
                      </span>
                    </div>

                    {/* Строка с shipping */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#000] font-[600]">Shipping</span>
                      <span className="text-[#000] text-[14px]">
                        Calculated at next step
                      </span>
                    </div>

                    {/* Разделительная линия */}
                    <div className="border-t border-[#e0e0e0]"></div>

                    {/* Строка с total */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#000] font-[700] text-[18px]">
                        Total ({state.itemCount})
                      </span>
                      <span className="text-[#000] font-[700] text-[20px]">
                        AU${state.total.toFixed(2)}{" "}
                        <span className="text-[#000] text-[10px] font-[600]">
                          AUD
                        </span>
                      </span>
                    </div>

                    {/* Кнопка checkout */}
                    <button className="w-full bg-[#d20001] hover:bg-[#d20001]/80 text-[#fff] py-[16px] px-[24px] font-[700] uppercase border-none cursor-pointer transition-colors">
                      Check out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
