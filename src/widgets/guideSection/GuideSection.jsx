import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import truncate from 'html-truncate';
import "./departments/departments.scss"
import "./rector/rector.scss"
import "./vacancies/vacancies.scss"
export const GuideSection = () => {
    const { selected, selectedSub } = useSelector((state) => state.guide);
    const navElements = useSelector((state) => state.guide.navElements);

    const [openIndex, setOpenIndex] = useState(null);
    const [openIndexes, setOpenIndexes] = useState({});

    const toggleOpen = (index) => {
        setOpenIndexes((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const renderContent = () => {
        const validSelected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];
        if (!validSelected.includes(selected)) {
            return <p>Выбранный элемент не поддерживается</p>;
        }

        const data = navElements?.[selected]?.twoLink?.[selectedSub]?.data;

        if (data) {
            if (data?.leadership_objects && data?.position) {
                const leadershipObjects = data.leadership_objects || [];
                return (
                    <section className="rector">
                        <div className="container">
                            <div className="rector_content">
                                <div className="rector_content_img">
                                    <img src={data?.image} alt={data?.name || 'Ректор'} />
                                    <div className="rector_content_img_text">
                                        <h3>{data?.name}</h3>
                                        <h3>{data?.position}</h3>
                                        {data?.responsibilities && (
                                            <h4 dangerouslySetInnerHTML={{ __html: data.responsibilities }}></h4>

                                        )}
                                    </div>
                                </div>
                                {leadershipObjects.map((item, index) => (
                                    <div
                                        className="rector_content_info"
                                        key={item.id || index} 
                                        onClick={() => toggleOpen(index)}
                                    >
                                        {!openIndexes[index] && item.description && (
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        item.description.length > 262
                                                            ? item.description.slice(0, 262) + '...'
                                                            : item.description,
                                                }}
                                            ></p>
                                        )}
                                        <AnimatePresence initial={false}>
                                            {openIndexes[index] && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="rector_content_info_expanded"
                                                >
                                                    <p dangerouslySetInnerHTML={{ __html: item.description || '' }}></p>
                                                    <h4>{data.contact}</h4>
                                                    <div className="rector_content_info_contacts">
                                                        <div>
                                                            <p className="email">
                                                                <a href={`mailto:${data?.email}`}>{data?.email}</a>
                                                            </p>
                                                            <p className="tel">
                                                                <a href={`tel:${data?.phone}`}>{data?.phone}</a>
                                                            </p>
                                                        </div>
                                                        <a href={data.link} className="rector_content_info_contacts_btn">
                                                            Открыть PDF
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className="rector_content_info_footer">
                                            <h3>{data.date_publication}</h3>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleOpen(index);
                                                }}
                                            >
                                                {openIndexes[index] ? 'Свернуть' : 'Раскрыть'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            } else {
                // Обработка departmentData
                return (
                    <div className="department">
                        <p dangerouslySetInnerHTML={{ __html: data.responsibilities }}></p>
                        <h4>{data.head}</h4>
                        <h3>{data.contact}</h3>
                        <h5>
                            <a href={`tel:${data?.phone}`}>{data?.phone}</a>
                        </h5>
                        <a href={`mailto:${data.email}`}>{data.email}</a>
                    </div>
                );
            }
        }

        if (selected === 2) {
            const vacanciesList = navElements?.[2]?.data || [];
            const limitedVacanciesList = vacanciesList.slice(0, 5);

            if (!vacanciesList || vacanciesList.length === 0) {
                return <p>Вакансий нет</p>;
            }

            return (
                <div className="vacancies">
                    <div className="container">
                        {limitedVacanciesList.map((vacancy, index) => (
                            <div
                                className="vacancies_content_info"
                                key={vacancy.id || index} // Добавлен уникальный ключ
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >

                                {openIndex !== index && vacancy.responsibilities && (
                                    <ul className="vacancies_content_info_list">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: truncate(vacancy.responsibilities, 200),
                                            }}
                                        />
                                    </ul>
                                )}

                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="vacancies_content_info_expanded"
                                        >
                                            <ul className="vacancies_content_info_list">
                                                {vacancy.responsibilities && (
                                                    <p
                                                        key={index}
                                                        dangerouslySetInnerHTML={{ __html: vacancy.responsibilities }}
                                                    />
                                                )}
                                            </ul>
                                            <h4>{vacancy.contact}</h4>
                                            <div className="vacancies_content_info_contacts">
                                                <p className="email">
                                                    <a href={`mailto:${vacancy.email}`}>{vacancy.email}</a>
                                                </p>
                                                <p className="tel">
                                                    <a href={`tel:${vacancy.phone}`}>{vacancy.phone}</a>
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="vacancies_content_info_footer">
                                    <p>{vacancy.date_publication}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenIndex(openIndex === index ? null : index);
                                        }}
                                    >
                                        {openIndex === index ? '- Свернуть' : '+ Раскрыть'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return <div>{renderContent()}</div>;
};
