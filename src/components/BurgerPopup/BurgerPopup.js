import "./BurgerPopup.css";

function BurgerPopup({ children, setIsMenuShown }) {
  return (
    <div className="menu">
      <div className="menu__list">{children}</div>
      <button
        className="menu__cross"
        onClick={() => setIsMenuShown(false)}
      ></button>
    </div>
  );
}

export default BurgerPopup;
