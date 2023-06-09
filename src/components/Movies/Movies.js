import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import apiInintialMovies from "../../utils/MoviesApi";
import api from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isSavedMoviesOpen, onOpen, setPageOpen, showErrorPopup, initialMovies, setInitialMovies, savedMovies, setSavedMovies }) {
  const [searchText, setSearchText] = React.useState("");
  const [isSearched, setIsSearched] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function onCardClick() {
    setInitialMovies([...initialMovies]);
    setSavedMovies([...savedMovies]);
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

  function deleteMovie(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        card.isLiked = false;
        onCardClick();
      })
      .catch((err) => showErrorPopup(err));
  }

  function addMovie(card) {
    api
      .addMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailer: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
      })
      .then((res) => {
        card._id = res.data._id;
        card.isLiked = true;
        onCardClick();
      })
      .catch((err) => showErrorPopup(err));
  }

  function getFilms() {
    setIsSearched(false);
    api
      .getInitialMovies()
      .then((res) => {
        const movies = res.data;
        movies.forEach((movie) => {
          movie["isLiked"] = true;
        });
        setSavedMovies(movies);

        if (localStorage.getItem("movies")) {
          const localMovies = JSON.parse(localStorage.getItem("movies"));
          localMovies.forEach((movie) => {
            movie["isLiked"] = false;
            for (let i = 0; i < movies.length; i++) {
              if (movies[i].movieId === movie.id) {
                movie["isLiked"] = true;
                movie._id = movies[i]._id;
                break;
              }
            }
          });
          setInitialMovies(localMovies);
          localStorage.setItem("movies", JSON.stringify(localMovies));
        } else {
          apiInintialMovies
            .getInitialMovies()
            .then((films) => {
              films.forEach((movie) => {
                movie["isLiked"] = false;
                for (let i = 0; i < movies.length; i++) {
                  if (movies[i].movieId === movie.id) {
                    movie["isLiked"] = true;
                    break;
                  }
                }
              });
              localStorage.setItem("movies", JSON.stringify(films));
              setInitialMovies(films);
            })
            .catch((err) => {
              console.log(err);
              showErrorPopup(
                "Ошибка: Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
              );
            });
        }
      })
      .catch((err) => {
        console.log(err);
        showErrorPopup(
          "Ошибка: Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      })
      .finally(() => setIsSearched(true));
  }

  React.useEffect(() => {
    if (isSavedMoviesOpen) {
      getFilms();
      setIsShortFilm(false);
      setSearchText("");
    } else {
      if (localStorage.getItem("searchText")) {
        setIsShortFilm(localStorage.getItem("isShortFilm") === "true");
        setSearchText(localStorage.getItem("searchText"));
        getFilms();
      }
    }
    onOpen();
    setPageOpen("Movies");

    return () => {
      if (isSavedMoviesOpen) {
        setIsSearched(false);
      }
    }
  }, [isSavedMoviesOpen]);

  return (
    <main>
      <SearchForm
        setSearchText={setSearchText}
        setIsShortFilm={setIsShortFilm}
        onCardClick={onCardClick}
        showErrorPopup={showErrorPopup}
        getFilms={getFilms}
        isSavedMoviesOpen={isSavedMoviesOpen}
      />
      <MoviesCardList
        movies={isSavedMoviesOpen ? savedMovies : initialMovies}
        isSavedMoviesOpen={isSavedMoviesOpen}
        onCardClick={onCardClick}
        searchFilms={searchFilms}
        deleteMovie={deleteMovie}
        addMovie={addMovie}
        isSearched={isSearched}
      />
    </main>
  );
}

export default Movies;
