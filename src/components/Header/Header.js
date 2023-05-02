import "./Header.css";
import star from "../../images/star.svg";

function Header({ isLoggedIn }) {
  return (
    <header className={isLoggedIn ? "header header__logged-in" : "header"}>
      <img className="header__star" src={star} alt="Star logo" />
      {isLoggedIn && (
        <nav className="header__nav">
          <p className="header__option header__option_active">Фильмы</p>
          <p className="header__option">Сохранённые фильмы</p>
        </nav>
      )}
      {isLoggedIn && (
        <button className="header__account-button">
          <div className="header__account-logo"></div>
          Аккаунт
        </button>
      )}
      {!isLoggedIn && (
        <div className="header__buttons">
          <p className="header__button header__button_signup">Регистрация</p>
          <button className="header__button header__button_signin">
            Войти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
