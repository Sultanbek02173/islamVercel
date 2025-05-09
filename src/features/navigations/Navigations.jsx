import { useState, useEffect } from 'react';
import './navigations.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";

export const Navigations = ({
  list = [],
  selected = null,
  setSelected,
  selectedSub = null,
  setSelectedSub = null,
  page = '',
  res = false,
  selectedIndex = null
}) => {
  const location = useLocation();
  const [selectedState, setSelectedState] = useState(null);
  const [openEventId, setOpenEventId] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      setSelectedState(selectedIndex);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (location.state) {
      const { selectedIndex: locationSelectedIndex, navElements } = location.state;
      if (locationSelectedIndex !== undefined) {
        setSelectedState(locationSelectedIndex);
      }
    }
  }, [location.state]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMobile && isNavOpen && !event.target.closest('.navigations')) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMobile, isNavOpen]);

  const processNavigationList = (list) => {
    if (!Array.isArray(list)) return [];
    const grouped = {};
    list.forEach((item) => {
      const key = item.title_main || item.title || item.type;
      if (!grouped[key]) {
        grouped[key] = { ...item, twoLink: [...(item.twoLink || [])] };
      } else {
        grouped[key].twoLink = [...grouped[key].twoLink, ...(item.twoLink || [])];
      }
    });
    return Object.values(grouped);
  };
  const navigationList = location.state?.navElements || list;

  const handleMainCategoryClick = (index) => {
    const hasSubMenu = navigationList[index]?.twoLink?.length > 0;
    setSelectedState(index);

    setSelected?.(index);
    setSelectedSub?.(hasSubMenu ? 0 : null);
    setOpenEventId((prev) => (prev === index ? null : index));
    if (isMobile) {
      setIsNavOpen(false);
    }
  };

  const handleSubClick = (subIndex, mainIndex) => {
    setSelectedState(mainIndex);
    setSelected?.(mainIndex);
    setSelectedSub?.(subIndex);
    if (isMobile) {
      setIsNavOpen(false); 
    }
  };

  const handleButtonClick = () => {
    setIsNavOpen(!isNavOpen);
    if (res) {
      setSelected?.(null);
      if (setSelectedSub) {
        setSelectedSub(null);
      }
      setOpenEventId(null);
    }
  };

  return (
    <div className='navigations'>
      <div className="navigation_group">
        <button
          type="button"
          className='navigations_btn'
          onClick={handleButtonClick}
        >
          {t(page)}
          <span>
            {isNavOpen ? <SlArrowUp /> : <SlArrowDown />}
          </span>
        </button>
        <AnimatePresence>
          {isNavOpen && navigationList.length > 0 && (
            <motion.aside
              className='nav-container visible'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {navigationList.map((item, index) => {
                const isMainActive = selectedState === index;
                const isOpen = openEventId === index;

                return (
                  <div key={index} className='nav-item'>
                    <button
                      type="button"
                      onClick={() => handleMainCategoryClick(index)}
                      className={`nav-element ${isMainActive ? 'active' : ''}`}
                    >
                      {t(item.link || item.title)}
                      {item.twoLink?.length > 0 && (
                        <span>{isOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && item.twoLink?.length > 0 && (
                        <motion.div
                          className={`sub-links ${isMobile ? 'mobile' : ''}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <motion.ul>
                            {item.twoLink.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <button
                                  type="button"
                                  onClick={() => handleSubClick(subIndex, index)}
                                  className={`sub-nav-element ${selectedSub === subIndex ? 'active' : ''}`}
                                >
                                  {t(subItem.title)} {subItem.link} {subItem.title2}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
