/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
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
  const [reload, setReload] = useState(0);

  // This hook is being used to grab the movie data from the backend api and to set that data into
  // its correct state instance. Also changing state of loading to display the movie data rather
  // than the information that is loaded when loading is set to true.
  useEffect(() => {
    setLoading(true);
    const fetchMovieDetails = async (): Promise<any> => {
      const movie = await axios({
        method: 'GET',
        url: 'https://movie-match-mern.herokuapp.com/api/movie/random',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
        },
      }).then((data) => data);
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
    const verifyAuth = async () => {
      const token = await cookies.get('token');
      if (token == null) {
        localStorage.removeItem('token');
        return setIsLoggedIn(false);
      }
      localStorage.setItem('token', token);
      return setIsLoggedIn(true);
    };
    verifyAuth();
  }, [reload]);

  const handleGitHubLogin = (event: any) => {
    event.preventDefault();
    window.open('https://movie-match-mern.herokuapp.com/api/auth/github');
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
        url: 'https://movie-match-mern.herokuapp.com/api/user/save-movie/',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
          'content-type': 'application/json',
        },
        data: {
          movieTitle: movieData.movieData.data.movie.original_title,
          movieRunTime: movieData.movieData.data.movie.runtime,
          movieId: movieData.movieData.data.movie.id,
          liked: 'disliked',
        },
      });
      setReload(reload + 1);
    }
    if (choice === 'like') {
      axios({
        method: 'POST',
        url: 'https://movie-match-mern.herokuapp.com/api/user/save-movie/',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
          'content-type': 'application/json',
        },
        data: {
          movieTitle: movieData.movieData.data.movie.original_title,
          movieRunTime: movieData.movieData.data.movie.runtime,
          movieId: movieData.movieData.data.movie.id,
          liked: 'liked',
        },
      });
      setReload(reload + 1);
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
        <header className="w-full h-1/6 flex flex-row content-center p-2.5 md:pl-16 md:pr-16 lg:pl-16 lg:pr-16 lg-laptop:w-4/5 lg-laptop:m-auto">
          <div className="w-2/5 self-center md:w-2/6 lg-laptop:w-96 4k:w-5/6">
            <a href="https://movie-match-mern.herokuapp.com/">
              <img src={logo} alt="MovieMatch" />
            </a>
          </div>
          <div className="user-bar w-3/5 self-center text-right lg:text-2xl lg-laptop:text-3xl 4k:text-6xl">
            <h1>
              <a href="/my-stuff">My Stuff</a>
            </h1>
          </div>
        </header>

        <div className="content w-full h-5/6">
          <div
            className="movie-card bg-opacity-0 w-60 h-96 flex flex-col justify-center p-2 shadow-2xl m-auto overflow-clip ring-2 ring-gray-300 md:w-72 md:h-4/6 lg:w-96 lg-laptop:w-2/6"
            onClick={flipCard}
          >
            <h1 className="text-center animate-pulse lg:text-xl lg-laptop:text-2xl 4k:text-5xl">
              Loading Movie
            </h1>
          </div>

          <p className="poster-notice text-center text-xs text-gray-500">
            Click the poster for details
          </p>
          <div className="choices w-1/2 pt-10 text-5xl grid grid-cols-2 gap-36 grid-rows-1 grid-flow-row justify-items-center text-center place-content-center justify-center m-auto md:w-2/6">
            <div
              className="dislike-btn text-red-400 self-center lg:text-6xl lg-laptop:text-7xl 4k:text-9xl"
              data-name="dislike"
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </div>
            <div
              className="like-btn text-green-600 self-center lg:text-6xl lg-laptop:text-7xl 4k:text-9xl"
              key="like"
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <header className="w-full h-1/6 flex flex-row content-center p-2.5 md:pl-16 md:pr-16 lg:pl-16 lg:pr-16 lg-laptop:w-4/5 lg-laptop:m-auto">
        <div className="w-2/5 self-center md:w-2/6 lg-laptop:w-96 4k:w-5/6">
          <a href="https://movie-match-mern.herokuapp.com/">
            <img src={logo} alt="MovieMatch" />
          </a>
        </div>
        <div className="user-bar w-3/5 self-center text-right lg:text-2xl lg-laptop:text-3xl 4k:text-6xl">
          <h1>
            <a href="/my-stuff">My Stuff</a>
          </h1>
        </div>
      </header>

      <div className="content w-full h-5/6">
        <div
          className="movie-card bg-opacity-0 w-60 h-96 flex flex-col justify-center p-2 shadow-2xl m-auto overflow-clip ring-2 ring-gray-300 md:w-72 md:h-4/6 lg:w-96 lg-laptop:w-2/6"
          onClick={flipCard}
        >
          {showDetails ? (
            <ul>
              <li className="pl-2 pr-2 pb-1 lg:text-2xl lg-laptop:text-3xl lg-laptop:pb-2 4k:text-6xl 4k:pb-4">
                {movieData.movieData.data.movie.original_title}
              </li>
              <li className="text-xs pl-2 pr-2 lg:text-base lg-laptop:text-xl 4k:text-4xl">
                {movieData.movieData.data.movie.overview}
              </li>
              <li className="pl-2 pr-2 pt-1 lg:text-2xl lg-laptop:text-3xl lg-laptop:pt-2 4k:text-6xl 4k:pt-4">
                Runtime: {movieData.movieData.data.movie.runtime} Minutes
              </li>
            </ul>
          ) : (
            <img src={moviePoster} alt="movieName" className="h-full" />
          )}
        </div>

        <p className="poster-notice text-center text-xs text-gray-500 lg:text-sm lg-laptop:text-xl 4k:text-4xl">
          Click the poster for details
        </p>
        <div className="choices w-1/2 pt-10 text-5xl grid grid-cols-2 gap-36 grid-rows-1 grid-flow-row justify-items-center text-center place-content-center justify-center m-auto md:w-2/6">
          <div
            className="dislike-btn text-red-400 self-center lg:text-6xl lg-laptop:text-7xl 4k:text-9xl"
            onClick={() => {
              sendMovie('dislike');
            }}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
          <div
            className="like-btn text-green-600 self-center lg:text-6xl lg-laptop:text-7xl 4k:text-9xl"
            onClick={() => {
              sendMovie('like');
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
