import PropTypes from "prop-types";
import './aboutMission.scss';

export const AboutMission = ({items}) => {
  return (
    <main>
      <section className="about-texts">
        <div className="about-texts__content">
          {items?.map((item) => (
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
    </main>
  )
}
AboutMission.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
}