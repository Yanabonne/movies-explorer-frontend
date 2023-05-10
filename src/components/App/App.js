import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { register, authorize, getUserContent } from "../../utils/Auth";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSavedMoviesOpen, setIsSavedMoviesOpen] = React.useState(false);
  const [pageOpen, setPageOpen] = React.useState("Movies");
  const [isFooterShown, setIsFooterShown] = React.useState(true);
  const [isHeaderShown, setIsHeaderShown] = React.useState(true);
  const [isErrorPopupShown, setIsErrorPopupShown] = React.useState();
  const [errorPopupText, setErrorPopupText] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  function openMovies() {
    setIsSavedMoviesOpen(false);
  }

  function openSavedMovies() {
    setIsSavedMoviesOpen(true);
  }

  function showErrorPopup(text) {
    setErrorPopupText(text);
    setIsErrorPopupShown(true);
    setTimeout(() => {
      setErrorPopupText("");
      setIsErrorPopupShown(false);
    }, 5000);
  }

  function handleRegistration(name, password, email) {
    register(name, password, email)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        showErrorPopup(err);
      });
  }

  function handleAuthorization(password, email) {
    authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          navigate("/movies");
        }
      })
      .catch((err) => {
        showErrorPopup(err);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      getUserContent(token)
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          isSavedMoviesOpen={isSavedMoviesOpen}
          setIsSavedMoviesOpen={setIsSavedMoviesOpen}
          isHeaderShown={isHeaderShown}
          pageOpen={pageOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main setPageOpen={setPageOpen} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                isSavedMoviesOpen={isSavedMoviesOpen}
                onOpen={openMovies}
                setPageOpen={setPageOpen}
                showErrorPopup={showErrorPopup}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <Movies
                isSavedMoviesOpen={isSavedMoviesOpen}
                onOpen={openSavedMovies}
                showErrorPopup={showErrorPopup}
                setPageOpen={setPageOpen}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={currentUser}
                setIsFooterShown={setIsFooterShown}
                setIsLoggedIn={setIsLoggedIn}
                setPageOpen={setPageOpen}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                setIsFooterShown={setIsFooterShown}
                setIsHeaderShown={setIsHeaderShown}
                handleSubmit={handleRegistration}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                setIsFooterShown={setIsFooterShown}
                setIsHeaderShown={setIsHeaderShown}
                handleSubmit={handleAuthorization}
              />
            }
          />
          <Route
            path="*"
            element={
              <NotFound
                setIsFooterShown={setIsFooterShown}
                setIsHeaderShown={setIsHeaderShown}
              />
            }
          />
        </Routes>
        <Footer isFooterShown={isFooterShown} />
        <ErrorPopup
          isErrorPopupShown={isErrorPopupShown}
          errorPopupText={errorPopupText}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
