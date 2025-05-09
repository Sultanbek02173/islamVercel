import { useLocation } from 'react-router-dom';
import './Jurnal.scss';   

export const JurnalDetail = () => {
  const location = useLocation();
  
  const item = location.state?.item;
  

  if (!item) {
    return (
      <div className="jurnal__detail">
        <div className="container">
          <p>Данные не найдены. Вернитесь на страницу новостей.</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="jurnal__detail">
      
      <div className="image-container">
        {
          item.image && (
            <img src={item.image} className="jurnal__image" alt="detail" />
          )
        }
      </div>

  
      <div className="container">
       
        <div className="jurnal__subtitle-container">
          <h1 className="jurnal__subtitle">{item.title}</h1>
        </div>  

        <div className="jurnal__content">
          <div
            className="jurnal__texts"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        </div>
      </div>
    </div>
  );
};
