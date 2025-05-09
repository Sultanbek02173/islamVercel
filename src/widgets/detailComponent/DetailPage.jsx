import React from 'react';
import './detail.scss';

export const DetailPage = ({ image, data, classPrefix }) => {
  return (
    <div className={`${classPrefix}__detail`}>
      <img src={image} className={`${classPrefix}__image`} alt="detail" />
      <div className='container'>
        {data.map((item, index) => (
          <div className={`${classPrefix}__content`} key={index}>
            <div className={`${classPrefix}__head`}>
              {item.name && <h1 className={`${classPrefix}__subtitle`}>{item.name}</h1>}
            </div>
            <div className={`${classPrefix}__texts`}>
              {item.discription && <p className={`${classPrefix}__text`}>{item.discription}</p>}  

              {item.hottitle && (     
                  
                <div className={`${classPrefix}__hot`}>    
 
                  <h2>{item.hottitle}</h2>
                  <p>{item.hotdisc}</p>
                </div>
              )}

              {(item.di || item.di2 || item.di3) && (
                <div className={`${classPrefix}__daily`}>
                  <h2>{item.newstitle}</h2>
                  {item.di && <li>{item.di}</li>}
                  {item.di2 && <li>{item.di2}</li>}
                  {item.di3 && <li>{item.di3}</li>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
