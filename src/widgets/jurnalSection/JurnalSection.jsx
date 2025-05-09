import { JurnalCovponent } from './JurnalCovponent';
import { useEffect } from 'react';
import './Jurnal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMagazinesData } from '../../app/redux/slices/homeSlice';

export const JurnalSection = () => {
    const dispatch = useDispatch();
    const { magazines, status } = useSelector((state) => state.home);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMagazinesData());
        }
    }, [dispatch, status]);

    return (
        <div className='container'>
            {magazines.slice(0, 1).map((item) => (
                <div className="news__banner" key={item.id}>
                    <h1 className='news__title'>{item.title}</h1>
                    <p className='news__desc' dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </div>
            ))}
            <JurnalCovponent />
        </div>
    );
};
