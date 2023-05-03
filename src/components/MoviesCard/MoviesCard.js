import React from "react";
import "./MoviesCard.css";

function MoviesCard({ card, onSavedCardClick, isSavedMoviesOpen }) {
  const [isLiked, setIsLiked] = React.useState(card.isLiked);

  function onCardClick() {
    if (card.isLiked) {
      card.isLiked = false;
      setIsLiked(false);
      isSavedMoviesOpen && onSavedCardClick();
    } else {
      card.isLiked = true;
      setIsLiked(true);
      isSavedMoviesOpen && onSavedCardClick();
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
