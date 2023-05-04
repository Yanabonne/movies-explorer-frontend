import "./BurgerPopup.css";

function BurgerPopup({ children, setIsMenuShown }) {
  return (
    <div
      className="menu"
      onClick={(e) => {
        if (!e.target.classList.contains("menu__list")) {
          setIsMenuShown(false);
        }
      }}
    >
      <div className="menu__list">{children}</div>
      <button
        className="menu__cross"
        onClick={() => setIsMenuShown(false)}
      ></button>
    </div>
  );
}

export default BurgerPopup;
