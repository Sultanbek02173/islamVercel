import Iko from "../../../shared/images/homeImages/homeiko.png";
import Whiteiko from "../../../shared/images/homeImages/whiteiko.png";
import FonFull from "../../../shared/images/homeImages/fon-full.png";
import './stepeni.scss';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBannerData } from '../../../app/redux/slices/homeSlice';
import { fetchEducationData } from '../../../app/redux/slices/educationSlice';
import { useEffect, useState } from "react";

export const Education = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { banner } = useSelector((state) => state.home);
    const { education } = useSelector((state) => state.education);

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        dispatch(fetchBannerData());
        dispatch(fetchEducationData());
    }, [dispatch]);

    const handleEducationItemClick = (globalIndex) => {
        setSelected(globalIndex);
        navigate("/education", { state: { selectedIndex: globalIndex, selectedSubIndex: null } });
    };

    if (!education?.allEducation || education.allEducation.length <= 1) {
        return <div>Загружаются данные...</div>;
    }

    const allItems = education.allEducation.slice(1);
    const uniqueItems = allItems.filter(
        (item, index, self) => self.findIndex(i => i.title === item.title) === index
    );

    const academicItems = uniqueItems.slice(0, 4);
    const additionalItems = uniqueItems.slice(4);

    return (
        <div className="container">
            <div className="stepen-container">
                <div className="head-stepen">
                    <h2 className="op" id="title-stepen">
                        {banner?.[0]?.title_scientific_degrees}
                    </h2>
                    <div className="stepen">
                        {academicItems.map((item, index) => (
                            <div
                                className="circle"
                                key={index}
                                onClick={() => handleEducationItemClick(index + 1)}
                                style={{
                                    backgroundColor: "rgba(241, 255, 212, 1)",
                                    color: "rgba(0, 95, 75, 1)",
                                    cursor: "pointer"
                                }}
                            >
                                <img src={Iko} alt="" />
                                <div className="education-card">
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                        <img src={FonFull} alt="" className="fon__stepen" />
                    </div>
                </div>
            </div>

            <div className="head-dop">
                <div className="dop-title">
                    <h3 className="op" id="title-dop">
                        <span>{banner?.[0]?.title_additional_professional_education}</span>
                    </h3>
                    <h4 className="op" id="kursy">{banner?.[0]?.title_courses}</h4>
                </div>
                <div className="dop-info">
                    {additionalItems.map((item, index) => {
                        const globalIndex = index + 5;
                        return (
                            <div
                                key={index}
                                onClick={() => handleEducationItemClick(globalIndex)}
                                className={`circled ${selected === globalIndex ? 'active' : ''}`}
                                style={{ backgroundColor: index < 2 ? "rgba(0, 95, 75, 1)" : "rgba(26, 66, 119, 1)" }}
                            >
                                <div className="circle">
                                    <img src={Whiteiko} alt="" />
                                    <div className="education-card">
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
