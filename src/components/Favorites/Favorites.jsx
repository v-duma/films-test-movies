import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./Favorites.module.css";
import Header from "../Header/Header";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://66180e379a41b1b3dfbc25c9.mockapi.io/favorite")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleMovieClick = async (id) => {
    try {
      const response = await fetch(
        `https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies/${id}`
      );
      if (response.status === 404) {
        return (
          <>
            <Header />
            <div className={s.deletedPage}>
              <p>The movie has been deleted!</p>
            </div>
          </>
        );
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={s.favorites}>
        <h1>Favorites</h1>
        <div className={s.movieList}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className={s.movieCard}
              onClick={() => handleMovieClick(movie.id)}
            >
              <img src={movie.image} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>Rating: {movie.rating}</p>
              <p>Release Date: {movie.release_date}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorites;
