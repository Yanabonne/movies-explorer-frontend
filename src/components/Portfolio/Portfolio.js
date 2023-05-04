import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <article className="portfolio__source">
        <p className="portfolio__text">Статичный сайт</p>
        <a
          href="https://github.com/Yanabonne/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          <button className="portfolio__button responsive"></button>
        </a>
      </article>
      <article className="portfolio__source">
        <p className="portfolio__text">Адаптивный сайт</p>
        <a
          href="https://github.com/Yanabonne/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          <button className="portfolio__button responsive"></button>
        </a>
      </article>
      <article className="portfolio__source">
        <p className="portfolio__text">Одностраничное приложение</p>
        <a
          href="https://github.com/Yanabonne/react-mesto-api-full-gha"
          target="_blank"
          rel="noreferrer"
        >
          <button className="portfolio__button responsive"></button>
        </a>
      </article>
    </section>
  );
}

export default Portfolio;
