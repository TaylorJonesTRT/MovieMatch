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

          <div className="content">
            <div className="movie-card">
              <img src={moviePoster} alt="movieName" />
            </div>
            <div className="choices">
              <div className="dislike-btn w-full text-center bg-red-400">D</div>
              <div className="like-btn w-full text-center bg-green-400">L</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
