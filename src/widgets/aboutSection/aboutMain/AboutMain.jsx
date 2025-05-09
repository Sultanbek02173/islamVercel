import { FaLocationDot, FaPhone, FaClock } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './aboutMain.scss';
import { AboutDocument } from '../aboutDocument/AboutDocument';
import { Map2GIS } from './Map2GIS';
import { useEffect } from 'react';

export const AboutMain = ({ items = null }) => {

  if (!items) return <div>Нет данных для отображения</div>;

  const getIcon = (type) => {
    switch (type) {
      case 'phone':
        return <FaPhone className="about-navigate__item-icon" />;
      case 'location':
        return <FaLocationDot className="about-navigate__item-icon" />;
      case 'hours':
        return <FaClock className="about-navigate__item-icon" />;
      default:
        return <FaLocationDot className="about-navigate__item-icon" />;
    }
  };

  const parseAddresses = (number, adres, rab) => {
    return {
      phone: number || 'Телефон не указан',
      location: adres || 'Адрес не указан',
      hours: rab || 'Часы работы не указаны',
    };
  };

  const hasValidDocumentData = items.about_object_pdf?.length > 0;

  const documentItems = hasValidDocumentData
    ? items.about_object_pdf.map((doc) => ({
      id: doc.id,
      title: doc.title,
      link_open: doc.url_pdf,
      link_download: doc.dowl_url,
    }))
    : [];

  const addressData = parseAddresses(items.number, items.adres, items.rab);
  const mapLink = items.links_carta || addressData.location; // Убедимся, что карта получает корректные данные

  useEffect(() => {
    if (!mapLink) {
      console.warn('Карта не может быть отображена: отсутствуют данные о местоположении.');
    }
  }, [mapLink]);

  return (
    <main>
      <section className="about-texts">
        <div className="about-texts__content">
          <article className="about-texts__item">
            <h1
              className="about-texts__item-main title_h2"
              dangerouslySetInnerHTML={{ __html: items.title_page }}
            />
            {/* {items.title && (
              <h2
                className="about-texts__item-subtitle"
                dangerouslySetInnerHTML={{ __html: items.title }}
              />
            )} */}
            <p
              className="about-texts__item-description"
              dangerouslySetInnerHTML={{ __html: items.description }}
            />
            {items.about_object?.length > 0 &&
              items.about_object.map((obj, index) => (
                <div key={index}>
                  {obj.title && (
                    <h3
                      className="about-texts__item-subtitle"
                      dangerouslySetInnerHTML={{ __html: obj.title }}
                    />
                  )}
                  <p
                    className="about-texts__item-description"
                    dangerouslySetInnerHTML={{ __html: obj.description }}
                  />
                  {obj.images?.length > 0 && (
                    <section className="info-carousel">
                      <div className="student-slider">
                        <Swiper
                          modules={[EffectCoverflow, Autoplay]}
                          effect="coverflow"
                          grabCursor
                          centeredSlides
                          loop
                          slidesPerView={2}
                          spaceBetween={13}
                          autoplay={{ delay: 20000, disableOnInteraction: false }}
                          coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2,
                            slideShadows: false,
                          }}
                        >
                          {obj.images.slice(0, 10).map((item, imgIndex) => (
                            <SwiperSlide key={imgIndex} className="student-slide">
                              <img
                                src={item.image}
                                alt={`Слайд ${imgIndex + 1}`}
                                className="student-image"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </section>
                  )}
                </div>
              ))}
          </article>
        </div>
      </section>

      {(addressData.phone !== 'Телефон не указан' ||
        addressData.location !== 'Адрес не указан' ||
        addressData.hours !== 'Часы работы не указаны') && (
          <section className="about-navigate">
            <div className="about-navigate__content">
              <article className="about-navigate__info">
                <div className="about-navigate__item">
                  {addressData.phone !== 'Телефон не указан' && (
                    <div className="about-navigate__item-details">
                      {getIcon('phone')}
                      <div className="about-navigate__item-details-block">
                        <h3 className="about-navigate__item-title">Телефон номер</h3>
                        <p
                          className="about-navigate__item-description"
                          dangerouslySetInnerHTML={{ __html: addressData.phone }}
                        />
                      </div>
                    </div>
                  )}
                  {addressData.location !== 'Адрес не указан' && (
                    <div className="about-navigate__item-details">
                      {getIcon('location')}
                      <div className="about-navigate__item-details-block">
                        <h3 className="about-navigate__item-title">Адрес</h3>
                        <p
                          className="about-navigate__item-description"
                          dangerouslySetInnerHTML={{ __html: addressData.location }}
                        />
                      </div>
                    </div>
                  )}
                  {addressData.hours !== 'Часы работы не указаны' && (
                    <div className="about-navigate__item-details">
                      {getIcon('hours')}
                      <div className="about-navigate__item-details-block">
                        <h3 className="about-navigate__item-title">Часы работы</h3>
                        <p
                          className="about-navigate__item-description"
                          dangerouslySetInnerHTML={{ __html: addressData.hours }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </article>

              <aside className="about-navigate__map">
                <Map2GIS mapLink={mapLink} /> {/* Передаем корректный mapLink */}
              </aside>
            </div>
          </section>
        )}

      {documentItems.length > 0 && <AboutDocument items={documentItems} />}
    </main>
  );
};

AboutMain.propTypes = {
  items: PropTypes.shape({
    title: PropTypes.string,
    title_page: PropTypes.string,
    description: PropTypes.string,
    number: PropTypes.string,
    adres: PropTypes.string,
    rab: PropTypes.string,
    links_carta: PropTypes.string,
    about_object_pdf: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        url_pdf: PropTypes.string,
        dowl_url: PropTypes.string,
      })
    ),
    about_object: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            image: PropTypes.string,
          })
        ),
      })
    ),
  }),
};