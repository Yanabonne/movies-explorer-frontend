import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  const cardNumber = movies.length;
  const [showedCards, setShowedCards] = React.useState(12);

  function onButtonClick() {
    setShowedCards(showedCards + 12);
  }

  return (
    <section className="movies">
      <div className="movies__grid">
        {movies.slice(0, showedCards).map((card) => (
          <MoviesCard card={card} key={card.id} />
        ))}
      </div>
      {cardNumber > showedCards && (
        <button className="movies__more-button" onClick={onButtonClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
