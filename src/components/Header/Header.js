import React from "react";
import "./Header.css";
import star from "../../images/star.svg";

function Header({ isLoggedIn, isSavedMoviesOpen, setIsSavedMoviesOpen }) {
  return (
    <header className={isLoggedIn ? "header header__logged-in" : "header"}>
      <img className="header__star" src={star} alt="Star logo" />
      {isLoggedIn && (
        <nav className="header__nav">
          <p
            className={
              isSavedMoviesOpen
                ? "header__option"
                : "header__option header__option_active"
            }
            onClick={() => setIsSavedMoviesOpen(false)}
          >
            Фильмы
          </p>
          <p
            className={
              isSavedMoviesOpen
                ? "header__option header__option_active"
                : "header__option"
            }
            onClick={() => setIsSavedMoviesOpen(true)}
          >
            Сохранённые фильмы
          </p>
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
