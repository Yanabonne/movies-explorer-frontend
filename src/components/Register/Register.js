import React from "react";
import "./Register.css";
import star from "../../images/star.svg";

function Register({ setIsFooterShown, setIsHeaderShown }) {
  React.useEffect(() => {
    setIsFooterShown(false);
    setIsHeaderShown(false);
    return () => {
      setIsFooterShown(true);
      setIsHeaderShown(true);
    };
  }, []);

  return (
    <section className="reg">
      <img className="reg__star" alt="Зелёная звёздочка" src={star} />
      <h1 className="reg__title">Добро пожаловать!</h1>
      <form className="reg__form">
        <h2 className="reg__form-title">Имя</h2>
        <input
          type="text"
          className="reg__form-input"
          name="name"
          placeholder="Введите своё имя"
          required
        />
        <span className="reg__input-error"></span>
        <h2 className="reg__form-title">E-mail</h2>
        <input
          type="email"
          className="reg__form-input"
          name="email"
          placeholder="Введите свою почту"
          required
        />
        <span className="reg__input-error"></span>
        <h2 className="reg__form-title">Пароль</h2>
        <input
          type="password"
          className="reg__form-input"
          name="password"
          placeholder="Введите пароль"
          required
        />
        <span className="reg__input-error"></span>
        <button className="reg__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="reg__text">
        Уже зарегистрированы? <span className="reg__span">Войти</span>
      </p>
    </section>
  );
}

export default Register;
