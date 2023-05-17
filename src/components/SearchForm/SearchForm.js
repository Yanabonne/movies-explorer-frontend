import React from "react";
import "./SearchForm.css";

function SearchForm({
  setSearchText,
  setIsShortFilm,
  onCardClick,
  showErrorPopup,
  getFilms,
  isSavedMoviesOpen
}) {
  const [searchInput, setSearchInput] = React.useState("");
  const shortFilmsRef = React.useRef();

  function editSearch(evt) {
    evt.preventDefault();
    if (!searchInput) {
      showErrorPopup("Ошибка: Нужно ввести ключевое слово.");
    } else {
      setSearchText(searchInput);
      getFilms();
      !isSavedMoviesOpen && localStorage.setItem("searchText", searchInput);
    }
  }

  function editShortFilmsSearch() {
    setIsShortFilm(shortFilmsRef.current.checked);
    onCardClick();
    !isSavedMoviesOpen && localStorage.setItem("isShortFilm", shortFilmsRef.current.checked);
  }

  function updateSearchInput(si) {
    setSearchInput(si);
  }

  React.useEffect(() => {
    if (!isSavedMoviesOpen && localStorage.getItem("searchText")) {
      shortFilmsRef.current.checked =
        localStorage.getItem("isShortFilm") === "true";
      setSearchInput(localStorage.getItem("searchText"));
    } else {
      shortFilmsRef.current.checked = false;
      setSearchInput("");
    }
  }, [isSavedMoviesOpen]);

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
          className="search__button responsive"
          onClick={editSearch}
          type="submit"
        ></button>
      </form>
      <div className="search__option">
        <label
          className="search__switch responsive"
          onClick={editShortFilmsSearch}
        >
          <input type="checkbox" ref={shortFilmsRef} />
          <span className="search__slider"></span>
        </label>
        <p className="search__text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
