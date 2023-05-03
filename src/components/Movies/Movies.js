import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import apiInintialMovies from "../../utils/apiInintialMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isSavedMoviesOpen }) {
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function onCardClick() {
    setInitialMovies([...initialMovies]);
  }

  function searchFilms(card) {
    return (
      card.nameRU.toLowerCase().includes(searchText.toLowerCase()) &&
      (isShortFilm ? card.duration < 52 : true)
    );
  }

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
      <SearchForm
        setSearchText={setSearchText}
        setIsShortFilm={setIsShortFilm}
        onCardClick={onCardClick}
      />
      <MoviesCardList
        movies={initialMovies}
        isSavedMoviesOpen={isSavedMoviesOpen}
        onCardClick={onCardClick}
        searchFilms={searchFilms}
      />
    </main>
  );
}

export default Movies;
