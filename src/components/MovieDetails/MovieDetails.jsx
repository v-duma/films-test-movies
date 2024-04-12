import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToFavoritesButton from "../AddToFavoritesButton.jsx";
import EditMovieForm from "../EditMovieForm/EditMovieForm.jsx";
import DeleteMovieButton from "../DeleteMovieButton/DeleteMovieButton.jsx";
import Header from "../Header/Header.jsx";
import s from "./MovieDetails.module.css";

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setShowDeletedMessage(true);
          throw new Error("Movie not found");
        }
      })
      .then((data) => setMovie(data))
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setMovie(null);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (showDeletedMessage) {
      setTimeout(() => {
        setShowDeletedMessage(true);
      }, 3000);
    }
  }, [showDeletedMessage]);

  if (showDeletedMessage) {
    return (
      <>
        <Header />
        <div className={s.deletedPage}>
          <p>The movie has been deleted!</p>
        </div>
      </>
    );
  }

  if (movie === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={s.MovieDetailsContainer}>
        <img src={movie.image} alt={movie.title} />
        <h1>{movie.title}</h1>
        <p>Description: {movie.description}</p>
        <p>Actors: {movie.actors}</p>
        <p>Director: {movie.director}</p>
        <p>Genre: {movie.genre}</p>
        <p>Rating: {movie.rating}</p>
        <div className={s.MovieDetailsButtons}>
          <button onClick={handleEditClick}>Edit</button>
          <AddToFavoritesButton movie={movie} />
          <DeleteMovieButton id={id} />
        </div>
      </div>

      {isEditing && <EditMovieForm movie={movie} />}
    </>
  );
}

export default MovieDetails;
