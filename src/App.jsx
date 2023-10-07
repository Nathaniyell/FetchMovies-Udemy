import React, { useState, useEffect, useCallback } from 'react';
import MovieList from "./components/MovieList"
import AddMovie from "./components/AddMovie"



function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true); //once the function is instantiated, the loading state becomes true
    setError(null);
    try {
      // const response = await fetch('https://swapi.dev/api/films/');
      const response = await fetch('https://fetchmovies-udemy-default-rtdb.firebaseio.com/movies.json'); //`/movies.json` creates a new node on the url which can be used to send post requests or patch in firebase.
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovies = []
      for (const key in data ){ //the `key` represents the ids from the data object. and we are using the for-in loop since the response we are getting back from the server is an object as opposed to the array we had in our movies-API earlier on
        loadedMovies.push({
          id: key,
          title: data[key].title, // the title of the distinct objects should be differentiated using the id which are the keys
          openingText: data[key].openingText, 
          releaseDate: data[key].releaseDate, 
        })
      }

      // const transformedMovies = data.results.map((movieData) => {
       //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      //setMovies(transformedMovies);
      
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); //once the request is successful or there is an error while sending the request

  }, []); //An empty dependency array on the useEffect hook means that the effect will run only once when the component mounts. When there is no second argument at all, the effect is ran everytime there is a change on the component. When the dependency array has values, the effect will only run when those values changes


  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch("https://fetchmovies-udemy-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie) ,
      headers:{
        "Content-Type": "application/json" //the headers although not required by firebase is used to describe the content that will be sent and must always be set for some other backend service that requires it
      }
    })
    const data = await response.json()
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
/*
fetch("", {}) the second argument allows us to pass in a javascript object to specify other options e.g extra headers,body, or change the http request method. In most cases you won't need the second argument because by default a get request is sent so you might not necessarily need to specifiy it
-When using async aawait, you used try and catch to check for errors. But when just using the fetch api without async await, you chain .then blocks and then also use .catch() to cath potential errors

useCallback hook in React is used to optimize your React application's performance by memoizing (remembering) a function.
UseCallback hook is used specifically for performance optimization. It is used to wrap around functions to prevent the function from rerendering too many times and also to rerender when a value which was specified in the dependency array changes.
Memoization: It's like putting a bookmark on a page. When you wrap a function with useCallback, React will remember the function as long as its dependencies remain the same. If they change, React will provide you with a new (updated) function.
*/