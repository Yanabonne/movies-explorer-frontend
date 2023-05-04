import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  isSavedMoviesOpen,
  onCardClick,
  searchFilms,
}) {
  const [showedCardsNumber, setShowedCardsNumber] = React.useState(12);
  const cardNumber = isSavedMoviesOpen
    ? movies
        .filter((card) => editSearch(card))
        .filter((card) => card.isLiked === true).length
    : movies.filter((card) => editSearch(card)).length;

  function onButtonClick() {
    setShowedCardsNumber(showedCardsNumber + 12);
  }

  function editSearch(card) {
    return searchFilms(card);
  }

  return (
    <section className="movies">
      <div className="movies__grid">
        {!isSavedMoviesOpen &&
          movies
            .filter((card) => editSearch(card))
            .slice(0, showedCardsNumber)
            .map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isSavedMoviesOpen={isSavedMoviesOpen}
                onSavedCardClick={onCardClick}
              />
            ))}
        {isSavedMoviesOpen &&
          movies
            .filter((card) => card.isLiked === true)
            .filter((card) => editSearch(card))
            .slice(0, showedCardsNumber)
            .map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isSavedMoviesOpen={isSavedMoviesOpen}
                onSavedCardClick={onCardClick}
              />
            ))}
      </div>
      {cardNumber > showedCardsNumber && (
        <button className="movies__more-button" onClick={onButtonClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
