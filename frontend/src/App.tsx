/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// This will be used to force an update on the DOM/Components so that if a movie
// is returned with a 404 error or is an Adult film the first useEffect below
// will hit the api again to get a movie that isn't either of the above errors
// function useForceUpdate() {
//   const [, setTick] = useState(0);
//   const update = useCallback(() => {
//     setTick((tick) => tick + 1);
//   }, []);
//   return update;
// }

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
      console.log(movie.movie);
      const poster = `https://www.themoviedb.org/t/p/original${movie.movie.poster_path}`;
      console.log(poster);
      setMovieData(movie.movie);
      setMoviePoster(poster);
      setLoading(false);
    };

    fetchMovieDetails();
  }, []);

  return (
    <div className="App container w-screen h-full">
      {loading ? (
        <div> ...loading... </div>
      ) : (
        <>
          <div className="header grid grid-cols-2 h-16 bg-red-400">
            <h1 className="text-left">MovieMatch</h1>
            <div className="user-bar text-right">
              <h1>test user</h1>
            </div>
          </div>

          <div className="content w-full h-5/6">
            <div className="movie-card w-auto p-1.5">
              <img src={moviePoster} alt="movieName" />
            </div>
            <div className="choices grid grid-cols-2 justify-items-center h-5/6">
              <div className="dislike-btn w-1/2 text-center bg-red-400">D</div>
              <div className="like-btn w-1/2 text-center bg-green-400">L</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
