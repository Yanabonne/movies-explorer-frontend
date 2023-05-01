import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <a href="#about" class="navtab__link">
        О проекте
      </a>
      <a href="#techs" class="navtab__link">
        Технологии
      </a>
      <a href="#student" class="navtab__link">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;
