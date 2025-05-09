import "./galleryBanner.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGalleryPhotos } from "../../../app/redux/slices/gellarySlice";

export const GalleryBanner = () => {
    const dispatch = useDispatch();
    const { photos: galleryData, status, error } = useSelector((state) => state.gallery);

    useEffect(() => {
        dispatch(fetchGalleryPhotos());
    }, [dispatch,]);


    const bannerItem = galleryData.find(item => item.title);

    return (
        <div className="gallery_banner_container">
            <div className="gallery_banner">
                <div className="gallery_banner_line"></div>
                <h2 className="banner-text">{bannerItem ? bannerItem.title : ""}</h2>
                <div className="gallery_banner_lineTwo"></div>
            </div>
        </div>
    );
};
