import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsData, setSelected, setSelectedSub } from '../../app/redux/slices/studentsSlice';
import { Navigations } from '../../features';
import { ParlamentStudents } from '../../widgets';
import { StudentsHostel } from '../../widgets/studentsSection/studentsHostel/StudentsHostel';
import { ActivStudents } from '../../widgets/studentsSection/activStudents/ActivStudents';

const getContentType = (data) => {
  if (!data || !Array.isArray(data)) return null;

  const hasParlament = data.some(card => card?.work?.length);
  const hasHostel = data.some(card => card?.images?.length || card?.description);

  if (hasParlament) return "parlament";
  if (hasHostel) return "hostel";

  return null;
};

export const StudentsPage = () => {
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { navElements, selected, selectedSub, page, banner } = useSelector(state => state.students);

  useEffect(() => {
    dispatch(fetchStudentsData());
  }, [dispatch]);

  useEffect(() => {
    setSelectedStudent(null);
  }, [selected, selectedSub, page, navElements, banner]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const currentData = navElements?.[selected] || {};
  const cards = currentData?.cards || [];
  const contentType = getContentType(cards);

  return (
    <div className='pageNavigation'>
      <Navigations
        page={page}
        selected={selected}
        setSelected={(value) => {
          setSelectedStudent(null);
          dispatch(setSelected(value));
        }}
        selectedSub={selectedSub}
        setSelectedSub={(value) => {
          setSelectedStudent(null);
          dispatch(setSelectedSub(value));
        }}
        list={navElements}
      />
      <div className="container">
        <h2 className='title_h2'>
          {selectedSub !== null && currentData?.cards?.[selectedSub]?.title
            ? currentData.cards[selectedSub].title
            : currentData?.link}
        </h2>

      
        {selectedStudent && (
          <ActivStudents data={selectedStudent} />
        )}

        {!selectedStudent && contentType === "hostel" && (() => {
          const hostelImages = cards.flatMap(card => card.images || []);
          return <StudentsHostel data={hostelImages} />;
        })()}

        {!selectedStudent && contentType === "parlament" && (
          <ParlamentStudents
            data={cards}
            onSelectStudent={handleSelectStudent}
          />
        )}
      </div>
    </div>
  );
};
