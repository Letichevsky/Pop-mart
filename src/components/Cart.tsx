import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/useCart";
import CartItem from "./CartItem";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state } = useCart();

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
            className="fixed top-[0] right-[0] h-[100%] w-[50%] bg-[#fff] z-[70]"
          >
            {/* Заголовок с крестиком */}
            <div className="flex items-center justify-end p-[24px]">
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
            <div className="p-[24px] flex flex-col h-full">
              {/* Заголовок */}
              <div className="mb-[24px]">
                <h2 className="text-[24px] font-[600] text-[#000] mb-[8px]">
                  Shopping Cart ({state.itemCount} items)
                </h2>
                <p className="text-[16px] text-[#666]">
                  Total: ${state.total.toFixed(2)}
                </p>
              </div>

              {/* Список товаров */}
              <div className="flex-1 overflow-y-auto">
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

              {/* Кнопки действий */}
              {state.items.length > 0 && (
                <div className="mt-[24px] pt-[24px] border-t border-gray-200">
                  <div className="flex gap-[16px]">
                    <button className="flex-1 bg-[#000] text-[#fff] px-[32px] py-[16px] hover:bg-[#000]/80 transition-colors uppercase font-[700] border-none cursor-pointer">
                      Checkout
                    </button>
                    <button className="flex-1 bg-[#f6f6f6] text-[#000] px-[32px] py-[16px] hover:bg-[#f6f6f6]/80 transition-colors uppercase font-[700] border-none cursor-pointer">
                      Continue Shopping
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
