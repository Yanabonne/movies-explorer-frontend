import React from "react";
import "../Register/Register.css";
import star from "../../images/star.svg";
import { useNavigate } from "react-router-dom";

function Login({ setIsFooterShown, setIsHeaderShown, handleSubmit }) {
  const navigate = useNavigate();

  const emailRef = React.useRef();
  const [emailInput, setEmailInput] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [emailInputError, setEmailInputError] = React.useState("");

  const passwordRef = React.useRef();
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordInputError, setPasswordInputError] = React.useState("");

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
    validatePassword(pw);
  }

  function validatePassword(pw) {
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

  function onSubmitForm(e) {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      handleSubmit(passwordInput, emailInput);
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
        className="reg__star responsive"
        alt="Зелёная звёздочка"
        src={star}
        onClick={() => navigate("/")}
      />
      <h1 className="reg__title">Рады видеть!</h1>
      <form className="reg__form" onSubmit={onSubmitForm}>
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
        <button
          className="reg__button reg__button_login responsive"
          type="submit"
          disabled={isEmailValid && isPasswordValid ? false : true}
        >
          Войти
        </button>
      </form>
      <p className="reg__text">
        Ещё не зарегистрированы?{" "}
        <span
          className="reg__span responsive"
          onClick={() => navigate("/signup")}
        >
          Регистрация
        </span>
      </p>
    </section>
  );
}

export default Login;
