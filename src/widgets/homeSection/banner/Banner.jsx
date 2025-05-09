import './banner.scss'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBannerData } from '../../../app/redux/slices/homeSlice';

export const Banner = () => {
  const dispatch = useDispatch();
  const { banner,  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchBannerData()); 
  }, [dispatch]);

  return (
    <section className="home-banner">
      <div className="home-fon">
        <div className="home-tit">
          <div className="container">
            {banner.filter(item => item.title_banner || item.image_above).map((item, index) => (
              <div className="baner-content" key={index}>
                <h1 id="title-banner">{item.title_banner}</h1>
                <div className="text_img">
                  <div className="text-ban">
                    <p className="title-desc" dangerouslySetInnerHTML={{ __html: item.description_banner }}></p>
                  </div>
                  <img src={item.image_banner} id="banner-image" alt="Banner" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};