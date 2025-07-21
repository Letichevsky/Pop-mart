import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import products from "@/data/products.json";
import PageSpacer from "@/components/PageSpacer";
import { cn } from "@/utils/cn";
import StatusMark from "@/components/StatusMark";
import ProductsCarousel from "@/components/ProductsCarousel";
import { useCart } from "@/contexts/useCart";

interface Product {
  id: number;
  isHot: boolean;
  isNew: boolean;
  category: string;
  name: string;
  smallPrice: number;
  bigPrice?: number;
  details: string[][];
  productImages: string[];
  pageImages: string[];
  sizeImages?: string[];
}

type ImageSource = "gallery" | "size";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"small" | "big">("small");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [imageSource, setImageSource] = useState<ImageSource>("gallery");

  useEffect(() => {
    // Скролл наверх при загрузке страницы
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (productId) {
      const foundProduct = products.products.find(
        (p) => p.id === parseInt(productId)
      );
      if (foundProduct) {
        setProduct(foundProduct);
        // Сброс всех значений на дефолтные
        setSelectedImage(0);
        setQuantity(1);
        setSize("small");
        setIsDetailsOpen(false);
        setImageSource("gallery");
      } else {
        // Если продукт не найден, перенаправляем на главную
        navigate("/");
      }
    }
  }, [productId, navigate]);

  // Функция для получения текущего изображения
  const getCurrentImage = () => {
    if (!product) return "";

    if (imageSource === "size" && product.sizeImages) {
      return product.sizeImages[size === "small" ? 0 : 1];
    }

    return product.productImages[selectedImage];
  };

  // Обработчик выбора изображения из галереи
  const handleGalleryImageSelect = (index: number) => {
    setSelectedImage(index);
    setImageSource("gallery");
  };

  // Обработчик выбора размера
  const handleSizeSelect = (newSize: "small" | "big") => {
    setSize(newSize);
    setImageSource("size");
    // Сбрасываем количество при смене размера, если превышает лимит
    if (quantity > (newSize === "small" ? 12 : 2)) {
      setQuantity(newSize === "small" ? 12 : 2);
    }
  };

  // Функция для добавления товара в корзину
  const handleAddToCart = () => {
    if (!product) return;

    const itemToAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      price:
        size === "small"
          ? product.smallPrice
          : product.bigPrice || product.smallPrice,
      image: product.productImages[0],
      quantity,
      size: product.sizeImages ? size : undefined,
      category: product.category,
    };

    // Добавляем товар в корзину (проверка ограничений происходит внутри addItem)
    addItem(itemToAdd);
  };

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <PageSpacer />
      <div className="w-full max-w-[1200px] mx-auto py-[40px] px-[24px]">
        {/* Хлебные крошки */}
        <div className="mb-[32px] flex items-start gap-[8px] text-[14px]">
          <div
            onClick={() => navigate("/")}
            className="font-[600] hover:text-black transition-colors uppercase cursor-pointer"
          >
            Home
          </div>
          <span className="mx-2 font-[600] text-[14px] cursor-pointer">
            {" "}
            /{" "}
          </span>
          <span className="text-[#d20001] font-[600] text-[14px] cursor-pointer">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-[64px]">
          {/* Галерея изображений */}
          <div className="flex gap-[16px]">
            {/* Контейнер для миниатюр с прокруткой */}
            <div className="h-[480px] overflow-y-auto pr-[8px] scrollbar-hide">
              <div className="flex flex-col gap-[8px]">
                {product.productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleGalleryImageSelect(index)}
                    className={`bg-[#F6F6F6] w-[80px] h-[80px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index && imageSource === "gallery"
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`/products${image}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Главное изображение */}
            <div className="bg-[#F6F6F6] w-[480px] h-[480px] overflow-hidden">
              <img
                src={`/products${getCurrentImage()}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Информация о продукте */}
          <div className="flex flex-col gap-[24px]">
            {product.isHot && <StatusMark status="hot" />}
            {product.isNew && <StatusMark status="new" />}
            <div>
              <h1 className="text-[32px] font-semibold mb-[8px]">
                {product.name}
              </h1>
              <p className="text-[18px] text-gray-600">{product.category}</p>
            </div>

            <div>
              <p className="text-[24px] font-[600] text-[#d20001] text-nowrap">
                {`AU$ ` +
                  (size === "small"
                    ? product.smallPrice.toFixed(2)
                    : product.bigPrice?.toFixed(2) ||
                      product.smallPrice.toFixed(2))}
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

            {product.sizeImages && (
              <div className="flex flex-col gap-[8px]">
                <p className="text-[20px] text-[#000] uppercase">Size</p>
                <div className="flex gap-[16px]">
                  <div
                    className={cn(
                      "flex gap-[8px] items-center bg-[#f6f6f6] h-[50px] text-[#000] px-[32px] py-[16px] transition-colors cursor-pointer",
                      size === "small" && "outline outline-[#000]"
                    )}
                    onClick={() => handleSizeSelect("small")}
                  >
                    <img
                      src={`/products${product.sizeImages[0]}`}
                      alt="single box"
                      className="w-[40px] h-[40px] object-cover"
                    />
                    <p
                      className={cn(
                        "text-[14px]",
                        size === "small" ? "text-[#000]" : "text-[#aaa]"
                      )}
                    >
                      Single box
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex gap-[8px] items-center bg-[#f6f6f6] h-[50px] text-[#000] px-[32px] py-[16px] transition-colors cursor-pointer",
                      size === "big" && "outline outline-[#000]"
                    )}
                    onClick={() => handleSizeSelect("big")}
                  >
                    <img
                      src={`/products${product.sizeImages[1]}`}
                      alt="single box"
                      className="w-[40px] h-[40px] object-cover"
                    />
                    <p
                      className={cn(
                        "text-[14px]",
                        size === "big" ? " text-[#000]" : " text-[#aaa]"
                      )}
                    >
                      Whole set
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Выбор количества */}
            <div className="flex flex-col items-start gap-[16px]">
              <div className="flex justify-center items-center gap-[8px]">
                <span className="text-[16px] font-[600]">Quantity:</span>
                {product.sizeImages && (
                  <span className="text-[16px] font-[600] text-[#777]">
                    Max {size === "small" ? "12 (Single Box)" : "2 (set)"} per
                    person
                  </span>
                )}
              </div>
              <div className="flex items-center border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-[40px] h-[40px] flex items-center justify-center bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors select-none rounded-none border-[1px] border-[#000] text-[20px] leading-none pb-[2px]"
                >
                  -
                </button>
                <span className="w-[60px] h-[40px] flex items-center justify-center bg-white text-center font-[600] text-[20px]">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    const maxQuantity = product.sizeImages
                      ? size === "small"
                        ? 12
                        : 2
                      : Infinity;
                    setQuantity(Math.min(quantity + 1, maxQuantity));
                  }}
                  disabled={
                    product.sizeImages
                      ? size === "small"
                        ? quantity >= 12
                        : quantity >= 2
                      : false
                  }
                  className="w-[40px] h-[40px] flex items-center justify-center bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors select-none rounded-none border-[1px] border-[#000] text-[20px] leading-none"
                >
                  +
                </button>
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex gap-[16px]">
              <button
                onClick={handleAddToCart}
                className="bg-[#000] text-[#fff] px-[32px] py-[16px] hover:bg-[#000]/80 transition-colors uppercase font-[700] border-none cursor-pointer"
              >
                Add to cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  // Открываем корзину после добавления товара
                  openCart();
                }}
                className=" text-[#fff] bg-[#d20001] px-[32px] py-[16px] hover:bg-[#d20001]/80 transition-colors uppercase font-[700] border-none cursor-pointer"
              >
                Buy now
              </button>
            </div>
            {/* DETAILS */}
            <motion.div
              className="flex flex-col gap-[16px] bg-[#f6f6f6] p-[16px]"
              initial={false}
            >
              <motion.div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-[16px] font-[600] text-[#000]">Details</p>
                <motion.div
                  animate={{ rotate: isDetailsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-[20px] h-[20px] flex items-center justify-center"
                >
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    className="flex flex-col gap-[8px]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {product.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        className="flex gap-[8px]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <p className="text-[14px] font-[600] text-[#000]">
                          {detail[0]}
                        </p>
                        <p className="text-[14px] font-[400] text-[#000]">
                          {detail[1]}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center pt-[64px]">
          {product.pageImages.map((image, index) => (
            <img
              src={`/products${image}`}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Карусель товаров */}
        <ProductsCarousel currentProductId={product.id} />
      </div>
    </div>
  );
};

export default ProductPage;
