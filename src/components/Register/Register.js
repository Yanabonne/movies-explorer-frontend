import React from "react";
import "./Register.css";
import star from "../../images/star.svg";
import { useNavigate } from "react-router-dom";

function Register({ setIsFooterShown, setIsHeaderShown }) {
  const navigate = useNavigate();

  const emailRef = React.useRef();
  const [emailInput, setEmailInput] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [emailInputError, setEmailInputError] = React.useState("");

  const passwordRef = React.useRef();
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [passwordInputError, setPasswordInputError] = React.useState("");

  const nameRef = React.useRef();
  const [nameInput, setNameInput] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [nameInputError, setNameInputError] = React.useState("");

  function updateEmail(email) {
    setEmailInput(email);
    validateEmail();
  }

  function validateEmail() {
    let isInputValid = true;
    let errorText = "";

    if (!emailRef.current.validity.valid) {
      errorText = emailRef.current.validationMessage;
      isInputValid = false;
    }

    setIsEmailValid(isInputValid);
    setEmailInputError(errorText);

    return isInputValid;
  }

  function updatePassword(pw) {
    setPasswordInput(pw);
    validatePassword();
  }

  function validatePassword() {
    let isInputValid = true;
    let errorText = "";

    if (!passwordRef.current.validity.valid) {
      errorText = passwordRef.current.validationMessage;
      isInputValid = false;
    }

    setIsPasswordValid(isInputValid);
    setPasswordInputError(errorText);

    return isInputValid;
  }

  function updateName(nm) {
    setNameInput(nm);
    validateName();
  }

  function validateName() {
    let isInputValid = true;
    let errorText = "";

    if (!nameRef.current.validity.valid) {
      errorText = nameRef.current.validationMessage;
      isInputValid = false;
    }

    setIsNameValid(isInputValid);
    setNameInputError(errorText);

    return isInputValid;
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (validateEmail() && validatePassword() && validateName()) {
      navigate("/signin");
    }
  }

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
      <img
        className="reg__star"
        alt="Зелёная звёздочка"
        src={star}
        onClick={() => navigate("/")}
      />
      <h1 className="reg__title">Добро пожаловать!</h1>
      <form className="reg__form" onSubmit={onSubmitForm}>
        <h2 className="reg__form-title">Имя</h2>
        <input
          type="text"
          className={
            isNameValid
              ? "reg__form-input"
              : "reg__form-input reg__form-input_error"
          }
          name="name"
          placeholder="Введите своё имя"
          required
          maxLength={30}
          ref={nameRef}
          value={nameInput}
          onChange={(e) => {
            updateName(e.target.value);
          }}
        />
        <span className="reg__input-error">{nameInputError}</span>
        <h2 className="reg__form-title">E-mail</h2>
        <input
          type="email"
          className={
            isEmailValid
              ? "reg__form-input"
              : "reg__form-input reg__form-input_error"
          }
          name="email"
          placeholder="Введите свою почту"
          required
          ref={emailRef}
          value={emailInput}
          onChange={(e) => {
            updateEmail(e.target.value);
          }}
        />
        <span className="reg__input-error">{emailInputError}</span>
        <h2 className="reg__form-title">Пароль</h2>
        <input
          type="password"
          className={
            isPasswordValid
              ? "reg__form-input"
              : "reg__form-input reg__form-input_error"
          }
          name="password"
          placeholder="Введите пароль"
          required
          ref={passwordRef}
          value={passwordInput}
          minLength={8}
          onChange={(e) => updatePassword(e.target.value)}
        />
        <span className="reg__input-error">{passwordInputError}</span>
        <button className="reg__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="reg__text">
        Уже зарегистрированы?{" "}
        <span className="reg__span" onClick={() => navigate("/signin")}>
          Войти
        </span>
      </p>
    </section>
  );
}

export default Register;
