import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const API_KEY = "e1a8dc42c963292aeb79e8d5fa369821";
  const BASE_URL = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query = "") => {
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      : `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(url);
      setMovies(response.data.results || []);
    } catch (err) {
      setError("Could not fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (error) setError(""); 
  };

  const handleSearchClick = () => {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }
    fetchMovies(search);
  };

  return (
    <div className="container">
        <header className="nav">
       <h1 className="h1">MovieNest</h1>
         <div className="input-group">
    <input
      type="text"
      placeholder="Search movie"
      value={search}
      onChange={handleSearch}
    />
    <button className="button" onClick={handleSearchClick}>
      Search
    </button>
     </div>      
   </header> 
      <div className="main">
        {isLoading && <p>Loading...</p>}
       {error && <p className="error">{error}</p>}
        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img className="img"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date || "Unknown"}</p>
                <p>Rating: {movie.vote_average || "N/A"}</p>
              </div>
            ))
          ) : (
            !isLoading && <p className="err">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
