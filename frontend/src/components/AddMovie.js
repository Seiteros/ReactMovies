import React from "react";
import AddMovieForm from "./AddMovieForm";

function AddMovie() {
  return (
    <div className="container ">
      <div className="row text-center">
        <div className="col">
          <div className="card p-2">
            <AddMovieForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
