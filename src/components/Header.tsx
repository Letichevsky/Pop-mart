import React from "react";
import popMartLogo from "@/assets/pop-mart_logo.svg";
import searchIcon from "@/assets/icons/Search.svg";
import cartIcon from "@/assets/icons/Cart.svg";

const Header: React.FC = () => {
  return (
    <div className="w-full bg-white">
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
          <img src={popMartLogo} alt="Pop Mart Logo" className="h-[32px]" />
        </div>
        <div className="w-[200px] flex justify-end">
          <div className="flex items-center justify-center gap-[8px]">
            <img src={cartIcon} alt="Cart" className="w-[24px] h-[24px]" />
            <p className="select-none">0</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[48px] flex items-center justify-center gap-[24px] border-t border-b border-[#E5E5E5]">
        <p className="text-[12px] uppercase font-300 cursor-pointer">
          new & featured
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
        </p>
      </div>
    </div>
  );
};

export default Header;
