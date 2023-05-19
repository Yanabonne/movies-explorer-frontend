import "./ErrorPopup.css";

function ErrorPopup({
  isErrorPopupShown,
  errorPopupText,
  setIsErrorPopupShown,
}) {
  return (
    isErrorPopupShown && (
      <div className="error">
        <button
          className="error__button responsive"
          onClick={() => {
            setIsErrorPopupShown(false);
          }}
        ></button>
        <p className="error__text">
          <span className="error__span">
            {errorPopupText.startsWith("Ошибка: ") ? "Ошибка: " : ""}
          </span>
          {errorPopupText.startsWith("Ошибка: ")
            ? errorPopupText.slice(8)
            : errorPopupText}
        </p>
      </div>
    )
  );
}

export default ErrorPopup;
