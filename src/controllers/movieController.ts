import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// This function is used to retry the fetching of the movie details if the data
// that is returned back to the app is not suitable (an adult movie or a movie with no poseter)
// each attempt utilizes a backoff method so that the api isn't hit right after a failure
function waitFor(millSeconds: any): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, millSeconds);
  });
}

// Processes the data that is returned by the TMDB API and makes sure that a movie is actually
// returned, that a movie is not an adult movie, and that it has a poster to show.
const fetchRandomMovie = async (
  options: any,
  n: number,
  token: any,
): Promise<any> => {
  try {
    const latestMovieID = await fetch(
      `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}`,
    )
      .then((data) => data.json())
      .then((movieData) => movieData.id);
    const randomMovieID = Math.floor(Math.random() * latestMovieID);
    const randomMovieSelection = await fetch(
      `https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.TMDB_API_KEY}`,
    ).then((data) => data.json());

    const jwtToken: any = jwt.decode(token);
    const userId = parseInt(jwtToken.id);
    const activeUser = await User.findOne(
      { githubID: userId },
      (err: any, user: any) => {
        if (err) {
          console.log(err);
          throw Error(err);
        }
        return user;
      },
    );

    const alreadySaved = await activeUser.likedMovies.some(
      (movie: any) => randomMovieSelection.id === movie.id,
    );

    if (alreadySaved) {
      console.log('Movie already liked or disliked, refetching');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n - 1, token);
    }

    if (randomMovieSelection.status_code === 34) {
      console.log('404 error, refetching');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n + 1, token);
    }
    if (randomMovieSelection.adult) {
      console.log('Refeteching due to adult movie');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n + 1, token);
    }
    // eslint-disable-next-line max-len
    if (
      randomMovieSelection.poster_path === null ||
      randomMovieSelection.poster_path === undefined
    ) {
      console.log('movie has no poster, skipping');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n + 1, token);
    }

    // Successful movie grab
    return randomMovieSelection;
  } catch (err) {
    if (n === 10) {
      throw Error('All attempts failed');
    }
    await waitFor(100 * n);
    return fetchRandomMovie({}, n + 1, token);
  }
};

// Function for the GET request from the front ends request for a movie
const getMovieDetails = async function (req: any, res: any, next: any) {
  const randomMovieSelection = await fetchRandomMovie(
    {},
    0,
    req.headers['x-access-token'],
  );
  return res.json({
    movie: randomMovieSelection,
  });
};

export default { getMovieDetails };
