import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import star from "../../images/star.svg";
import BurgerPopup from "../BurgerPopup/BurgerPopup";

function Header({
  isLoggedIn,
  isSavedMoviesOpen,
  setIsSavedMoviesOpen,
  isHeaderShown,
  pageOpen,
}) {
  const navigate = useNavigate();

  const [isMenuShown, setIsMenuShown] = React.useState(false);

  return (
    isHeaderShown && (
      <header className={isLoggedIn ? "header header__logged-in" : "header"}>
        <img
          className="header__star"
          src={star}
          alt="Star logo"
          onClick={() => navigate("/")}
        />
        {isLoggedIn && (
          <>
            <button
              className="header__burger"
              onClick={() => setIsMenuShown(true)}
            />
            <nav className="header__nav header__no-display">
              <p
                className={
                  isSavedMoviesOpen
                    ? "header__option"
                    : "header__option header__option_active"
                }
                onClick={() => {
                  setIsSavedMoviesOpen(false);
                  navigate("/movies");
                }}
              >
                Фильмы
              </p>
              <p
                className={
                  isSavedMoviesOpen
                    ? "header__option header__option_active"
                    : "header__option"
                }
                onClick={() => {
                  setIsSavedMoviesOpen(true);
                  navigate("/saved-movies");
                }}
              >
                Сохранённые фильмы
              </p>
            </nav>
            <button
              className="header__account-button header__no-display"
              onClick={() => navigate("/profile")}
            >
              <div className="header__account-logo"></div>
              Аккаунт
            </button>
          </>
        )}
        {!isLoggedIn && (
          <div className="header__buttons">
            <p
              className="header__button header__button_signup"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Регистрация
            </p>
            <button
              className="header__button header__button_signin"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Войти
            </button>
          </div>
        )}
        {isMenuShown && (
          <BurgerPopup setIsMenuShown={setIsMenuShown}>
            <>
              <nav className="header__nav">
                <p
                  className={
                    pageOpen !== "Main"
                      ? "header__option"
                      : "header__option header__option_active"
                  }
                  onClick={() => {
                    navigate("/");
                    setIsMenuShown(false);
                  }}
                >
                  Главная
                </p>
                <p
                  className={
                    !isSavedMoviesOpen && pageOpen === "Movies"
                      ? "header__option header__option_active"
                      : "header__option"
                  }
                  onClick={() => {
                    setIsSavedMoviesOpen(false);
                    setIsMenuShown(false);
                    navigate("/movies");
                  }}
                >
                  Фильмы
                </p>
                <p
                  className={
                    isSavedMoviesOpen && pageOpen === "Movies"
                      ? "header__option header__option_active"
                      : "header__option"
                  }
                  onClick={() => {
                    setIsSavedMoviesOpen(true);
                    setIsMenuShown(false);
                    navigate("/saved-movies");
                  }}
                >
                  Сохранённые фильмы
                </p>
              </nav>
              <button
                className="header__account-button"
                onClick={() => {
                  setIsMenuShown(false);
                  navigate("/profile");
                }}
              >
                <div className="header__account-logo"></div>
                Аккаунт
              </button>
            </>
          </BurgerPopup>
        )}
      </header>
    )
  );
}

export default Header;
