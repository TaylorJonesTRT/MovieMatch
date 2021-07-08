/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import logo from './static/images/logo.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState({});
  const [moviePoster, setMoviePoster] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchMovieDetails = async () => {
      const movie = await fetch('http://localhost:4000/api/movie/random').then(
        (data) => data.json()
      );
      const poster = `https://www.themoviedb.org/t/p/original${movie.movie.poster_path}`;
      setMovieData(movie.movie);
      setMoviePoster(poster);
      setLoading(false);
    };

    fetchMovieDetails();
  }, []);

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      {loading ? (
        <div> ...loading... </div>
      ) : (
        <>
          <header className="w-full h-1/6 flex flex-row content-center p-2.5">
            <div className="w-2/5 self-center">
              <img src={logo} alt="MovieMatch" />
            </div>
            <div className="user-bar w-1/2 self-center text-right">
              <h1>test user</h1>
            </div>
          </header>

          <div className="content w-full h-5/6">
            <div className="movie-card flex flex-col justify-center">
              <img
                src={moviePoster}
                alt="movieName"
                className="h-96 shadow-2xl"
              />
              <p className="poster-notice text-center text-xs text-gray-500">
                Click the poster for details
              </p>
            </div>
            <div className="choices w-full pt-10 text-5xl grid grid-cols-2 grid-rows-1 grid-flow-row justify-items-center text-center place-content-center">
              <div className="dislike-btn text-red-400 self-center">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className="like-btn text-green-600">
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
