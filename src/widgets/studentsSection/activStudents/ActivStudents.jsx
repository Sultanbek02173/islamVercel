import "./activStudents.scss";

export const ActivStudents = ({ data }) => {

    return (
        <div className='activStudents'>
            <div className="parlamentStudents_block">
                {data.img && (
                    <div className="parlamentStudents_block_imggroup">
                        <img src={data.img} alt={data.name} />
                    </div>
                )}
                <div className="parlamentStudents_block_text">
                    <h3>{data.name}</h3>
                    <div className="line">
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
            {data.detail?.length > 0 && (
                <div className="students_works">
                    {data.detail.map((work, index) => (
                        <div className="activStudents_block" key={index}>
                            <h3>{work.name}</h3>
                            <div className={`content ${work.img ? 'with-image' : ''}`}>
                                <p dangerouslySetInnerHTML={{ __html: data.detail[0].detail }}></p>
                                {work.img && (
                                    <div className="activStudents_block_img">
                                        <img src={work.img} alt={work.name} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
