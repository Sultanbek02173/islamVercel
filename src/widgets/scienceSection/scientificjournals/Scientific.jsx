import './scientific.scss';

export const Scientific = ({ data }) => {
    return (
        <div className="publicatinon">
            <div className="container">
                <p className="description">
                    Научные исследования в нашей Академии — это основа для развития новых идей и инновационных решений. Мы стремимся к углубленному изучению различных дисциплин, проводя исследования, которые способствуют научному прогрессу и решению актуальных задач общества.
                </p>
                <h1 className="container__title">Научные журналы</h1>
                <div className="container__list">
                    {data.map((item) => (
                        <div key={item.id} className="publication-card">
                            <div className="publication-card__logo">
                                <span>ИССЛАМСКАЯ</span>
                                <span>АКАДЕМИЯ</span>
                            </div>
                            <div className="publication-card__content">
                                <h2 className="publication-card__title">{item.title}</h2>
                                <p className="publication-card__description" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                {item.link && <a className="publication-card__Link" href={item.link}>Прочитать еще...</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Scientific;