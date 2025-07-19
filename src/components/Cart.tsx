import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
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
            <div className="p-[24px]">
              {/* Здесь будет содержимое корзины */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
