import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__container">
        <div className="about__description">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__description">
          <h3 className="about__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__timeline">
        <div className="about__period about__period_one">
          <p className="about__one-week">1 неделя</p>
          <p className="about__caption">Back-end</p>
        </div>
        <div className="about__period about__period_four">
          <p className="about__four-week">4 недели</p>
          <p className="about__caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
