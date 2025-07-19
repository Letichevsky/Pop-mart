import PageTitle from "@/features/main-page/components/PageTitle";
import ProductsGalary from "@/features/main-page/components/ProductsGalary";
import HeroCarousel from "@/features/main-page/components/HeroCarousel";

const Index = () => {
  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      <HeroCarousel />
      <PageTitle />
      <ProductsGalary />
    </div>
  );
};

export default Index;
