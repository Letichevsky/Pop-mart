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
        <div className="mb-[32px]">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-black transition-colors"
          >
            Главная
          </button>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black">{product.category}</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-[64px]">
          {/* Галерея изображений */}
          <div className="flex flex-col gap-[16px]">
            {/* Главное изображение */}
            <div className="bg-[#F6F6F6] w-full aspect-square overflow-hidden">
              <img
                src={`/products${product.productImages[selectedImage]}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Миниатюры */}
            <div className="grid grid-cols-5 gap-[8px]">
              {product.productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-[#F6F6F6] w-full aspect-square overflow-hidden border-2 transition-all ${
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

          {/* Информация о продукте */}
          <div className="flex flex-col gap-[24px]">
            <div>
              <h1 className="text-[32px] font-semibold mb-[8px]">
                {product.name}
              </h1>
              <p className="text-[18px] text-gray-600">{product.category}</p>
            </div>

            <div>
              <p className="text-[24px] font-semibold">${product.price}</p>
            </div>

            <div>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-[16px] pt-[16px]">
              <button className="bg-black text-white px-[32px] py-[16px] rounded-md hover:bg-gray-800 transition-colors">
                Добавить в корзину
              </button>
              <button className="border border-black text-black px-[32px] py-[16px] rounded-md hover:bg-black hover:text-white transition-colors">
                В избранное
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
