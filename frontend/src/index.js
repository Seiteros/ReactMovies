import React from "react";
import ReactDOM from "react-dom";
import "./scss/custom.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppTest from "./AppTest";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AppTest />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
