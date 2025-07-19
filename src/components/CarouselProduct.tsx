import StatusMark from "@/components/StatusMark";
import { useNavigate } from "react-router-dom";

interface CarouselProductProps {
  id: number;
  isHot: boolean;
  isNew: boolean;
  image: string;
  category: string;
  name: string;
  description: string;
  smallPrice: number;
}

const CarouselProduct = ({
  id,
  isHot,
  isNew,
  image,
  category,
  name,
  smallPrice,
}: CarouselProductProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
    // Скролл наверх страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="w-full h-full flex flex-col cursor-pointer relative bg-[#fff] select-none"
      onClick={handleClick}
    >
      {isHot && <StatusMark status="hot" isAbsolute={true} />}
      {isNew && <StatusMark status="new" isAbsolute={true} />}

      {/* Изображение */}
      <div className="bg-[#F6F6F6] w-[100%] h-[280px] overflow-hidden">
        <img
          src={`/products${image}`}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
        />
      </div>

      {/* Информация о товаре */}
      <div className="flex flex-col gap-[8px] p-[16px] flex-1">
        <h3 className="text-[14px] font-semibold text-black uppercase">
          {category}
        </h3>
        <p className="text-[12px] text-gray-600 line-clamp-2">{name}</p>
        <p className="text-[16px] font-semibold text-black mt-auto">
          AU${smallPrice}
        </p>
      </div>
    </div>
  );
};

export default CarouselProduct;
