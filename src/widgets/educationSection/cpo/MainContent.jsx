import './cpo.scss';
import { Table } from './Table';

export const MainContent = ({ data }) => {
    if (!data || data.length === 0) return <div>Нет данных для отображения</div>;

    return (
        <div className="cpo">
            {data.map((item, index) => (
                <div key={index} className="section-block">
                    {item?.title && (
                        <h3 className='title_h2'>{item.title}</h3>
                    )}
                    {item?.description && (
                        <p
                            className="description-block"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                    )}
                    {item?.objects && Array.isArray(item.objects) && item.objects.length > 0 && (
                        <div className="objects-education">
                            <Table data={item.objects} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
