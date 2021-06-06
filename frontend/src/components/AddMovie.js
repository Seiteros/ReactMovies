import React from "react";
import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

function AddMovie({ setIsPending }) {
  return (
    <div className="container mt-4 ">
      <div className="row text-center">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-end corner-buttons">
              <Link
                to="/"
                className="btn btn-secondary fw-bold m-1 ps-4 pe-4 d-flex align-items-center align-self-end"
                onClick={() => setIsPending(true)}
              >
                <span> X</span>
              </Link>
            </div>
            <MovieForm newMovie={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
