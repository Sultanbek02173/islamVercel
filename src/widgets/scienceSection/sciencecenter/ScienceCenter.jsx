import "./science.scss";

export const ScienceCenter = ({ data }) => {
  return (
    <div className="sciense">
      <div className="container">
        {data.map((item) => (
          <div key={item.id}>
            <p className="text" dangerouslySetInnerHTML={{ __html: item.description }}></p>
            {item.number && <p className="contact">{item.number}</p>}
            {item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}
          </div>
        ))}
      </div>
    </div>
  );
};
