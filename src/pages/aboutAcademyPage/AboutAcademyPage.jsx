import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchAboutData, setSelected, setSelectedSub } from '../../app/redux/slices/aboutSlice';
import { Navigations } from '../../features';
import { AboutMain } from '../../widgets';

export const AboutAcademyPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { navElements, selected, selectedSub, page, isLoading, error } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAboutData());
  }, [dispatch]);

  useEffect(() => {
    if (navElements.length > 0) {
      dispatch(setSelected(0));
      dispatch(setSelectedSub(0));
    }
  }, [dispatch, navElements]);

  const selectedItem = (() => {
    if (navElements.length === 0) {
      return null;
    }

    const selectedMain = navElements[selected] || navElements[0];
    if (selectedMain) {
      if (selectedSub !== null && selectedMain.cards?.[selectedSub]) {
        const sub = selectedMain.cards[selectedSub];
        return {
          ...sub,
          title_page: sub.title_page || '',
          links_carta: sub.links_carta || '',
          description: sub.description || '',
          number: sub.number || '', // Добавляем номер телефона
          adres: sub.adres || '', // Добавляем адрес
          rab: sub.rab || '', // Добавляем часы работы
          images: sub.about_object?.[0]?.images || [],
          about_object_pdf: sub.about_object_pdf || [],
        };
      }

      if (selectedMain.cards?.length > 0) {
        return {
          ...selectedMain,
          title_page: selectedMain.cards[0]?.title_page || '',
          links_carta: selectedMain.cards[0]?.links_carta || '',
          description: selectedMain.cards[0]?.description || '',
          number: selectedMain.cards[0]?.number || '', // Добавляем номер телефона
          adres: selectedMain.cards[0]?.adres || '', // Добавляем адрес
          rab: selectedMain.cards[0]?.rab || '', // Добавляем часы работы
          images: selectedMain.cards[0]?.about_object?.[0]?.images || [],
          about_object_pdf: selectedMain.cards[0]?.about_object_pdf || [],
        };
      }
    }

    return null;
  })();

  return (
    <div className='pageNavigation'>
      <Navigations
        page={page}
        selected={selected}
        setSelected={(value) => dispatch(setSelected(value))}
        selectedSub={selectedSub}
        setSelectedSub={(value) => dispatch(setSelectedSub(value))}
        list={navElements.map((element) => {
          const twoLink = element.cards?.map((card) => ({
            title: card.title2,
            page_key: card.page_key,
            description: card.description || '',
          })).filter((link) => link.title || link.page_key) || [];
          return {
            ...element,
            twoLink,
          };
        })}
        res={true}
      />
      <div className="container">
        {selectedItem ? (
          <AboutMain items={selectedItem} />
        ) : (
          <p>Нет данных для отображения.</p>
        )}
      </div>
    </div>
  );
};
