import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useTranslation } from "react-i18next";
import truncate from 'html-truncate';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMagazinesData, fetchBannerData } from '../../../../app/redux/slices/homeSlice';

import Flg from '../../../../shared/images/homeImages/greenFlower.png';
import { Link } from 'react-router-dom';
import './IslamicAcademySlider.scss';

export const IslamicAcademySlider = () => {
  const dispatch = useDispatch();
  const { magazines, banner } = useSelector((state) => state.home);
  const { t } = useTranslation();

  const truncateHTML = (html, maxLength) => {
    return truncate(html || '', maxLength, { ellipsis: '...' });
  };

  useEffect(() => {
    dispatch(fetchMagazinesData());
    dispatch(fetchBannerData());

  }, [dispatch,]);

  return (
    <div className="container">
      <div className="text__head">
        <h1 className="academy__title">
          {banner[0]?.title_journal_of_the_islamic_academy}
        </h1>
        <Link to={'/JurnalSection'} >
          <p className="academy__link">{t("читать больше")}</p>
        </Link>
      </div>

      {magazines.length > 0 && magazines[0].cards && magazines[0].cards.length > 0 ? (
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
          {magazines[0].cards.map((card, index) => (
            <SwiperSlide key={index} className="academy-slider__slide">
              <div className="academy-slider__card">
                <div className="ol">
                  {
                    card.image && (
                      <img
                        src={card.image}
                        alt="Обложка журнала"
                        className="academy-slider__image"
                      />
                    )
                  }
                  
                  <div className="academy-slider__info">
                    <p className="academy-slider__date">{card.date}</p>
                    <h3 className="academy-slider__title">{card.title}</h3>
                  </div>

                  <p
                    className="academy-slider__desc"
                    dangerouslySetInnerHTML={{ __html: truncateHTML(card.text, 200) }}
                  ></p>
                </div>
                <div className="academy-slider__footer">
                  <Link to={`/JurnalDetail/${card.id}`} state={{ item: card }}>
                    <p className="academy-slider__link">{t("читать больше")} ↗</p>
                  </Link>
                  <img src={Flg} alt="Цветок" className="academy-slider__flower" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};
