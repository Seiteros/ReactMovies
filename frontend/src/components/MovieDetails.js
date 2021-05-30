import React, { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router";
import axios from "axios";
import EditMovieForm from "./EditMovieForm";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [failed, setFailed] = useState(false);
  const [editMovie, setEditMovie] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch(() => setFailed(true));
  }, [id, editMovie]);

  const hanedlDeleteMovie = () => {
    axios
      .delete(`http://localhost:3000/movie/${movie.id}`)
      .then(history.push("/"))
      .catch((error) => console.log(error));
  };

  const handelRateMovie = (e) => {
    let newScore = parseInt(e.target.id) + 1;
    axios.patch(`http://localhost:3000/movie/${movie.id}/rate?score=${newScore}`).then((response) => console.log(response));
  };

  return (
    <>
      <div className="movie-details">
        {failed ? <Redirect to="/" /> : null}
        <div className="movie" key={movie.id}>
          <h2>
            {movie.title} ({movie.year})
          </h2>
          <div className="movie-poster">
            <img src={movie.image_url} alt="img"></img>
          </div>
          {movie.rating && (
            <div className="movie-rating">
              {[...Array(5)].map((e, i) => {
                return movie.rating > i ? (
                  <span key={i} id={i} className="icon-star-filled rate" onClick={(e) => handelRateMovie(e)} />
                ) : (
                  <span key={i} id={i} className="icon-star rate" onClick={(e) => handelRateMovie(e)} />
                );
              })}
            </div>
          )}
        </div>
        <div className="card-wraper">
          <div className="corner-buttons">
            <button className="edit-movie" onClick={() => setEditMovie(true)}>
              Edytuj
            </button>
            <button className="delete-movie" onClick={hanedlDeleteMovie}>
              Usuń
            </button>
          </div>
          {!editMovie && (
            <div className="card">
              <h3>Gatunek: {movie.genre}</h3>
              <h4>Reżyser: {movie.director}</h4>
              <p>{movie.description}</p>
            </div>
          )}
          {editMovie && (
            <div className="card">
              <EditMovieForm movie={movie} setEditMovie={setEditMovie} />
              <button onClick={() => setEditMovie(false)}> Anuluj </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
