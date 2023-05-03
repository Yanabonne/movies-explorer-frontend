import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isSavedMoviesOpen, setIsSavedMoviesOpen] = React.useState(false);

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        isSavedMoviesOpen={isSavedMoviesOpen}
        setIsSavedMoviesOpen={setIsSavedMoviesOpen}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={<Movies isSavedMoviesOpen={isSavedMoviesOpen} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
