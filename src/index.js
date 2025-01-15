import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import Photographer from './pages/Photographer';
import './css/style.css';
import reportWebVitals from './reportWebVitals';


export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/photographer/:id/:search?" element={<Photographer />} />
    </Routes>
  </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector(".container"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 