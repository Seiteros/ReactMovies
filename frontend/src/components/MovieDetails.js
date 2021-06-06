import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

function MovieDetails({ setIsPending, favorites, setFavorites }) {
  const [movie, setMovie] = useState({});
  const [failed, setFailed] = useState(false);
  const [editMovie, setEditMovie] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [rated, setRated] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch(() => setFailed(true));
  }, [id, editMovie]);

  if (failed) {
    setIsPending(true);
    history.push("/");
  }

  const hanedlDeleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:3000/movie/${movie.id}`);
      await setIsPending(true);
      history.push({ pathname: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  const handelRateMovie = (e) => {
    if (!rated) {
      let newScore = parseInt(e.target.id) + 1;
      axios.patch(`http://localhost:3000/movie/${movie.id}/rate?score=${newScore}`).then((response) => console.log(response));
      setRated(true);
    } else {
      document.getElementById("icon-star-filled");
    }
  };

  const handelFavorites = () => {
    if (favorites.includes(movie.id)) {
      let newFavourites = [...favorites];
      newFavourites.splice(newFavourites.indexOf(movie.id), 1);
      setFavorites(newFavourites);
    } else {
      setFavorites([...favorites, movie.id]);
    }
  };

  const starColor = rated ? "text-primary" : "link-secondary";

  return (
    <div className="container mt-5">
      <div className="row">
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
                      <span key={i} id={i} className={`icon-star-filled ${starColor}`} onClick={(e) => handelRateMovie(e)} />
                    ) : (
                      <span key={i} id={i} className={`icon-star ${starColor}`} onClick={(e) => handelRateMovie(e)} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-xxl-8 col-xl-8 col-lg-7">
          <div className="card movie-card">
            <div className="card-header d-flex justify-content-end corner-buttons">
              <button className="btn btn-info m-1 p-1" onClick={handelFavorites}>
                {favorites.includes(movie.id) && <span className="icon-heart fs-3 text-danger"></span>}
                {!favorites.includes(movie.id) && <span className="icon-heart-empty fs-3 text-danger"></span>}
              </button>
              <button className="btn btn-primary fw-bold m-1" onClick={() => setEditMovie(true)}>
                Edytuj
              </button>
              <button className="btn btn-danger fw-bold m-1" onClick={hanedlDeleteMovie}>
                Usuń
              </button>
              <Link to="/" className="btn btn-secondary fw-bold m-1 ps-4 pe-4 d-flex align-items-center" onClick={() => setIsPending(true)}>
                <span> X</span>
              </Link>
            </div>
            {!editMovie && (
              <div className="card-body movie-card">
                <h3 className="card-title">Gatunek: {movie.genre}</h3>
                <h4 className="card-subtitle">Reżyser: {movie.director}</h4>
                <p className="card-text mt-2"> {movie.description} </p>
              </div>
            )}
            {editMovie && (
              <div className="card-body movie-card d-flex flex-column justify-content-between">
                <MovieForm movie={movie} newMovie={false} />
                <button className="btn btn-info" onClick={() => setEditMovie(false)}>
                  Zamknij edycje
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
