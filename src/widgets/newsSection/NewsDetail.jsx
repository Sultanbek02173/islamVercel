import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './news.scss';

export const NewsDetail = () => {
  const { id } = useParams(); 
  const { news } = useSelector((state) => state.home);
  const item = news[0]?.cards.find((card) => card.id === parseInt(id)); 

  if (!item) {
    return (
      <div className="news__detail">
        <div className="container">
          <p>Данные не найдены. Вернитесь на страницу новостей.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news__detail">
      <div className="image-container">
        {
          item.image && (
            <img src={item.image} className="news__image" alt="detail" />
          )
        }
      </div>

      <div className="container">
        <div className="news__subtitle-container">
          <h1 className="news__subtitle">{item.title}</h1>
        </div>

        <div className="news__content">
          <div
            className="news__texts"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        </div>
      </div>
    </div>
  );
};
