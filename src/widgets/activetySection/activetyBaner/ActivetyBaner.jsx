import "./activetyBaner.scss";

export const ActivetyBaner = ({ banner }) => {

    
    return (
        <div className='activetyBaner'>
            <h1>{banner.title}</h1>
            <div>
                <p  dangerouslySetInnerHTML={{ __html: banner?.description || '' }}></p>
            </div>
        </div>
    );
};
