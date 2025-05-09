import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { fetchEducationData, setSelected, setSelectedSub } from '../../app/redux/slices/educationSlice';
import { Navigations } from '../../features';
import { MainContent } from '../../widgets/educationSection/cpo/MainContent';

export const EducationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { navElements, selected, selectedSub, page } = useSelector(state => state.education);

  useEffect(() => {
    if (location.state) {
      const { selectedIndex, selectedSubIndex } = location.state;
      if (selectedIndex !== undefined) {
        dispatch(setSelected(selectedIndex));
        dispatch(setSelectedSub(selectedSubIndex ?? null));
      }
    } else {
      dispatch(fetchEducationData());
    }

    return () => {
      dispatch(setSelected(null));
      dispatch(setSelectedSub(null));
    };
  }, [dispatch, location.state]);
  return (
    <div className='pageNavigation'>
      <Navigations
        page={page}
        selected={selected}
        setSelected={(value) => dispatch(setSelected(value))}
        selectedSub={selectedSub}
        setSelectedSub={(value) => dispatch(setSelectedSub(value))}
        list={navElements.map((element, index) => ({
          ...element,
          title: index === 0 ? '' : element.title,
          twoLink: element.subMenu || []
        }))}
        res={true}
      />
      <div className="container">

        <MainContent
          data={
            selected === null
              ? [navElements[0]]
              : selectedSub === null
                ? [navElements[selected]]
                : [navElements[selected]?.subMenu[selectedSub]]
          }
        />
      </div>
    </div>
  );
};
