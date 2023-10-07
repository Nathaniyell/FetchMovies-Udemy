import { useState } from "react";
import MoviesList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true); //once the function is instantiated, the loading state becomes true
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong");
      } //check that the response is okay before even passing it to be converted to json
      const data = await response.json();
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false); //once the movies have been loaded, the loading is set back to false
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false); //once the request is successful or there is an error while sending the request
  }

  let content = <p>Found no movies</p>;
if(movies.length > 0){
  content = <MoviesList movies={movies} />
}
if(error){
  content = <p>{error}</p>;
}
if(isLoading){
  content = <p>Loading...</p>;
}


  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </>
  );
}

export default App;
//fetch("", {}) the second argument allows us to pass in a javascript object to specify other options e.g extra headers,body, or change the http request method. In most cases you won't need the second argument because by default a get request is sent so you might not necessarily need to specifiy it
//When using async aawait, you used try and catch to check for errors. But when just using the fetch api without async await, you chain .then blocks and then also use .catch() to cath potential errors
