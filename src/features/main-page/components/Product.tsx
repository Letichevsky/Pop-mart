import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: number;
  image: string;
  name: string;
  description: string;
  smallPrice: number;
}

const Product = ({
  id,
  image,
  name,
  description,
  smallPrice,
}: ProductProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-[16px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-[#F6F6F6] w-full h-full py-[24px] overflow-hidden">
        <img
          src={`/products${image}`}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        <h3 className="text-[16px]">{name}</h3>
        <p className="text-[16px]">{description}</p>
        <p className="text-[20px] font-[500]">${smallPrice}</p>
      </div>
    </div>
  );
};

export default Product;
