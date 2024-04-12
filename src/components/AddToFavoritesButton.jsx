import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToFavoritesButton({ movie }) {
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch("https://66180e379a41b1b3dfbc25c9.mockapi.io/favorite")
      .then((response) => response.json())
      .then((data) => {
        const favoriteMovieIds = data.map((movie) => movie.id);
        setFavoriteMovies(favoriteMovieIds);
      })
      .catch((error) => {
        console.error("Error fetching favorite movies:", error);
      });
  }, []);

  const addToFavorites = () => {
    if (!addedToFavorites) {
      fetch("https://66180e379a41b1b3dfbc25c9.mockapi.io/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
        .then((response) => response.json())
        .then(() => {
          toast.success("Movie added to favorites!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
              background: "#ed6b5b",
              fontFamily: '"Jura", sans-serif',
            },
          });
          setAddedToFavorites(true);
          setFavoriteMovies([...favoriteMovies, movie.id]);
        })
        .catch((error) => {
          console.error("Error adding movie to favorites:", error);
          toast.error(
            "Error adding movie to favorites. Please try again later!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              style: {
                background: "#ed6b5b",
                fontFamily: '"Jura", sans-serif',
              },
            }
          );
        });
    }
  };

  useEffect(() => {
    if (favoriteMovies.includes(movie.id)) {
      setAddedToFavorites(true);
    }
  }, [favoriteMovies, movie.id]);

  return (
    <button onClick={addToFavorites} disabled={addedToFavorites}>
      {addedToFavorites ? "Added to Favorites" : "Add to Favorites"}
    </button>
  );
}

export default AddToFavoritesButton;
