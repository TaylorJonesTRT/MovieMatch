/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import logo from '../static/images/logo.png';

const cookies = new Cookies();

const MyStuff = () => {
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

  const logout = () => {
    cookies.remove('token');
    localStorage.removeItem('token');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    return false;
  };

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <header className="w-full h-1/6 flex flex-row content-center p-2.5">
        <div className="w-2/5 self-center">
          <a href="http://localhost:3000">
            <img src={logo} alt="MovieMatch" />
          </a>
        </div>
        <div className="user-bar w-3/5 self-center text-right">
          <h1>
            <button onClick={logout}>Logout</button>
          </h1>
        </div>
      </header>

      <div className="content w-full h-5/6">
        <h1>My Stuff</h1>
      </div>
    </div>
  );
};

export default MyStuff;
