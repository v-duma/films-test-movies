import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./App.module.css";
import Header from "./components/Header/Header";
function App() {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    fetch("https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies")
      .then((response) => response.json())
      .then((data) => setmovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
      <Header />
      <div className={s.app}>
        <h1>List of Movies</h1>
        <div className={s.movieList}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className={s.movieCard}
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

export default App;
