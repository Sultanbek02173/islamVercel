import "./search.scss";
import { IoSearch, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, fetchSearchResults } from "../../app/redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";

export const Search = ({ onClose }) => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.search.query);
    const navigate = useNavigate();


    const handleInputChange = (event) => {
        const value = event.target.value;
        dispatch(setQuery(value));
        if (value.trim()) {
            dispatch(fetchSearchResults(value));
        }
    };

    const handleSearch = () => {
        if (query.trim()) {
            navigate("/search");
            onClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <>
            <div className="search-overlay" onClick={onClose}></div>
            <div className="search">
                <div>
                    <form className="search-input">
                        <input
                            type="text"
                            name="searchInput"
                            placeholder="Поиск"
                            autoFocus
                            value={query}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button type="button" onClick={handleSearch}><IoSearch /></button>
                    </form>
                    <button className="close" onClick={onClose}><IoClose /></button>
                </div>
            </div>
        </>
    );
};
