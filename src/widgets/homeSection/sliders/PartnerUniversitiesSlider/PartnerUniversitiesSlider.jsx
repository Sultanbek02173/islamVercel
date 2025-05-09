import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMagazinesData, fetchBannerData } from '../../../../app/redux/slices/homeSlice';
import { useTranslation } from "react-i18next";
import truncate from 'html-truncate';

import Flg from '../../../../shared/images/homeImages/greenFlower.png';
import './PartnerUniversitiesSlider.scss';
import { Link } from 'react-router-dom';

export const PartnerUniversitiesSlider = () => {
  const dispatch = useDispatch();
  const { magazines, banner } = useSelector((state) => state.home);
  const { t } = useTranslation();

  const truncateHTML = (html, maxLength) => {
    return truncate(html || '', maxLength, { ellipsis: '...' });
  };

  useEffect(() => {
    dispatch(fetchMagazinesData());
    dispatch(fetchBannerData());

  }, [dispatch]);

  return (
    <div className="container">
      <h1 className='academy__title'>
        {banner[0]?.title_journals_of_partner_universities}
      </h1>

      {magazines.length > 1 && magazines[1].cards && magazines[1].cards.length > 0 ? (
        <Swiper
          modules={[FreeMode]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 4 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {magazines[1].cards.map((card, index) => (
            <SwiperSlide key={index} className="partner-slider__slide">
              <div className="partner-slider__card">
                {
                  card.image && (
                    <img
                      src={card.image}
                      alt="Обложка журнала"
                      className="partner-slider__image"
                    />
                  )
                }
                
                <div className="partner-slider__info">
                  <p className="partner-slider__date">{card.date}</p>
                  <h3 className="partner-slider__title">{card.title}</h3>
                </div>
                <p
                  className="partner-slider__desc"
                  dangerouslySetInnerHTML={{ __html: truncateHTML(card.text, 250) }}
                ></p>
                <div className="partner-slider__footer">
                  <Link to={`/JurnalDetail/${card.id}`} state={{ item: card }}>
                    <p className="academy-slider__link">{t("читать больше")} ↗</p>
                  </Link>                  <img src={Flg} alt="Цветок" className="partner-slider__flower" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

