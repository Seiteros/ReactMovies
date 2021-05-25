import React from "react";
import axios from "axios";
import AddMovieForm from "./components/AddMovieForm";

import "./css/App.css";
import EditMovieForm from "./components/EditMovieForm";

function AppTest() {
  const { filmy } = require("./filmy");

  const postMovie = () => {
    filmy.forEach((film) => {
      axios
        .post("http://localhost:3000/movie", film)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  return (
    <div className="App">
      <button onClick={postMovie}> Dodaj filmy</button>
      <AddMovieForm />
      <EditMovieForm />
    </div>
  );
}

export default AppTest;
