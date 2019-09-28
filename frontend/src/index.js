import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import configStore from "./store/store.js";
import "./index.css";


document.addEventListener("DOMContentLoaded", () => {
  const store = configStore();
  const root = document.getElementById("root");

  //  window.getState = store.getState;

  ReactDOM.render(<App store={store} />, root)
})

