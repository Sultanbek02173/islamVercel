import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuideData, setSelected, setSelectedSub } from '../../app/redux/slices/guideSlice';
import { Navigations } from '../../features';
import { GuideSection } from '../../widgets';
import { useTranslation } from 'react-i18next';

export const GuidePage = () => {
  const dispatch = useDispatch();
  const { navElements, selected, selectedSub, page } = useSelector(state => state.guide);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchGuideData());
  }, [dispatch]);

  return (
    <div className='pageNavigation'>
      <Navigations
        page={page}
        selected={selected}
        setSelected={(value) => dispatch(setSelected(value))}
        selectedSub={selectedSub}
        setSelectedSub={(value) => dispatch(setSelectedSub(value))}
        list={navElements}
      />
      <div className="container">
        <h2 className='title_h2'>
          {t(selectedSub !== null && navElements?.[selected]?.twoLink?.[selectedSub]?.link
            ? navElements[selected].twoLink[selectedSub].link
            : navElements?.[selected]?.link
          )}
        </h2>
        <GuideSection />
      </div>
    </div>
  );
};
