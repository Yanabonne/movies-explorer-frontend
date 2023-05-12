import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Loader from "../Loader/Loader";

function MoviesCardList({
  movies,
  isSavedMoviesOpen,
  searchFilms,
  deleteMovie,
  addMovie,
  isSearched,
}) {
  const [showedCardsNumber, setShowedCardsNumber] = React.useState(12);
  const gridRef = React.useRef();
  const cardNumber = movies.filter((card) => editSearch(card)).length;

  function onButtonClick() {
    setShowedCardsNumber(showedCardsNumber + 12);
  }

  function editSearch(card) {
    return searchFilms(card);
  }

  return (
    <section className="movies">
      {!isSearched ? (
        <Loader />
      ) : (
        <>
          <div className="movies__grid" ref={gridRef}>
            {!isSavedMoviesOpen &&
              movies
                .filter((card) => editSearch(card))
                .slice(0, showedCardsNumber)
                .map((card) => (
                  <MoviesCard
                    card={card}
                    key={card.id}
                    isSavedMoviesOpen={isSavedMoviesOpen}
                    deleteMovie={deleteMovie}
                    addMovie={addMovie}
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
                    key={card.movieId}
                    isSavedMoviesOpen={isSavedMoviesOpen}
                    deleteMovie={deleteMovie}
                    addMovie={addMovie}
                  />
                ))}
          </div>
          {cardNumber > showedCardsNumber && (
            <button
              className="movies__more-button responsive"
              onClick={onButtonClick}
            >
              Ещё
            </button>
          )}
          {cardNumber === 0 && (
            <h2 className="movies__no-results">Ничего не найдено</h2>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
