import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchBannerData } from '../../../app/redux/slices/homeSlice';

export const Navigation = ({ onMenuItemClick, className }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { banner } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchBannerData());
    }, [dispatch]);

    const titles = [
        { key: "title_1", path: "/", fallback: "Главная" },
        { key: "title_2", path: "/about-academy", fallback: "Об академии" },
        { key: "title_3", path: "/guide", fallback: "Руководство" },
        { key: "title_4", path: "/education", fallback: "Образование" },
        { key: "title_5", path: "/science", fallback: "Наука" },
        { key: "title_6", path: "/activity", fallback: "Деятельность" },
        { key: "title_7", path: "/students", fallback: "Студенты" },
        { key: "title_8", path: "/applicants", fallback: "Абитуриентам" }
    ];

    return (
        <nav className={className}>
            {titles.map(({ key, path, fallback }) => (
                <NavLink
                    key={key}
                    to={path}
                    className={({ isActive }) =>
                        isActive ? "header_bottom_link nav-active" : "header_bottom_link"
                    }
                    onClick={onMenuItemClick}
                >
                    {banner.length > 0 && banner[0][key] ? t(banner[0][key]) : fallback}
                </NavLink>
            ))}
        </nav>
    );
};
