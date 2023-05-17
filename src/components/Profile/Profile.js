import React from "react";
import "./Profile.css";
import "../Register/Register.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  setIsFooterShown,
  setPageOpen,
  handleUserInfoChange,
  exitProfile,
  showErrorPopup
}) {
  const user = React.useContext(CurrentUserContext);
  const [isEditProfile, setIsEditProfile] = React.useState(false);

  const emailRef = React.useRef();
  const [emailInput, setEmailInput] = React.useState(user.email);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [emailInputError, setEmailInputError] = React.useState("");

  const nameRef = React.useRef();
  const [nameInput, setNameInput] = React.useState(user.name);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [nameInputError, setNameInputError] = React.useState("");

  function updateEmail(email) {
    setEmailInput(email);
    validateEmail();
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

  function onSubmitForm(e) {
    e.preventDefault();
    if (nameInput === user.name && emailInput === user.email) {
      showErrorPopup("Необходимо ввести новые данные.")
    } else {
      if (validateEmail() && validateName()) {
        handleUserInfoChange({ name: nameInput, email: emailInput });
        setIsEditProfile(false);
      }
    }
  }

  React.useEffect(() => {
    setIsFooterShown(false);
    setPageOpen("Profile");
    return () => {
      setIsFooterShown(true);
      setPageOpen("");
    };
  }, []);

  return !isEditProfile ? (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
      <div className="profile__container">
        <p className="profile__text profile__text_span">Имя</p>
        <p className="profile__text">{user.name}</p>
      </div>
      <div className="profile__container">
        <p className="profile__text profile__text_span">E-mail</p>
        <p className="profile__text">{user.email}</p>
      </div>
      <p
        className="profile__edit responsive"
        onClick={() => setIsEditProfile(true)}
      >
        Редактировать
      </p>
      <p className="profile__exit responsive" onClick={exitProfile}>
        Выйти из аккаунта
      </p>
    </section>
  ) : (
    <section className="reg">
      <h1 className="reg__title reg__title_edit">Введите новые данные</h1>
      <form className="reg__form reg__form_edit" onSubmit={onSubmitForm}>
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
        <button
          className="reg__button reg__button_login responsive"
          type="submit"
          disabled={isEmailValid && isNameValid ? false : true}
        >
          Сохранить
        </button>
      </form>
      <p className="reg__text">
        <span
          className="reg__span responsive"
          onClick={() => setIsEditProfile(false)}
        >
          Назад
        </span>
      </p>
    </section>
  );
}

export default Profile;
