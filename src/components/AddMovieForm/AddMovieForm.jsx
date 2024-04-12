import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import s from "./AddMovieForm.module.css";

function AddMovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    release_date: "",
    genre: "",
    actors: "",
    director: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("New movie added!", {
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
        setFormData({
          title: "",
          description: "",
          rating: "",
          release_date: "",
          genre: "",
          actors: "",
          director: "",
          image: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new movie:", error);
        toast.error("Error adding new movie.");
      });
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className={s.formAddMovie}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            max={10}
            required
          />
        </label>
        <label>
          Release Date:
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Actors:
          <input
            type="text"
            name="actors"
            value={formData.actors}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
}

export default AddMovieForm;
