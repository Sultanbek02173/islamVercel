import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicantsData, setSelected } from '../../app/redux/slices/applicantsSlice';
import { Navigations } from '../../features';
import { EnrollAcademy } from '../../widgets';

export const ApplicantsPage = () => {
  const dispatch = useDispatch();
  const { navElements, selected, page,  } = useSelector(state => state.applicants);

  useEffect(() => {
    dispatch(fetchApplicantsData());
    return () => {
      dispatch(setSelected(null));
    };
  }, [dispatch]);

  const applicantsData = navElements?.[selected];
  return (
    <div className='pageNavigation'>
      <Navigations
        page={page}
        selected={selected}
        setSelected={(value) => dispatch(setSelected(value))}
        list={navElements}
      />
      <div className="container">
        {applicantsData && (
          <>
            <h2 className='title_h2'>{applicantsData.title}</h2>
            <EnrollAcademy applicants={applicantsData} />
          </>
        )}
      </div>
    </div>
  );
};
