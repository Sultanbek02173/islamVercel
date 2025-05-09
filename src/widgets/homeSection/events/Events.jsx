
import FonFull from '../../../shared/images/homeImages/fon-full.png';
import "./events.scss";

import { useSelector, useDispatch } from 'react-redux';
import { fetchBannerData } from '../../../app/redux/slices/homeSlice';
import { useEffect } from "react";

export const Events = () => {
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchBannerData());
  }, [dispatch]);

  return (
    <section className="events-section">
      <div className="container">
        <h2 className="op" id="events-title">{banner?.[0]?.title_we_suggest_you_watch_it}</h2> 

        <div className="events-container">
          {banner?.map((event, index) => (
            <div className="event-card" key={index}>
              <img src={event.image_obj} alt="Event" className="event-image" /> 
              <div className="event-content">
                <p className="event-date">{event.obj_date}</p> 
                <h3 className="event-title">{event.title_obj}</h3> 
                <p className="event-description" dangerouslySetInnerHTML={{ __html: event.description_obj }}></p> 
              </div>
            </div>
          ))}
          <img src={FonFull} alt="" className="fon__event" />
        </div>
      </div>
    </section>
  );
};
