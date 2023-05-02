import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  React.useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <section className="movies">
      {movies.map((card) => (
        <MoviesCard card={card} key={card.id} />
      ))}
    </section>
  );
}

export default MoviesCardList;
