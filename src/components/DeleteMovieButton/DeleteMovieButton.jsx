import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./DeleteMovieButton.module.css";
import Header from "../Header/Header";

function DeleteMovieButton({ id }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    fetch(`https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Movie deleted!", {
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
        setIsDeleted(true);
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <>
      {!isDeleted ? (
        <button onClick={handleDelete}>Delete Movie from list</button>
      ) : (
        <>
          <Header />
          <div className={s.deletedPage}>
            <p>The movie has been deleted!</p>
          </div>
        </>
      )}
    </>
  );
}

DeleteMovieButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteMovieButton;
