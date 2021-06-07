/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import './App.css';

// This will be used to force an update on the DOM/Components so that if a movie
// is returned with a 404 error or is an Adult film the first useEffect below
// will hit the api again to get a movie that isn't either of the above errors
function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
}

function App() {
  const [latestMovieID, setLatestMovieID] = useState(0);
  const [randomMovieData, setRandomMovieData] = useState([]);

  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const fetchLatestMovie = async () => {
      const movie = await fetch(
        `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_API_KEY}`
      );
      if (!movie.ok) {
        forceUpdate();
      }

      const data = await movie.json();

      if (data.adult) {
        forceUpdate();
      }
      setLatestMovieID(data.id);
    };
    fetchLatestMovie();
  });

  useEffect(() => {
    const fetchRandomMovie = async () => {
      const randomMovieID = Math.floor(Math.random() * latestMovieID);
      const randomMovie = await fetch(
        `https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      const movieData = await randomMovie.json();
      setRandomMovieData(movieData);
    };
    fetchRandomMovie();
  }, [latestMovieID]);

  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  );
}

export default App;
