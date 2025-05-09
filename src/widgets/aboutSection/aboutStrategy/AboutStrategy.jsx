import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import './aboutStrategy.scss';

export const AboutStrategy = ({ data }) => {
  // Извлекаем необходимые данные из API
  const items = [{
    id: 1,
    title: data?.title2 || "Стратегия развития",
    description: data?.description || "Описание стратегии развития академии",
  }];

  const swiperImages = data?.images || [];

  return (
    <main>
      <section className="about-texts">
        <div className="about-texts__content">
          {items.map((item) => (
            <article className="about-texts__item" key={item.id}>
              <h3 
                className="about-texts__item-title"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></h3>
              <p 
                className="about-texts__item-description"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
            </article>
          ))}
        </div>
      </section>
      <section className="info-carousel">
        <h2 className="info-carousel-title">
          {data?.title_page || "Наши цели и достижения на пути к будущему"}
        </h2>
        <div className="info-carousel__wrapper">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={13}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".info-carousel__pagination",
            }}
            className="info-carousel__swiper"
          >
            {swiperImages.map((item, index) => (
              <SwiperSlide key={index} className="info-carousel__slide">
                <img
                  src={item.image}
                  alt={`Слайд ${index + 1}`}
                  className="info-carousel__image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="info-carousel__pagination"></div>
        </div>
      </section>
    </main>
  );
};

AboutStrategy.propTypes = {
  data: PropTypes.shape({
    page_key: PropTypes.string,
    title_main: PropTypes.string,
    title2: PropTypes.string,
    title_page: PropTypes.string,
    description: PropTypes.string,
    addresses: PropTypes.any,
    links_carta: PropTypes.any,
    title_pdf: PropTypes.string,
    url_pdf: PropTypes.string,
    dowl_url: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

AboutStrategy.defaultProps = {
  data: {
    title2: "Стратегия развития",
    title_page: "Наши цели и достижения на пути к будущему",
    images: []
  }
};