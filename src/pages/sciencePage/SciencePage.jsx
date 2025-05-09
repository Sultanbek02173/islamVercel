import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScienceData, setSelected, setSelectedSub } from '../../app/redux/slices/scienceSlice';
import { Navigations } from '../../features';
import { Academy } from '../../widgets';


export const SciencePage = () => {
  const dispatch = useDispatch();
  const { navElements, selected, selectedSub, page } = useSelector(state => state.science);

  useEffect(() => {
    dispatch(fetchScienceData());
  }, [dispatch]);

  const currentData = navElements?.[selected];
  const cards = currentData?.cards || [];

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
          {selectedSub !== null && currentData?.cards?.[selectedSub]?.title
            ? currentData.cards[selectedSub].title
            : currentData?.link}
        </h2>
        <Academy data={cards} />
      </div>
    </div>
  );
};

