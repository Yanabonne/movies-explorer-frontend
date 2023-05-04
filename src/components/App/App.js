import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isSavedMoviesOpen, setIsSavedMoviesOpen] = React.useState(false);
  const [pageOpen, setPageOpen] = React.useState("Movies");
  const [isFooterShown, setIsFooterShown] = React.useState(true);
  const [isHeaderShown, setIsHeaderShown] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
  });

  function openMovies() {
    setIsSavedMoviesOpen(false);
  }

  function openSavedMovies() {
    setIsSavedMoviesOpen(true);
  }

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        isSavedMoviesOpen={isSavedMoviesOpen}
        setIsSavedMoviesOpen={setIsSavedMoviesOpen}
        isHeaderShown={isHeaderShown}
        pageOpen={pageOpen}
      />
      <Routes>
        <Route path="/" element={<Main setPageOpen={setPageOpen} />} />
        <Route
          path="/movies"
          element={
            <Movies
              isSavedMoviesOpen={isSavedMoviesOpen}
              onOpen={openMovies}
              setPageOpen={setPageOpen}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Movies
              isSavedMoviesOpen={isSavedMoviesOpen}
              onOpen={openSavedMovies}
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
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              setIsFooterShown={setIsFooterShown}
              setIsHeaderShown={setIsHeaderShown}
              setIsLoggedIn={setIsLoggedIn}
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
    </div>
  );
}

export default App;
