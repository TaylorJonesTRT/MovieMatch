/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { GithubLoginButton } from 'react-social-login-buttons';
import logo from './static/images/logo.png';

const cookies = new Cookies();

function App() {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState(Object);
  const [moviePoster, setMoviePoster] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMovieDetails = async (): Promise<any> => {
      const movie = await axios('http://localhost:4000/api/movie/random').then(
        (data) => data
      );
      const poster = `https://www.themoviedb.org/t/p/original${movie.data.movie.poster_path}`;
      setMovieData({ movieData: movie });
      setMoviePoster(poster);
    };

    fetchMovieDetails().then(() => setLoading(false));
  }, []);

  // todo: Create a new useEffect below to have the front end check to make sure the user is
  // todo: authenticated so that movies can be saved when needed.
  useEffect(() => {
    const verifyAuth = () => {
      const token = cookies.get('token');
      if (token == null) {
        return setIsLoggedIn(false);
      }
      localStorage.setItem('token', token);
      return setIsLoggedIn(true);
    };
    verifyAuth();
  }, []);

  // The below is to have React know when to show the details of a movie or its poster.
  const flipCard = () => {
    setShowDetails(!showDetails);
  };

  const handleGitHubLogin = (event: any) => {
    event.preventDefault();
    window.open('http://localhost:4000/api/auth/github');
  };

  if (!isLoggedIn) {
    return (
      <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
        <div className="logo flex flex-row justify-center">
          <img src={logo} alt="MovieMatch" />
        </div>
        <div
          className="login flex flex-row justify-center"
          onClick={handleGitHubLogin}
        >
          <GithubLoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      {loading ? (
        <div> ...loading.... </div>
      ) : (
        <>
          <header className="w-full h-1/6 flex flex-row content-center p-2.5">
            <div className="w-2/5 self-center">
              <img src={logo} alt="MovieMatch" />
            </div>
            <div className="user-bar w-3/5 self-center text-right">
              <h1>
                <button onClick={handleGitHubLogin}>Login with GitHub </button>
              </h1>
            </div>
          </header>

          <div className="content w-full h-5/6">
            <div
              className="movie-card bg-opacity-0 w-10/12 h-96 flex flex-col justify-center p-2 shadow-2xl m-auto overflow-clip ring-2 ring-gray-300"
              onClick={flipCard}
            >
              {showDetails ? (
                <ul>
                  <li>{movieData.movieData.data.movie.original_title}</li>
                  <li className="text-xs">
                    {movieData.movieData.data.movie.overview}
                  </li>
                  <li>
                    Runtime: {movieData.movieData.data.movie.runtime} Minutes
                  </li>
                </ul>
              ) : (
                <img src={moviePoster} alt="movieName" className="h-full" />
              )}
            </div>

            <p className="poster-notice text-center text-xs text-gray-500">
              Click the poster for details
            </p>
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
