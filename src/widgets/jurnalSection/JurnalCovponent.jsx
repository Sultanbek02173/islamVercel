import './Jurnal.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMagazinesData } from '../../app/redux/slices/homeSlice';
import truncate from 'html-truncate';
import { Link } from 'react-router-dom';
import Flg from '../../shared/images/homeImages/greenFlower.png';
import { useTranslation } from "react-i18next";


export const JurnalCovponent = () => {
  const dispatch = useDispatch();
  const { magazines, status } = useSelector((state) => state.home);
  const { t } = useTranslation();

  const truncateHTML = (html, maxLength) => {
    return truncate(html, maxLength, { ellipsis: '...' });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMagazinesData());
    }
  }, [dispatch, status]);

  return (
    <div className="container">
      <section className="news">
        <div className="text-news-head">
          <h2 className="op" id='title-head'>журналы</h2>
        </div>

        <div className="news-grid">
          {magazines.map((jurnalItem, index) =>
            jurnalItem.cards.map((card, subIndex) => (
              <div key={card.id || `card-${index}-${subIndex}`} className="news-card">
                {
                  card.image && (
                    <img src={card.image} className="news-image" />
                  )
                }
                <div className="card-flex">
                  <p className="date" style={{ marginTop: '10px' }}>{card.date}</p>
                  <h3 id="title-card" style={{ marginTop: '5px' }}>{card.title}</h3>
                </div>
                <p
                  style={{ marginTop: '5px' }}
                  className="card-desc"
                  dangerouslySetInnerHTML={{ __html: truncateHTML(card.text || '', 250) }}
                />
                <div className="academy-slider__footer">
                  <Link to={`/JurnalDetail/${card.id}`} state={{ item: card }}>
                    <p className="academy-slider__link">{t("читать больше")} ↗</p>
                  </Link>
                  <img src={Flg} alt="Цветок" className="academy-slider__flower" />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
