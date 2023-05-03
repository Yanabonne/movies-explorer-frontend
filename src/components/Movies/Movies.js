import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import apiInintialMovies from "../../utils/apiInintialMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isSavedMoviesOpen }) {
  const [initialMovies, setInitialMovies] = React.useState([]);

  React.useEffect(() => {
    apiInintialMovies
      .getInitialMovies()
      .then((movies) => {
        movies.forEach((movie) => {
          movie["isLiked"] = false;
        });
        setInitialMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <SearchForm />
      <MoviesCardList
        movies={initialMovies}
        isSavedMoviesOpen={isSavedMoviesOpen}
      />
    </main>
  );
}

export default Movies;
