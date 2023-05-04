import "./BurgerPopup.css";

function BurgerPopup({ children, setIsMenuShown, isMenuShown }) {
  return (
    <div
      className={isMenuShown ? "menu menu_opened" : "menu"}
      onClick={(e) => {
        if (!e.target.classList.contains("menu__list")) {
          setIsMenuShown(false);
        }
      }}
    >
      <div
        className={isMenuShown ? "menu__list" : "menu__list menu__no-display"}
      >
        {children}
      </div>
      <button
        className={isMenuShown ? "menu__cross" : "menu__cross menu__no-display"}
        onClick={() => setIsMenuShown(false)}
      ></button>
    </div>
  );
}

export default BurgerPopup;
