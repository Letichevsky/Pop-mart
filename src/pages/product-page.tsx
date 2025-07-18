import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "@/data/products.json";
import PageSpacer from "@/components/PageSpacer";

interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  productImages: string[];
  pageImages: string[];
}

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (productId) {
      const foundProduct = products.products.find(
        (p) => p.id === parseInt(productId)
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Если продукт не найден, перенаправляем на главную
        navigate("/");
      }
    }
  }, [productId, navigate]);

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
          <span className="font-[600] text-[14px] cursor-pointer">
            {product.category}
          </span>
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
                    onClick={() => setSelectedImage(index)}
                    className={`bg-[#F6F6F6] w-[80px] h-[80px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index
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
                src={`/products${product.productImages[selectedImage]}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Информация о продукте */}
          <div className="flex flex-col gap-[24px]">
            <div>
              <h1 className="text-[32px] font-semibold mb-[8px]">
                {product.name}
              </h1>
              <p className="text-[18px] text-gray-600">{product.category}</p>
            </div>

            <div>
              <p className="text-[24px] font-[600] text-[#d20001]">
                ${product.price}
              </p>
            </div>

            <div>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-[16px] pt-[16px]">
              <button className="bg-[#000] text-[#fff] px-[32px] py-[16px] hover:bg-[#000]/80 transition-colors uppercase font-[700] border-none cursor-pointer">
                Add to cart
              </button>
              <button className=" text-[#fff] bg-[#d20001] px-[32px] py-[16px] hover:bg-[#d20001]/80 transition-colors uppercase font-[700] border-none cursor-pointer">
                Buy now
              </button>
            </div>
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
      </div>
    </div>
  );
};

export default ProductPage;
