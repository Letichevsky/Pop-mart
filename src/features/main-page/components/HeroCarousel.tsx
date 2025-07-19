import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { SwiperRef } from "swiper/react";

const HeroCarousel = () => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const heroImages = [
    "/hero_images/image01.jpg",
    "/hero_images/image02.jpg",
    "/hero_images/image03.jpg",
  ];

  return (
    <div className="w-[100%] relative">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".hero-swiper-button-next",
          prevEl: ".hero-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-carousel w-full h-[600px] md:h-[700px] lg:h-[800px]"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="hero-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#000]/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all duration-300">
        <svg
          className="w-[24px] h-[24px] text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      <div className="hero-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#000]/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all duration-300">
        <svg
          className="w-[24px] h-[24px] text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroCarousel;
