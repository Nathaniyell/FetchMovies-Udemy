import { useState } from "react";
import MoviesList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();

    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_craw,
        releaseDate: movie.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  }

  return (
    <>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      <section>
       {!isLoading && <MoviesList movies={movies} />} 
       {isLoading && <p>Loading...</p>}
      </section>
    </>
  );
}

export default App;
