import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <a href="#about" className="navtab__link responsive">
        О проекте
      </a>
      <a href="#techs" className="navtab__link responsive">
        Технологии
      </a>
      <a href="#student" className="navtab__link responsive">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;
