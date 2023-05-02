import React from "react";
import "./MoviesCard.css";

function MoviesCard({ card }) {
  const [isLiked, setIsLiked] = React.useState(card.isLiked);

  function onCardClick() {
    if (card.isLiked) {
      card.isLiked = false;
      setIsLiked(false);
    } else {
      card.isLiked = true;
      setIsLiked(true);
    }
  }

  return (
    <article className="card">
      <div className="card__description">
        <p className="card__name">{card.nameRU}</p>
        <p className="card__length">{card.duration} минут</p>
      </div>
      <img
        className="card__picture"
        alt="Постер Фильма"
        src={`https://api.nomoreparties.co${card.image.url}`}
      />
      <button
        className={isLiked ? "card__button card__button_liked" : "card__button"}
        onClick={onCardClick}
      >
        {isLiked ? "" : "Сохранить"}
      </button>
    </article>
  );
}

export default MoviesCard;
