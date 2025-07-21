import PageTitle from "@/features/main-page/components/PageTitle";
import ProductsGalary from "@/features/main-page/components/ProductsGalary";
// import HeroCarousel from "@/features/main-page/components/HeroCarousel";
import React, { useRef } from "react";

const Index = () => {
  const galaryRef = useRef<HTMLDivElement>(null);

  const handleShopNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (galaryRef.current) {
      const rect = galaryRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      {/* <HeroCarousel /> */}
      <div className="flex flex-col items-center justify-center w-[100%] relative">
        <img
          src="/hero_images/image01.jpg"
          alt="hero"
          className="w-[100%] object-cover"
        />
        <div className="absolute top-[70%] left-[0] w-[100%] flex flex-col items-center justify-center gap-[24px]">
          <h1 className="w-[100%] text-[48px] font-[600] text-[#fff] text-center">
            THE MONSTERS Big into Energy Series
          </h1>
          <a
            href="#galary"
            className="text-[#fff] uppercase underline font-[600] text-[20px]"
            onClick={handleShopNowClick}
          >
            Shop Now
          </a>
        </div>
      </div>
      <PageTitle />
      <ProductsGalary ref={galaryRef} />
    </div>
  );
};

export default Index;
