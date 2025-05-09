import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import "./header.scss";
import "./styles/burgerMenu.scss"
import { TopHeader } from "./components/TopHeader";
import { Navigation } from "./components/Navigation";
import { activeMode, deactivateMode, useVisually } from "../../app/redux/slices/visually";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../features";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { fetchBannerData } from "../../app/redux/slices/homeSlice";
import { setLanguage } from "../../app/redux/store"; 

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const { active } = useVisually();
  const { banner } = useSelector((state) => state.home);

  const { t, i18n } = useTranslation();

  const handleChangeLang = ({ target: { value } }) => {
    i18n.changeLanguage(value); 
    dispatch(setLanguage(value));   };

  useEffect(() => {
    dispatch(fetchBannerData());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.burger-menu')) {
        setIsOpen(false);
      }
      if (isSearchVisible && !event.target.closest('.search-component') && !event.target.closest('.header_bottom_group_icon')) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isSearchVisible]);

  useEffect(() => {
    if (isOpen || isSearchVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSearchVisible]);

  useEffect(() => {
    if (banner && banner.length > 0) {
        const set = banner[0]; 

        const favicon = document.getElementById('academy');
        if (favicon && set.image_above) { 
          favicon.href = set.image_above; 
        }
      }
  }, [banner])

  const handleMenuItemClick = () => {
    setIsOpen(false);
    setIsSearchVisible(false)
  };

  const handleSearchOpen = () => {
    setIsSearchVisible(true);
    setIsOpen(false);
  };

  return (
    <div className="header">
      {isSearchVisible && (
        <div className="search-component">
          <Search onClose={() => setIsSearchVisible(false)} />
        </div>
      )}

      <TopHeader />

      <div className="header_bottom">
        <div className="container header_bottom_group">
          <div className="header_bottom_group_logo">
            <Link to="/">
              {banner.length > 0 && (
                <img
                  src={banner[0].image_above}
                  className="logo"
                  alt="logo"
                />
              )}
            </Link>
          </div>
          <Navigation
            className="desktop-menu"
            onMenuItemClick={handleMenuItemClick}
          />

          <div className="header-desktop-controls">
            <select className="desktop_select"
              onChange={handleChangeLang}
              value={i18n.language}
            // defaultValue={i18n.language}
            >
              <option value="en">{t("En")}</option>
              <option value="ky">{t("Ky")}</option>
              <option value="ru">{t("Ru")}</option>
            </select>
            <div className="header-desktop-controls-icon">
              <IoSearch
                className="header_bottom_group_icon"
                onClick={handleSearchOpen}
              />
              <div>
                {!active ? (
                  <FaEyeSlash onClick={() => {
                    dispatch(activeMode())
                    // mainTextSpeech('Режим для слабозрячих включен');
                  }} className="header_bottom_group_icon" />

                ) : (
                  <button className="activeBtn" onClick={() => {
                    dispatch(deactivateMode());
                    // mainTextSpeech('Режим для слабозрячих выключен');
                  }}>
                    <FaEyeSlash className="header_bottom_group_icon" />
                  </button>
                )}
              </div>
            </div>

            <div className="burger-menu">
              <input
                id="menu__toggle"
                type="checkbox"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
              />

              <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
              </label>

              <div className={`menu__box ${isOpen ? 'open' : ''}`}>
                <div className="mobile-header">
                  <Link onClick={handleMenuItemClick} to="/">
                    {banner.length > 0 && (
                      <img
                        src={banner[0].image_above}
                        className="logo"
                        alt="logo"
                      />
                    )}
                  </Link>

                  <div className="header-controls">
                    <select onChange={handleChangeLang} value={i18n.language}
                    //  defaultValue={i18n.language}
                    >
                      <option value="ky">{t("Ky")}</option>
                      <option value="en">{t("En")}</option>
                      <option value="ru">{t("Ru")}</option>
                    </select>
                    <IoSearch
                      className="header_bottom_group_icon"
                      onClick={handleSearchOpen}
                    />
                    <div>
                      {!active ? (
                        <FaEyeSlash onClick={() => {
                          dispatch(activeMode())
                          // mainTextSpeech('Режим для слабозрячих включен');
                        }} className="header_bottom_group_icon" />

                      ) : (
                        <button className="activeBtn" onClick={() => {
                          dispatch(deactivateMode());
                          // mainTextSpeech('Режим для слабозрячих выключен');
                        }}>
                          <FaEyeSlash className="header_bottom_group_icon" />
                        </button>
                      )}
                      <input
                        id="menu__toggle"
                        type="checkbox"
                        checked={isOpen}
                        onChange={() => setIsOpen(!isOpen)}
                      />
                      <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                      </label>
                    </div>
                  </div>
                </div>
                <Navigation
                  className="mobile-menu"
                  onMenuItemClick={handleMenuItemClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
