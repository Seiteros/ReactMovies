import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import Nav from "./components/Nav";
import "./scss/custom.css";
import "./fontello/css/fontello.css";

function App() {
  const [isPending, setIsPending] = useState(true);
  const [favorites, setFavorites] = useState([]);
  return (
    <Router>
      <div className="App">
        <Nav setIsPending={setIsPending} />
        <Switch>
          <Route path="/" exact render={(props) => <Movies {...props} isPending={isPending} setIsPending={setIsPending} favorites={favorites} />} />
          <Route
            path="/movie/:id"
            render={(props) => <MovieDetails {...props} setIsPending={setIsPending} favorites={favorites} setFavorites={setFavorites} />}
          />
          <Route path="/add-movie" render={(props) => <AddMovie {...props} setIsPending={setIsPending} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
