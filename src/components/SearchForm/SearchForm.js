import React from "react";
import "./SearchForm.css";

function SearchForm({ setSearchText, setIsShortFilm, onCardClick }) {
  const [searchInput, setSearchInput] = React.useState();
  const shortFilmsRef = React.useRef();

  function editSearch(evt) {
    evt.preventDefault();
    setIsShortFilm(shortFilmsRef.current.checked);
    setSearchText(searchInput);
    onCardClick();
  }

  function updateSearchInput(si) {
    setSearchInput(si);
  }

  return (
    <section className="search">
      <form className="search__search">
        <input
          type="search"
          placeholder="Фильм"
          required
          className="search__input"
          value={searchInput || ""}
          onChange={(e) => updateSearchInput(e.target.value)}
        />
        <button
          className="search__button"
          onClick={editSearch}
          type="submit"
        ></button>
      </form>
      <div className="search__option">
        <label className="search__switch">
          <input type="checkbox" ref={shortFilmsRef} />
          <span className="search__slider"></span>
        </label>
        <p className="search__text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
