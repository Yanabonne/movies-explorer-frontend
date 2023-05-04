import "./ErrorPopup.css";

function ErrorPopup({ isErrorPopupShown, errorPopupText }) {
  return (
    isErrorPopupShown && (
      <div className="error">
        <p className="error__text">
          <span className="error__span">Ошибка: </span>
          {errorPopupText}
        </p>
      </div>
    )
  );
}

export default ErrorPopup;
