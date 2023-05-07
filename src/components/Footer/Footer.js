import "./Footer.css";

function Footer({ isFooterShown }) {
  return (
    isFooterShown && (
      <footer className="footer">
        <p className="footer__info">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <p className="footer__text">&copy; 2020</p>
          <div className="footer__links">
            <a
              className="footer__text footer__link responsive"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              className="footer__text footer__link responsive"
              href="https://github.com/Yanabonne"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
