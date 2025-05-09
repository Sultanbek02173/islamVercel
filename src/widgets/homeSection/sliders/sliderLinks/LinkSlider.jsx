import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import "./sliderLinks.scss";
import axios from "axios";

export const LinkSlider = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get("https://www.islamacademy.webtm.ru/ru/api/v1/main/settings/")
      .then(response => {
        const allSettings = response.data.flatMap(item => item.settings_objects || []);
        setLinks(allSettings);
      })
      .catch(error => console.error("Ошибка загрузки данных:", error));
  }, []);

  return (
    <div className="container">
      <div className="marquee-container">
        <Marquee speed={50} gradient={true} gradientColor={[0, 0, 0]} gradientWidth={50}>
          {links.map((item) => (
            <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="marquee-link">
               <img src={item.logo} alt="" className="logo_link"/>
              {item.text_link}
             
            </a>
         
          ))}
        </Marquee>
      </div>
    </div>
  );
};


