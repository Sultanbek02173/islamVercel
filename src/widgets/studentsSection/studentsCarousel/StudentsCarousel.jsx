import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './studentsCarousel.scss';

export const StudentsCarousel = ({ items }) => {
  const limitedItems = items.slice(0, 3); 

  return (
    <div className="student-slider">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={2}
        spaceBetween={0}
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
      >
        {limitedItems.map((item, index) => (
          <SwiperSlide key={index} className="student-slide">
            <img src={item} alt={`Slide ${index}`} className="student-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};