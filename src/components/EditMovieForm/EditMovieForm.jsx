import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./EditMovieForm.module.css";
function EditMovieForm() {
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
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={s.editForm}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Rating:
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </label>
      <label>
        Release Date:
        <input
          type="text"
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </label>
      <label>
        Actors:
        <input
          type="text"
          name="actors"
          value={formData.actors}
          onChange={handleChange}
        />
      </label>
      <label>
        Director:
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Movie</button>
    </form>
  );
}

export default EditMovieForm;
