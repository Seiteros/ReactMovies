import React, { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router";
import axios from "axios";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [failed, setFailed] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch(() => setFailed(true));
  }, [id]);

  const hanedlDeleteMovie = () => {
    axios
      .delete(`http://localhost:3000/movie/${movie.id}`)
      .then(history.push("/"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="corner-buttons">
        <button className="edit-movie">Edytuj</button>
        <button className="delete-movie" onClick={hanedlDeleteMovie}>
          Usuń
        </button>
      </div>
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
              {[...Array(movie.rating)].map((e, i) => (
                <span key={i} className="icon-star-filled" />
              ))}
              {[...Array(5 - movie.rating)].map((e, i) => (
                <span key={i} className="icon-star" />
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h3>Gatunek: {movie.genre}</h3>
          <h4>Reżyser: {movie.director}</h4>
          <p>{movie.description}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
