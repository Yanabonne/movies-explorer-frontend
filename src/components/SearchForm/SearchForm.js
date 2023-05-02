import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__search">
        <input
          type="search"
          placeholder="Фильм"
          required
          className="search__input"
        />
        <button className="search__button" type="submit"></button>
      </form>
      <div className="search__option">
        <label className="search__switch">
          <input type="checkbox" />
          <span className="search__slider"></span>
        </label>
        <p className="search__text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
