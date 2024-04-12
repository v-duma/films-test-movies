import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import SearchInput from "./components/SearchInput/SearchInput.jsx";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchInput />} />
        <Route path="/addMovie" element={<AddMovieForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
