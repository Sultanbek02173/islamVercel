import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData, fetchBannerData } from '../../../app/redux/slices/homeSlice';
import { Link, useLocation } from 'react-router-dom';
import './news.scss';
import F1 from '../../../shared/images/homeImages/flower.png';
import { useTranslation } from "react-i18next";
import truncate from 'html-truncate';

export const News = () => {
  const dispatch = useDispatch();
  const { news, banner } = useSelector((state) => state.home); 
  const { t } = useTranslation();
  const location = useLocation();
  const locat = location.pathname
  
  const truncateHTML = (html, maxLength) => {
    return html ? truncate(html, maxLength, { ellipsis: '...' }) : '';
  };

  useEffect(() => {
    dispatch(fetchNewsData());
    dispatch(fetchBannerData()); 
  }, [dispatch]);


  return (
    <div className="container">
      <section className="news">
        <div className="text-news-head">
        <h2 className="op" id='title-head'>{banner?.[0]?.title_news}</h2>
        {
          locat !== '/news' ? (
            <Link to={'/news'}><p className='view-all'>{t("читать больше")}→</p> </Link>
          ) : ''
        }
        
        </div>

        <div className="news-grid">
        {news[0]?.cards.map((card, index) => (
            <div key={index} className="news-card">
              <div className="ol">
                <img src={card.image} className="news-image" alt={card.title} />
                <div className="card-flex">
                  <p className="date" style={{ marginTop: '10px' }}>{card.date}</p>
                  <h3 id="title-card" style={{ marginTop: '5px' }}>{card.title}</h3>
                </div>
                <p
                  className="card-desc"
                  dangerouslySetInnerHTML={{ __html: truncateHTML(card.text, 250) }}
                ></p>
              </div>
              <div className="flex-i">
                <Link to={`/newsDetail/${card.id}`} state={{ card }}>
                  <p className='view-all'>{t("читать больше")}↗</p>
                </Link>
                <img src={F1} className="flower" alt="flower" />
              </div>
            </div>
          ))}
        
        </div>
      </section>
    </div>
  );
};
