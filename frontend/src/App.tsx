/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

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
    <div className="App w-screen h-screen">
      {loading ? (
        <div> ...loading... </div>
      ) : (
        <>
          <header className="w-full h-10 flex flex-row content-center p-1.5">
            <h1 className="w-1/2 self-center">MovieMatch</h1>
            <div className="user-bar w-1/2 self-center text-right">
              <h1>test user</h1>
            </div>
          </header>

          <div className="content w-full">
            <div className="movie-card h-5/6">
              <img src={moviePoster} alt="movieName" />
            </div>
            <div className="choices p-10 h-1/6 w-full grid grid-cols-2 grid-rows-1 grid-flow-row justify-items-center text-center place-content-center">
              <div className="dislike-btn w-1/2 h-full text-red-400 text-5xl self-center">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className="like-btn h-full w-1/2 text-green-600 text-5xl">
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
