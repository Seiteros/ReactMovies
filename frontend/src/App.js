import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import Nav from "./components/Nav";

import "./fontello/css/fontello.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" component={Movies} exact />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/add-movie" component={AddMovie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
