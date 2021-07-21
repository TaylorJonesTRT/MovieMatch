/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { GithubLoginButton } from 'react-social-login-buttons';
import logo from './static/images/logo.png';

const cookies = new Cookies();

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  // eslint-disable-next-line no-shadow
  return () => setValue((value) => value + 1); // update the state to force render
}

function App() {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState(Object);
  const [moviePoster, setMoviePoster] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reload, setReload] = useState(0);

  const forceUpdate = useForceUpdate();

  // This hook is being used to grab the movie data from the backend api and to set that data into
  // its correct state instance. Also changing state of loading to display the movie data rather
  // than the information that is loaded when loading is set to true.
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
  }, [reload]);

  // This useEffect looks to make sure that there is a cookie named 'token' at all times. If there is
  // then that means the user is logged in. If not it makes the page go back to it's initial state
  // and have the user click the login with github button again.
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

  const handleGitHubLogin = (event: any) => {
    event.preventDefault();
    window.open('http://localhost:4000/api/auth/github');
  };

  // The below is to have React know when to show the details of a movie or its poster.
  const flipCard = () => {
    setShowDetails(!showDetails);
  };

  // POST call to the backend for a liked movie.
  const sendMovie = (choice: string) => {
    if (choice === 'dislike') {
      axios({
        method: 'POST',
        url: 'http://localhost:4000/api/user/save-movie/',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
          'content-type': 'application/json',
        },
        data: {
          movieTitle: movieData.movieData.data.movie.original_title,
          movieDescriptions: movieData.movieData.data.movie.overview,
          movieRunTime: movieData.movieData.data.movie.runtime,
          movieID: movieData.movieData.data.movie.id,
          liked: 'disliked',
        },
      });
      setReload(reload + 1);
    }
    if (choice === 'like') {
      axios({
        method: 'POST',
        url: 'http://localhost:4000/api/user/save-movie/',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
          'content-type': 'application/json',
        },
        data: {
          movieTitle: movieData.movieData.data.movie.original_title,
          movieDescriptions: movieData.movieData.data.movie.overview,
          movieRunTime: movieData.movieData.data.movie.runtime,
          movieID: movieData.movieData.data.movie.id,
          liked: 'liked',
        },
      });
      forceUpdate();
    }
  };

  // Conditional rendering to show a maing page with only the logo and login button to a person that
  // is not logged in.
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

  // This conditional will only show for a second or 2 while the movie details are being grabbed
  // and saved into state.
  if (loading) {
    return (
      <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
        <header className="w-full h-1/6 flex flex-row content-center p-2.5">
          <div className="w-2/5 self-center">
            <img src={logo} alt="MovieMatch" />
          </div>
          <div className="user-bar w-3/5 self-center text-right">
            <h1>My Stuff</h1>
          </div>
        </header>

        <div className="content w-full h-5/6">
          <div
            className="movie-card bg-opacity-0 w-10/12 h-96 flex flex-col justify-center p-2 shadow-2xl m-auto overflow-clip ring-2 ring-gray-300"
            onClick={flipCard}
          >
            <h1 className="text-center">Loading Movie</h1>
          </div>

          <p className="poster-notice text-center text-xs text-gray-500">
            Click the poster for details
          </p>
          <div className="choices w-full pt-10 text-5xl grid grid-cols-2 grid-rows-1 grid-flow-row justify-items-center text-center place-content-center">
            <div
              className="dislike-btn text-red-400 self-center"
              data-name="dislike"
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </div>
            <div className="like-btn text-green-600" key="like">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <header className="w-full h-1/6 flex flex-row content-center p-2.5">
        <div className="w-2/5 self-center">
          <img src={logo} alt="MovieMatch" />
        </div>
        <div className="user-bar w-3/5 self-center text-right">
          <h1>My Stuff</h1>
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
              <li>Runtime: {movieData.movieData.data.movie.runtime} Minutes</li>
            </ul>
          ) : (
            <img src={moviePoster} alt="movieName" className="h-full" />
          )}
        </div>

        <p className="poster-notice text-center text-xs text-gray-500">
          Click the poster for details
        </p>
        <div className="choices w-full pt-10 text-5xl grid grid-cols-2 grid-rows-1 grid-flow-row justify-items-center text-center place-content-center">
          <div
            className="dislike-btn text-red-400 self-center"
            onClick={() => {
              sendMovie('dislike');
              forceUpdate();
            }}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
          <div
            className="like-btn text-green-600"
            onClick={() => {
              sendMovie('like');
              forceUpdate();
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
