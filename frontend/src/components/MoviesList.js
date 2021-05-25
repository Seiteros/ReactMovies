import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function MoviesList({ movies, isPending, setIsPending }) {
  const [checkedMovies, setCheckedMovies] = useState([]);
  const history = useHistory();

  const handelCheckedMovie = (e) => {
    e.target.checked ? setCheckedMovies(checkedMovies.concat(parseInt(e.target.id))) : checkedMovies.splice(checkedMovies.indexOf(e.target.id), 1);
  };

  const deleteMovies = () => {
    let newCheckedMovies = [...checkedMovies];
    console.log(checkedMovies);
    checkedMovies.forEach((id) => {
      axios.delete(`http://localhost:3000/movie/${id}`);
      newCheckedMovies.splice(newCheckedMovies.indexOf(id), 1);
    });
    setCheckedMovies(newCheckedMovies);
    setIsPending(true); // nie działa odświeżanie
  };

  return (
    <main>
      {window.innerWidth}
      <button className="delete-button" onClick={deleteMovies}>
        Usuń zaznaczone filmy
      </button>
      <button onClick={() => history.push("/add-movie")}>Dodaj film</button>
      <div className="movies-list">
        {isPending && <div>Loading...</div>}
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <h2>
              {movie.title} ({movie.year})
            </h2>
            <Link to={"/movie/" + movie.id}>
              <div className="movie-poster">
                <img src={movie.image_url} alt=""></img>
                {/* <input type="checkbox" className="checkbox-delete" onChange={handelCheckedMovie} id={movie.id} /> */}
              </div>
            </Link>
            <div className="movie-rating">
              {[...Array(movie.rating)].map((e, i) => (
                <span key={i} className="icon-star-filled" />
              ))}
              {[...Array(5 - movie.rating)].map((e, i) => (
                <span key={i} className="icon-star" />
              ))}
            </div>
            <input type="checkbox" className="checkbox-delete" onChange={handelCheckedMovie} id={movie.id} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default MoviesList;
