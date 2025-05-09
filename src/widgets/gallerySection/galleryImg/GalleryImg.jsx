import "./gallery.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGalleryPhotos } from "../../../app/redux/slices/gellarySlice";

export const GalleryImg = () => {
    const dispatch = useDispatch();
    const { photos: galleryData, status, error } = useSelector((state) => state.gallery);

    const [filteredData, setFilteredData] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

    useEffect(() => {
        dispatch(fetchGalleryPhotos());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1200);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const filterGallery = () => {
            let filtered = galleryData;
            if (selectedDay) {
                filtered = filtered.filter(item => item.date.split(".")[0] === selectedDay);
            }
            if (selectedMonth) {
                filtered = filtered.filter(item => item.date.split(".")[1] === selectedMonth);
            }
            if (selectedYear) {
                filtered = filtered.filter(item => item.date.split(".")[2] === selectedYear);
            }
            setFilteredData(filtered);
        };

        filterGallery();
    }, [selectedDay, selectedMonth, selectedYear, galleryData]);

    const imageSizes = [
        { width: 287, height: 220 },
        { width: 665, height: 430 },
        { width: 433, height: 510 },
        { width: 287, height: 220, offset: true },
        { width: 287, height: 220, offset: true },
        { width: 287, height: 220 },
        { width: 287, height: 220 },
        { width: 287, height: 220 },
        { width: 287, height: 220 },
        { width: 665, height: 430 },
        { width: 337, height: 250 },
        { width: 287, height: 220, offset: true },
        { width: 287, height: 220, offset: true },
        { width: 413, height: 510 },
        { width: 287, height: 220 },
        { width: 287, height: 220 },
        { width: 287, height: 220 },
        { width: 287, height: 220 },
    ];

    const isThreeImages = galleryData.length === 3;

    return (
        <div className="gallery container">
            <div className={`gallery ${isThreeImages ? "gallery--three-images" : ""}`}></div>

            <div className="gallery_select container">
                <div>
                    <select onChange={(e) => setSelectedDay(e.target.value)}>
                        <option value="">День</option>
                        {[...new Set(galleryData.map(item => item.date.split(".")[0]))].map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>

                    <select onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="">Месяц</option>
                        {[...new Set(galleryData.map(item => item.date.split(".")[1]))].map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>

                    <select onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="">Год</option>
                        {[...new Set(galleryData.map(item => item.date.split(".")[2]))].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="gallery_group">
                {filteredData.map((item, index) => (
                    <div
                        className={`gallery_card
                            ${index % 2 === 0 ? "gallery_card--large" : "gallery_card--small"}
                            ${(index === 5 || index === 6 || index === 7 || index === 8) ? "gallery_card--one" : ""}
                            ${(index === 3 || index === 4 || index === 11 || index === 12) ? "gallery_card--two" : ""}
                            ${index === 10 ? "gallery_card--tri" : ""}`
                        }
                        key={item.id}
                        style={{
                            width: imageSizes[index]?.width || "auto",
                            height: imageSizes[index]?.height || "auto",
                            marginTop: imageSizes[index]?.offset && !isSmallScreen ? "330px" : "",
                        }}
                    >
                        <img className="gallery_img" src={item.photo} alt="gallery" />
                        <p className="gallery_data">{item.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};