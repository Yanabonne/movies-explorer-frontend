import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import apiInintialMovies from "../../utils/apiInintialMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isSavedMoviesOpen, onOpen, setPageOpen, showErrorPopup }) {
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function onCardClick() {
    setInitialMovies([...initialMovies]);
  }

  function searchFilms(card) {
    if (searchText) {
      return (
        card.nameRU.toLowerCase().includes(searchText.toLowerCase()) &&
        (isShortFilm ? card.duration < 40 : true)
      );
    } else {
      return isShortFilm ? card.duration < 40 : true;
    }
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
    onOpen();
    setPageOpen("Movies");
  }, []);

  return (
    <main>
      <SearchForm
        setSearchText={setSearchText}
        setIsShortFilm={setIsShortFilm}
        onCardClick={onCardClick}
        showErrorPopup={showErrorPopup}
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
