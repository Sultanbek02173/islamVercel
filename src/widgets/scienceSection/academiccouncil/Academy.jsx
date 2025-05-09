import "./academy.scss";

export const Academy = ({ data }) => {

  const firstItem = Array.isArray(data) && data.length > 0 ? data[0] : null;
  const remainingItems = Array.isArray(data) && data.length > 1 ? data.slice(1) : [];

  return (
    <div className="academy">
      <div className="list">
        {firstItem?.description && (
          <p className="description" dangerouslySetInnerHTML={{ __html: firstItem.description }}></p>
        )}
        {remainingItems.map((item) => (
          <div key={item.id} className="container__list">
            {item.image && (
              <div className="publication-card__logo">
                <img src={item.image} className="publication-card__image" alt="card" />
              </div>
            )}
            <div>
              {item.title && <h2 className="title">{item.title}</h2>}
              {item.description && (
                <p className="description" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              )}
              {item.link && (
                <a className="publication-card__Link" href={item.link}>
                  Прочитать еще...
                </a>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};
