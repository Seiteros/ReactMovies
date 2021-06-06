import React from "react";
import { Link } from "react-router-dom";

function Nav({ setIsPending }) {
  return (
    <div className="navbar p-3 " style={{ borderBottom: "1px solid white" }}>
      <Link to="/" className="navbar-brand link-light" onClick={() => setIsPending(true)}>
        <h1>
          Filmy <span className="icon-video" />
        </h1>
      </Link>
    </div>
  );
}

export default Nav;
