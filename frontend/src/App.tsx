/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import './styles/App.css';
import noPosterImg from './static/images/no_poster.png';

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
  const [moviePoster, setMoviePoster] = useState('');

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const fetchLatestMovie = async () => {
      const movie = await fetch(
        `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_API_KEY}`
      );
      if (!movie.ok) {
        forceUpdate();
        return;
      }
      const data = await movie.json();
      if (data.adult) {
        forceUpdate();
      } else {
        setLatestMovieID(data.id);
      }
    };
    fetchLatestMovie();
  });

  useEffect(() => {
    const fetchRandomMovie = async () => {
      const randomMovieID = Math.floor(Math.random() * latestMovieID);
      const randomMovie = await fetch(
        `https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      // checking to make sure a movie was chosen and not an error, if error
      // forcing update on app
      if (!randomMovie.ok) {
        forceUpdate();
        console.log('resetting');
      }

      const movieData = await randomMovie.json();

      // setting the poster image or forcing update if no poster
      const imagePath = 'https://www.themoviedb.org/t/p/original';
      if (movieData.poster_path === null) {
        setMoviePoster(noPosterImg);
      } else {
        const posterPath = imagePath + movieData.poster_path;
        setMoviePoster(posterPath);
      }

      setRandomMovieData(movieData);
    };
    fetchRandomMovie();
  }, [latestMovieID]);

  return (
    <div className="App">
      <div className="header">
        <h1>MovieMatch</h1>
        <div className="user-bar" />
      </div>

      <div className="content">
        <div className="movie-card">
          <img src={moviePoster} alt="movieName" />
        </div>
        <div className="dislike-btn">D</div>
        <div className="like-btn">L</div>
      </div>
    </div>
  );
}

export default App;
