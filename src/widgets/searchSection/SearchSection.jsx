import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, setQuery } from "../../app/redux/slices/searchSlice";
import "./searchSection.scss";

export const SearchSection = () => {
  const { 0: state, 1: setState } = useState({
    title: ''
  });
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const results = useSelector((state) => state.search.results);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchSearchResults(state.title));
  }

  return (
    <div className="searchSection">
      <h1>Результаты поиска</h1>
      <div className="searchh">
        <form onSubmit={onFormSubmit} className="searchh-input">
          <input
            type="text"
            placeholder="Поиск"
            name="title"
            onChange={handleInputChange}
          />
          <button type="submit"><IoSearch /></button>
        </form>
        <button
          className="close"
          onClick={() => {
            dispatch(setQuery(""));
            dispatch(fetchSearchResults(""));
          }}
        >
          <IoClose />
        </button>
      </div>
      <div className="searchSection_results">
        <p>Всего <span>{results.length}</span></p>
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        ) : (
          query && (
            <div>
              <p>Нет результатов</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
