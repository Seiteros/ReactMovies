import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import axios from "axios";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [loaded, setLoaded] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch(() => setLoaded(false));
  }, [id]);

  return (
    <div className="movie" key={movie.id}>
      {!loaded ? <Redirect to="/" /> : null}
      <h2>
        {movie.id}
        {movie.title} ({movie.year})
      </h2>
      <div className="movie-poster">
        <img src={movie.image_url} alt="img"></img>
        <input type="checkbox" className="checkbox-delete" id={movie.id} />
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
  );
}

export default MovieDetails;
