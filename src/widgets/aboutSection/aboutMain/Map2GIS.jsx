import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Map2GIS = ({ mapLink, zoom = 16 }) => {
    const mapRef = useRef(null);

    const extractCoords = (link) => {
        const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/;
        const match = link?.match(regex);
        return match ? { lat: parseFloat(match[1]), lon: parseFloat(match[2]) } : null;
    };

    const coords = extractCoords(mapLink);

    useEffect(() => {
        if (!coords || !window.DG || !mapRef.current) return;

        const map = window.DG.map(mapRef.current, {
            center: [coords.lat, coords.lon],
            zoom: zoom,
        });

        window.DG.marker([coords.lat, coords.lon]).addTo(map).bindPopup("Мы здесь!");

        return () => map.remove();
    }, [coords, zoom]);


    return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '0' }} />;
};

Map2GIS.propTypes = {
    mapLink: PropTypes.string,
    zoom: PropTypes.number,
};
