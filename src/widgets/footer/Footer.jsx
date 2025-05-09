import { NavLink } from "react-router-dom";
import Geeks from '../../features/images/Geeks.png';
import "./footer.scss";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiMapPinFill } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchBannerData } from '../../app/redux/slices/homeSlice';

export const Footer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchBannerData());
  }, [dispatch]);

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-flex">
          <div className="footer-navigation">
            <div className="footer-list">
              <h3 className="footer-title">{t("Навигация")}</h3>
              <li className="link-li">
                <NavLink to="/about-academy" className={({ isActive }) => isActive ? "active" : ""}>
                  {t("Об академии")}
                </NavLink>
              </li>
              <li className="link-li">
                <NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : ""}>
                  {t("Галерея")}
                </NavLink>
                
              </li>
              <li className="link-li">
                <NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""}>
                  {t("Новости")}
                </NavLink>
              </li>
              <li className="link-li">
                <NavLink to="/activity" className={({ isActive }) => isActive ? "active" : ""}>
                  {t("Деятельность")}
                </NavLink>
              </li>
            </div>
          </div>

          <div className="footer-navigation-2">
            <li className="link-li">
              <NavLink to="/management" className={({ isActive }) => isActive ? "active" : ""}>
                {t("Руководство")}
              </NavLink>
            </li>
            <li className="link-li">
              <NavLink to="/students" className={({ isActive }) => isActive ? "active" : ""}>
                {t("Студенты")}
              </NavLink>
            </li>
            <li className="link-li">
              <NavLink to="/education" className={({ isActive }) => isActive ? "active" : ""}>
                {t("Образование")}
              </NavLink>
            </li>
            <li className="link-li">
              <NavLink to="/science" className={({ isActive }) => isActive ? "active" : ""}>
                {t("Иследование")}
              </NavLink>
            </li>
            <li className="link-li" id="go-back">
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                {t("Вернуться обратно")}
              </NavLink>
            </li>
          </div>
        </div>

        <div className="footer-contact">
          <h3 className="footer-title-2">{t("Контакты")}</h3>
          <ul className="contact-info">
            {banner.length > 0 && (
              <>
                <li className="link-li-2">
                  <BiSolidPhoneCall /> {banner[0].phone_header}
                </li>
                <li className="link-li-2">
                  <MdOutlineMailOutline /> {banner[0].email_footer}
                </li>
                <li className="link-li-2">
                  <RiMapPinFill /> {banner[0].location}
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="footer-logo">
          <div className="logo-circle">
            {banner.length > 0 && (
              <img src={banner[0].image_below} alt="Footer Logo" className="logo-circle" />
            )}
          </div>
        </div>
</div>
      <a href="https://geeks.kg/">
        <div className="footer-bottom">
          <p>Made by <strong>Geeks Pro</strong></p>ㅤ
          <img src={Geeks} alt="geeks_logo ❤" />
        </div>
      </a>
    </footer>
  );
};
