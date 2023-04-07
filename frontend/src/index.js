import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * Creates a root React component and renders it to the DOM.
 *
 * @param {HTMLElement} element - The HTML element that will contain the rendered component.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
