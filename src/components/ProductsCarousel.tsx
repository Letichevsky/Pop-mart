import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CarouselProduct from "@/components/CarouselProduct";
import products from "@/data/products.json";

interface ProductsCarouselProps {
  currentProductId: number;
}

const ProductsCarousel = ({ currentProductId }: ProductsCarouselProps) => {
  // Фильтруем продукты, исключая текущий
  const filteredProducts = products.products.filter(
    (product) => product.id !== currentProductId
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto py-[64px] px-[24px]">
      <div className="mb-[32px]">
        <h2 className="text-[32px] font-semibold text-center mb-[8px]">
          YOU MAY ALSO LIKE
        </h2>
      </div>

      <div className="relative bg-gray-100 p-[24px]">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={4}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="products-carousel"
          style={{ width: "100%", height: "400px" }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              style={{ width: "280px", height: "400px" }}
            >
              <div className="w-full h-full">
                <CarouselProduct
                  id={product.id}
                  isHot={product.isHot}
                  isNew={product.isNew}
                  image={product.productImages[0]}
                  category={product.category}
                  name={product.name}
                  description={product.description}
                  smallPrice={product.smallPrice}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомные кнопки навигации */}
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />

        {/* Кастомная пагинация */}
        <div className="swiper-pagination !top-[-16px] !right-[24px] !bottom-auto !text-[14px] !font-medium !text-right" />
      </div>
    </div>
  );
};

export default ProductsCarousel;
