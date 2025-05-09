import { useEffect } from 'react';
import { News } from '../../widgets/homeSection/news/News';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../../app/redux/slices/homeSlice';
import './news.scss';

export default function NewsSection() {
    const dispatch = useDispatch();
    const { news, status, } = useSelector((state) => state.home);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchNewsData());
        }
    }, [dispatch, status]);

    return (
        <div className='container'>
            {status === 'succeeded' && news.length > 0 && (
                <div className="news__banner" key={news[0].id}>
                    <h1 className='news__title'>{news[0].title}</h1>
                    <p className='news__desc' dangerouslySetInnerHTML={{ __html: news[0].description }}></p>
                </div>
            )}

            <News />
        </div>
    );
}