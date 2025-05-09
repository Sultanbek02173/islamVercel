import "./parlamentStudents.scss";

export const ParlamentStudents = ({ data, onSelectStudent }) => {

    return (
        <div className='parlamentStudents'>
            {data.map((item) =>
                item.work?.map((workItem) => (
                    <div
                        className="parlamentStudents_block"
                        onClick={() => onSelectStudent?.({ ...workItem, detail: workItem.detail || [] })}
                        style={{ cursor: 'pointer' }}
                        key={workItem.id}
                    >
                        <div className="parlamentStudents_block_imggroup">
                            <img src={workItem.img} alt={workItem.name || "Изображение"} />
                        </div>
                        <div className="parlamentStudents_block_text">
                            <h3>{workItem.name}</h3>
                            <div className="line">
                                <p>{workItem.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
