import { BiSolidPhoneCall } from "react-icons/bi";
import { LuInstagram } from "react-icons/lu";
import { FaTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../styles/topHeader.scss"
import { useSelector, useDispatch } from 'react-redux';
import { fetchBannerData } from '../../../app/redux/slices/homeSlice';
const islamicMonths = {
    "Muharram": "Мухаррам",
    "Safar": "Сафар",
    "Rabi' al-awwal": "Раби-уль-Авваль",
    "Rabi' al-thani": "Раби-уль-Ахир",
    "Jumada al-awwal": "Джумад-уль-Уля",
    "Jumada al-thani": "Джумад-ас-Сани",
    "Rajab": "Раджаб",
    "Sha'aban": "Шаабан",
    "Ramadan": "Рамадан",
    "Shawwal": "Шавваль",
    "Dhu al-Qi'dah": "Зуль-Каада",
    "Dhu al-Hijjah": "Зуль-Хиджа"
};

export const TopHeader = () => {
    const [dates, setDates] = useState({
        gregorian: {
            day: '',
            month: '',
            year: ''
        },
        hijri: {
            day: '',
            month: '',
            year: ''
        }
    });

    useEffect(() => {
        const today = new Date();

        const gregorianDate = {
            day: today.getDate(),
            month: today.toLocaleString('ru-RU', { month: 'long' }),
            year: today.getFullYear()
        };

        const hijriFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const hijriParts = hijriFormatter.formatToParts(today);
        const hijriDate = {
            day: hijriParts.find(part => part.type === 'day')?.value || '',
            month: islamicMonths[hijriParts.find(part => part.type === 'month')?.value || ''] || '',
            year: hijriParts.find(part => part.type === 'year')?.value || ''
        };

        setDates({ gregorian: gregorianDate, hijri: hijriDate });
    }, []);
    const dispatch = useDispatch();
    const { banner } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchBannerData());
    }, [dispatch]);

    return (
        <div className="header_top">
            <div className="container">
                <div>
                    <BiSolidPhoneCall className="header_top_icon" />
                    <a href={`tel:${banner?.[0]?.phone_header || ''}`}>{banner?.[0]?.phone_header}</a>
                </div>
                <div>
                    <p>
                        {banner?.[0]?.date_headers
                            ? banner[0].date_headers
                            : `${dates.gregorian.day} ${dates.gregorian.month} ${dates.gregorian.year}г.`}
                    </p>
                </div>
                <div>
                    <p>
                        {banner?.[0]?.date_muslim
                            ? banner[0].date_muslim
                            : `${dates.hijri.day} ${dates.hijri.month} ${dates.hijri.year}`}
                    </p>
                </div>
                <div>
                    <a href={banner?.[0]?.insta_url || '#'} target="_blank" rel="noopener noreferrer">
                        <LuInstagram className="header_top_icon" />
                    </a>
                    <a href={banner?.[0]?.face_book || '#'} target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="header_top_icon" />
                    </a>
                </div>
            </div>
        </div>
    );
};
