import fetch from 'node-fetch';

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

const fetchRandomMovie = async (options: any, n: number): Promise<any> => {
  try {
    const latestMovieID = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}`)
      .then((data) => data.json())
      .then((movieData) => movieData.id);
    const randomMovieID = Math.floor(Math.random() * latestMovieID);
    const randomMovieSelection = await fetch(`https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.TMDB_API_KEY}`)
      .then((data) => data.json());

    if (randomMovieSelection.status_code === 34) {
      console.log('404 error, refetching');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n - 1);
    }
    if (randomMovieSelection.adult) {
      console.log('Refeteching due to adult movie');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n - 1);
    }
    // eslint-disable-next-line max-len
    if (randomMovieSelection.poster_path === null || randomMovieSelection.poster_path === undefined) {
      console.log('movie has no poster, skipping');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n - 1);
    }

    // Successful movie grab
    return randomMovieSelection;
  } catch (err) {
    if (n === 1) {
      throw err('All attempts failed');
    }
    await waitFor(100 * n);
    return fetchRandomMovie({}, n - 1);
  }
};

const getMovieDetails = async function (req: any, res: any, next: any) {
  const randomMovieSelection = await fetchRandomMovie({}, 5);
  return res.json({
    movie: randomMovieSelection,
  });
};

export default { getMovieDetails };
