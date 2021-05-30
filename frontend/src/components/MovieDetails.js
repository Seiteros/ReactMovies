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
    <div className="container mt-5">
      <div className="row">
        {failed ? <Redirect to="/" /> : null}
        <div className="col-xxl-4 col-xl-4 col-lg-5">
          <div className="card movie-detail">
            <div className="card-body mx-0 px-0">
              <h2 className="card-title text-center">
                {movie.title} ({movie.year})
              </h2>
              <img src={movie.image_url} className="poster card-img-top" alt=""></img>
            </div>
            {movie.rating && (
              <div className="card-footer movie-rating">
                <div className="stars text-center fs-1 ">
                  {[...Array(5)].map((e, i) => {
                    return movie.rating > i ? (
                      <span key={i} id={i} className="icon-star-filled link-primary" onClick={(e) => handelRateMovie(e)} />
                    ) : (
                      <span key={i} id={i} className="icon-star link-primary" onClick={(e) => handelRateMovie(e)} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-xxl-8 col-xl-8 col-lg-7">
          <div className="card">
            <div className="card-header d-flex justify-content-end corner-buttons">
              <button className="btn btn-primary fw-bold m-1" onClick={() => setEditMovie(true)}>
                Edytuj
              </button>
              <button className="btn btn-danger fw-bold m-1" onClick={hanedlDeleteMovie}>
                Usuń
              </button>
            </div>
            {!editMovie && (
              <div className="card-body">
                <h3 className="card-title">Gatunek: {movie.genre}</h3>
                <h4 className="card-subtitle">Reżyser: {movie.director}</h4>
                <p className="card-text"> {movie.description} </p>
              </div>
            )}
          </div>
          {editMovie && (
            <div className="card">
              <EditMovieForm movie={movie} setEditMovie={setEditMovie} />
              <button onClick={() => setEditMovie(false)}> Anuluj </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
