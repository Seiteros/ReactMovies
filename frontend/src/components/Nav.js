import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">
        <h1>Filmy</h1>
      </Link>
    </div>
  );
}

export default Nav;
