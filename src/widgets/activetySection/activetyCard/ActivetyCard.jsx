import "./activetyCard.scss";

export const ActivetyCard = ({ cards = [] }) => {
  return (
    <div className="activetyCard">
      {cards.map((item, index) => (
        <div
          className="activetyCard_bloc"
          key={`${item.id}-${index}`} 
        >
          <div className="activetyCard_bloc_img">
            <img src={item.image} alt={`${item.title}`} />
          </div>
          <div className="activetyCard_bloc_text">
            <h2>{item.date}</h2>
            <h3>{item.title}</h3>
            <p  dangerouslySetInnerHTML={{ __html: item?.description || '' }}></p>
            <h4>{item.location}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};
