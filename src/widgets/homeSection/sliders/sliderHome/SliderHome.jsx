import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGalleryPhotos } from '../../../../app/redux/slices/gellarySlice';
import { fetchBannerData } from '../../../../app/redux/slices/homeSlice';

import './sliderHome.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export const SliderHome = () => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.gallery);
  const { banner } = useSelector((state) => state.home);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchGalleryPhotos());
    dispatch(fetchBannerData());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="gallery-slider">
        <div className="text__gal">
          <h1 className='academy__title'>{banner?.[0]?.title_gallery || t("ГАЛЕРЕЯ")}</h1>
          <Link to={'/gallery'}>
            <p className='galer'>{t("Смотреть дальше ")} ↗</p>
          </Link>
        </div>

        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={2}
          spaceBetween={0}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
        >
          {photos.map((item, id) => (
            <SwiperSlide key={id} className="gallery-slide">
              <img src={item.photo} alt="Gallery" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};