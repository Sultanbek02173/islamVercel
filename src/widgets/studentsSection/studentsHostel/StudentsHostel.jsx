import "./studentsHostel.scss";
import { StudentsCarousel } from "../studentsCarousel/StudentsCarousel";

export const StudentsHostel = ({ data }) => {

    
    return (
        <div className="studentsHostel">
            {data.map((item) => (
                <div className="conditions" key={item.id || item.name}>
                    <div className="content">
                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                        
                        {item.image?.length > 0 && (
                            <StudentsCarousel
                                items={item.image.map((img) => img.url)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
