import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, isSavedMoviesOpen }) {
  const [showedMovies, setShowedMovies] = React.useState(movies);
  const [showedCardsNumber, setShowedCardsNumber] = React.useState(12);
  const cardNumber = isSavedMoviesOpen
    ? movies.filter((card) => card.isLiked === true).length
    : movies.length;

  function onButtonClick() {
    setShowedCardsNumber(showedCardsNumber + 12);
  }

  function onSavedCardClick() {
    setShowedMovies([...showedMovies]);
  }

  React.useEffect(() => {
    if (isSavedMoviesOpen) {
      setShowedMovies(movies.filter((card) => card.isLiked === true));
    }
  }, []);

  return (
    <section className="movies">
      <div className="movies__grid">
        {!isSavedMoviesOpen &&
          movies
            .slice(0, showedCardsNumber)
            .map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isSavedMoviesOpen={isSavedMoviesOpen}
                onSavedCardClick={onSavedCardClick}
              />
            ))}
        {isSavedMoviesOpen &&
          movies
            .filter((card) => card.isLiked === true)
            .slice(0, showedCardsNumber)
            .map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isSavedMoviesOpen={isSavedMoviesOpen}
                onSavedCardClick={onSavedCardClick}
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
