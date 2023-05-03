import React from "react";
import "./Profile.css";

function Profile({ user, setIsFooterShown }) {
  React.useEffect(() => {
    setIsFooterShown(false);
    return () => {
      setIsFooterShown(true);
    };
  }, []);
  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
      <div className="profile__container">
        <p className="profile__text profile__text_span">Имя</p>
        <p className="profile__text">{user.name}</p>
      </div>
      <div className="profile__container">
        <p className="profile__text profile__text_span">E-mail</p>
        <p className="profile__text">{user.email}</p>
      </div>
      <p className="profile__edit">Редактировать</p>
      <p className="profile__exit">Выйти из аккаунта</p>
    </section>
  );
}

export default Profile;
