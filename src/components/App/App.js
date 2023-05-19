import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSavedMoviesOpen, setIsSavedMoviesOpen] = React.useState(false);
  const [pageOpen, setPageOpen] = React.useState("Movies");
  const [isFooterShown, setIsFooterShown] = React.useState(true);
  const [isHeaderShown, setIsHeaderShown] = React.useState(true);
  const [isErrorPopupShown, setIsErrorPopupShown] = React.useState();
  const [errorPopupText, setErrorPopupText] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
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

  function handleUserInfoChange(data) {
    api
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data);
        navigate("/profile");
        showErrorPopup("Данные были успешно изменены");
      })
      .catch((err) => {
        showErrorPopup(err);
      });
  }

  function handleRegistration(name, password, email) {
    register(name, password, email)
      .then(() => {
        handleAuthorization(password, email);
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
          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          navigate("/movies");
        }
      })
      .catch((err) => {
        showErrorPopup(err);
      });
  }

  function exitProfile() {
    localStorage.clear();
    setSavedMovies([]);
    setInitialMovies([]);
    setCurrentUser({});
    navigate("/");
    setIsLoggedIn(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      getUserContent(token)
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
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
              <ProtectedRoute
                isSavedMoviesOpen={isSavedMoviesOpen}
                onOpen={openMovies}
                setPageOpen={setPageOpen}
                showErrorPopup={showErrorPopup}
                component={Movies}
                initialMovies={initialMovies}
                setInitialMovies={setInitialMovies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isSavedMoviesOpen={isSavedMoviesOpen}
                onOpen={openSavedMovies}
                showErrorPopup={showErrorPopup}
                setPageOpen={setPageOpen}
                initialMovies={initialMovies}
                setInitialMovies={setInitialMovies}
                component={Movies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                setIsFooterShown={setIsFooterShown}
                setPageOpen={setPageOpen}
                handleUserInfoChange={handleUserInfoChange}
                component={Profile}
                exitProfile={exitProfile}
                showErrorPopup={showErrorPopup}
              />
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  setIsFooterShown={setIsFooterShown}
                  setIsHeaderShown={setIsHeaderShown}
                  handleSubmit={handleRegistration}
                />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login
                  setIsFooterShown={setIsFooterShown}
                  setIsHeaderShown={setIsHeaderShown}
                  handleSubmit={handleAuthorization}
                />
              )
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
          setIsErrorPopupShown={setIsErrorPopupShown}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
