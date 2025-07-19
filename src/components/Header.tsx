import React from "react";
import { Link } from "react-router-dom";
import popMartLogo from "@/assets/pop-mart_logo.svg";
import searchIcon from "@/assets/icons/Search.svg";
import cartIcon from "@/assets/icons/Cart.svg";
import { useCart } from "@/contexts/useCart";

const Header: React.FC = () => {
  const { state, openCart } = useCart();

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-[#fff]">
      <div className="w-full h-full flex items-center justify-between p-[24px]">
        <div className="flex items-center justify-start h-[30px] rounded-full px-[16px] py-[8px] border border-gray-300 w-[200px]">
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none"
          />
          <img src={searchIcon} alt="Search" className="w-[24px] h-[24px]" />
        </div>
        <div className="h-full flex items-center justify-start">
          <Link to="/">
            <img
              src={popMartLogo}
              alt="Pop Mart Logo"
              className="h-[32px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="w-[200px] flex justify-end">
          <div
            className="flex items-center justify-center gap-[8px] cursor-pointer"
            onClick={openCart}
          >
            <img src={cartIcon} alt="Cart" className="w-[24px] h-[24px]" />
            <p className="select-none">{state.itemCount}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-[24px] border-t border-[#E5E5E5]">
        {/* <p className="text-[12px] uppercase font-300 cursor-pointer">
          Home
        </p>
        <p className="text-[12px] uppercase font-300 cursor-pointer">
          categories
        </p>
        <p className="text-[12px] uppercase font-300 cursor-pointer">
          characters
        </p>
        <p className="text-[12px] uppercase font-300 cursor-pointer">
          accessories
        </p>
        <p className="text-[12px] uppercase font-300 cursor-pointer">mega</p>
        <p className="text-[12px] uppercase font-300 cursor-pointer">
          store pickup
        </p> */}
      </div>
    </div>
  );
};

export default Header;
