import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Movies from "./components/Movies";
import Nav from "./components/Nav";

import "./css/App.css";
import "./fontello/css/fontello.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" component={Movies} exact />
      </div>
    </Router>
  );
}

export default App;
