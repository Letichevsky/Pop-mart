import StatusMark from "@/components/StatusMark";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: number;
  isHot: boolean;
  isNew: boolean;
  image: string;
  category: string;
  name: string;
  smallPrice: number;
}

const Product = ({
  id,
  isHot,
  isNew,
  image,
  category,
  name,
  smallPrice,
}: ProductProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
    // Скролл наверх страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-[16px] cursor-pointer relative"
      onClick={handleClick}
    >
      {isHot && <StatusMark status="hot" isAbsolute={true} />}
      {isNew && <StatusMark status="new" isAbsolute={true} />}
      <div className="bg-[#F6F6F6] w-full h-full py-[24px] overflow-hidden">
        <img
          src={`/products${image}`}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        <h3 className="text-[16px]">{category}</h3>
        <p className="text-[16px] line-clamp-2 break-words overflow-hidden text-ellipsis">
          {name}
        </p>
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-[20px] font-[500] line-through">
            AU$ {smallPrice.toFixed(2)}
          </p>
          <p className="text-[20px] font-[500] text-[#d20001]">
            AU$ {(smallPrice / 2).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
