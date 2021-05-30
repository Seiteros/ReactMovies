import React, { useEffect, useState } from "react";
import axios from "axios";
import SortMovies from "./SortMovies";
import MoviesList from "./MoviesList";

function Movies() {
  const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    isPending ? axios.get("http://localhost:3000/movies").then((response) => setData(response.data), setIsPending(false)) : console.log("załadowano");
  }, [isPending]);

  return (
    <div>
      <SortMovies data={data} setMovies={setMovies} />
      <MoviesList movies={movies} isPending={isPending} setIsPending={setIsPending} />
    </div>
  );
}

export default Movies;
