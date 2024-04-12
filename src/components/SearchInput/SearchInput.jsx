import { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import s from "./SearchInput.module.css";
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `https://6617efe59a41b1b3dfbbbf0e.mockapi.io/movies?title=${searchTerm}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
        setSearchError("");
        if (data.length === 0) {
          setSearchError("Nothing was found for your request!");
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setSearchError("Nothing was found for your request!");
      });
  };

  return (
    <>
      <Header />
      <div className={s.searchContainer}>
        <div className={s.searchInputContainer}>
          <input
            type="text"
            placeholder="Search movies by title"
            value={searchTerm}
            onChange={handleInputChange}
            className={s.searchInput}
          />
          <button onClick={handleSearch} className={s.searchButton}>
            Search
          </button>
        </div>
        {searchError && <p>{searchError}</p>}
        {searchResults.length > 0 && (
          <div className={s.resultsContainer}>
            <h2>Search Results:</h2>
            <div className={s.movieList}>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/movie/${result.id}`}
                  className={s.movieCard}
                >
                  <img src={result.image} alt={result.title} />
                  <h2>{result.title}</h2>
                  <p>Rating: {result.rating}</p>
                  <p>Release Date: {result.release_date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchInput;
