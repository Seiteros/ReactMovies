import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import "../scss/movie-list.css";

function MoviesList({ movies, isPending, setIsPending }) {
  const [checkedMovies, setCheckedMovies] = useState([]);
  const history = useHistory();

  const handelCheckedMovie = (e) => {
    e.target.checked ? setCheckedMovies(checkedMovies.concat(parseInt(e.target.id))) : checkedMovies.splice(checkedMovies.indexOf(e.target.id), 1);
  };

  const deleteMovies = async () => {
    let newCheckedMovies = [...checkedMovies];

    const deleteMoviesPromise = new Promise((resolve, reject) => {
      checkedMovies.forEach((id) => {
        axios
          .delete(`http://localhost:3000/movie/${id}`)
          .then(newCheckedMovies.splice(newCheckedMovies.indexOf(id), 1), console.log("test"))
          .catch((err) => console.log(err));
      });
      newCheckedMovies.length === 0 ? resolve(true) : reject(false);
    });

    await deleteMoviesPromise.then(
      (value) => {
        setCheckedMovies(newCheckedMovies);
        setIsPending(true);
      },
      (value) => {
        console.log(value);
      }
    );
  };

  return (
    <main className="container">
      <div className="row justify-content-end p-1">
        <button className="col-lg-3 btn btn-primary fw-bold mb-2 mb-lg-0" onClick={() => history.push("/add-movie")}>
          Dodaj film
        </button>
        <button className="col-lg-3 ms-auto btn btn-danger fw-bold" onClick={deleteMovies}>
          Usuń zaznaczone filmy
        </button>
      </div>
      <div className="row align-items-end movies-list">
        {isPending && <div>Loading...</div>}
        {movies.map((movie) => (
          <div className="movie col-xxl-3 col-xl-4 col-lg-4 col-md-6 p-1" key={movie.id}>
            <div className="card">
              <div className="card-body mx-0 px-0">
                <h2 className="card-title text-center">
                  {movie.title} ({movie.year})
                </h2>
                <Link to={{ pathname: `/movie/${movie.id}` }}>
                  <img src={movie.image_url} className="poster card-img-top" alt=""></img>
                </Link>
              </div>
              {movie.rating && (
                <div className="card-footer movie-rating text-center">
                  <div className="stars fs-1">
                    {[...Array(5)].map((e, i) => {
                      return movie.rating > i ? (
                        <span key={i} id={i} className="icon-star-filled text-primary" />
                      ) : (
                        <span key={i} id={i} className="icon-star text-primary" />
                      );
                    })}
                  </div>
                  <input type="checkbox" className="form-check-input text-end fs-3" id={movie.id} autoComplete="off" onChange={handelCheckedMovie} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MoviesList;
