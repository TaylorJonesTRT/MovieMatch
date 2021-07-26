/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTicketAlt, FaTrashAlt } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import logo from '../static/images/logo.png';

const cookies = new Cookies();

const MyStuff = () => {
  const [movies, setMovies] = useState([]);

  // This useEffect checks on every re-render if the user has a JWT saved in their cookies
  // or in their localStorage. If not it redirects them to the homepage.
  useEffect(() => {
    const checkIfLoggedIn = () => {
      const token = cookies.get('token');
      if (token === null || localStorage.getItem('token') === null) {
        // eslint-disable-next-line no-restricted-globals
        location.assign('http://localhost:3000');
      }
    };
    checkIfLoggedIn();
  }, []);

  // useEffect to send a GET request to the backend to feth the logged in users saved liked movies
  useEffect(() => {
    const getLikedMovies = async () => {
      const likedMovies = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/user/liked-movies/',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
        },
      });
      setMovies(likedMovies.data.likedMovies);
    };
    getLikedMovies();
  }, []);

  const logout = () => {
    cookies.remove('token');
    localStorage.removeItem('token');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    return false;
  };

  const removeMovie = (id: string) => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/api/user/delete-movie',
      headers: {
        'X-ACCESS-TOKEN': cookies.get('token'),
        'content-type': 'application/json',
      },
      data: {
        movieId: id,
      },
      // eslint-disable-next-line no-restricted-globals
    }).then((res) => location.reload());
  };

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <header className="w-full h-1/6 flex flex-row content-center p-2.5 md:pl-16 lg-laptop:w-5/5 lg-laptop:m-auto">
        <div className="w-2/5 self-center md:w-2/6">
          <a href="http://localhost:3000">
            <img src={logo} alt="MovieMatch" />
          </a>
        </div>
        <div className="user-bar w-3/5 self-center text-right lg:text-2xl lg-laptop:text-3xl 4k:text-6xl">
          <h1>
            <button onClick={logout}>Logout</button>
          </h1>
        </div>
      </header>

      <div className="content w-full h-5/6">
        <div className="saved-movies lg:text-xl lg-laptop:text-3xl 4k:text-5xl">
          {movies.map((movie: any) => (
            <ul
              className="movies grid grid-cols-3 justify-items-center text-center pb-1.5 pt-1 border-b-2 border-gray-200"
              key={movie.movieId}
            >
              <li className="movie-icon">
                <FaTicketAlt />
              </li>
              <li className="movie-title">
                <a
                  href={`https://www.themoviedb.org/movie/${movie.movieId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {movie.title}
                </a>
              </li>
              <li className="delete-icon">
                <button
                  onClick={() => {
                    removeMovie(movie.movieId);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStuff;
