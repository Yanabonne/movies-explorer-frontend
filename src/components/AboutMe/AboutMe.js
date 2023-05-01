import "./AboutMe.css";
import me from "../../images/me.jpg";

function AboutMe() {
  return (
    <section className="me" id="student">
      <h2 className="me__title">Студент</h2>
      <div className="me__container">
        <div className="me__description">
          <h3 className="me__author">Яна</h3>
          <p className="me__about">Фронтенд-разработчица, 21 год</p>
          <p className="me__text">
            Я заканчиваю четвёртый курс НИУ ВШЭ в Санкт-Петербурге по
            специальности Международный бизнес и менеджмент. Решила перейти в
            Frontend разработку после стажировки в SAP: я работала
            IT-консультантом и занималась в том числе настройкой интерфейсов и
            логики сайта для клиентов. Это очень увлекло меня и после стажировки
            я решила стать разработчиком. Хочу развиваться в разработке удобных
            и user-friendly интерфейсов, люблю сложные задачи и структурный
            подход.
          </p>
          <a href="https://github.com/Yanabonne" className="me__link">
            Github
          </a>
        </div>
        <img src={me} className="me__picture" alt="Фотография автора сайта" />
      </div>
    </section>
  );
}

export default AboutMe;
