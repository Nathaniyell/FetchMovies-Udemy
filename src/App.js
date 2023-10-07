import { useState } from "react";
import MoviesList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]= useState(null)

  async function fetchMoviesHandler() {
    setIsLoading(true); //once the function is instantiated, the loading state becomes true
    setError(null)
    try{
      const response = await fetch("https://swapi.dev/api/film");
      const data = await response.json();
  if(!response.ok){
    throw new Error("Something went wrong")
  }
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_craw,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false); //once the movies have been loaded, the loading is set back to false
    }catch(err){
      setError(err.message)
    }
    setIsLoading(false) //once the request is successful or there is an error while sending the request
    
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p> }
      </section>
    </>
  );
}

export default App;
//fetch("", {}) the second argument allows us to pass in a javascript object to specify other options e.g extra headers,body, or change the http request method. In most cases you won't need the second argument because by default a get request is sent so you might not necessarily need to specifiy it
//When using async aawait, you used try and catch to check for errors. But when just using the fetch api without async await, you chain .then blocks and then also use .catch() to cath potential errors