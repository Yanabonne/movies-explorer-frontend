import "./Header.css";
import star from "../../images/star.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__star" src={star} alt="Star logo" />
      <div className="header__buttons">
        <p className="header__button header__button_signup">Регистрация</p>
        <button className="header__button header__button_signin">Войти</button>
      </div>
    </header>
  );
}

export default Header;
