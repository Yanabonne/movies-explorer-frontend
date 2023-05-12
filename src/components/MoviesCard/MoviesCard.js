import React from "react";
import "./MoviesCard.css";

function MoviesCard({ card, isSavedMoviesOpen, deleteMovie, addMovie }) {
  function onCardClick() {
    if (card.isLiked) {
      deleteMovie(card);
    } else {
      addMovie(card);
    }
  }

  return (
    <article className="card">
      <div className="card__description">
        <p className="card__name">{card.nameRU}</p>
        <p className="card__length">{card.duration} минут</p>
      </div>
      <a
        className="card__trailer responsive"
        href={isSavedMoviesOpen ? card.trailer : card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__picture"
          alt="Постер Фильма"
          src={
            isSavedMoviesOpen
              ? card.image
              : `https://api.nomoreparties.co${card.image.url}`
          }
        />
      </a>
      <button
        className={
          !isSavedMoviesOpen
            ? card.isLiked
              ? "card__button responsive card__button_liked"
              : "card__button responsive"
            : "card__button responsive card__button_delete"
        }
        onClick={onCardClick}
      >
        {!isSavedMoviesOpen ? (card.isLiked ? "" : "Сохранить") : ""}
      </button>
    </article>
  );
}

export default MoviesCard;
