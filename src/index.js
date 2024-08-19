import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';
import StoreProvider from "./store";
import App from './App';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StoreProvider >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StoreProvider>
);
