import fetch from 'node-fetch';

function waitFor(millSeconds: any): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, millSeconds);
  });
}

const fetchRetry = async (url: any, options: any, n: number): Promise<any> => {
  try {
    const randomMovie = await fetch(url, options)
      .then((randomMovieData) => randomMovieData.json());
    if (randomMovie.adult) {
      console.log('Refetching as adult movie');
      await waitFor(1000);
      return fetchRetry(url, options, n - 1);
    }
    return await fetch(url, options);
  } catch (err) {
    if (n === 1) throw err;
    await waitFor(1000);
    return fetchRetry(url, options, n - 1);
  }
};

const fetchRandomMovie = async function (req: any, res: any, next: any) {
  const latestMovieID = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}`)
    .then((data) => data.json())
    .then((movieData) => movieData.id);
  // const latestMovieData = await latestMovie.json();
  // const latestMovieID = latestMovieData.id;

  const randomMovieID = Math.floor(Math.random() * latestMovieID);
  const randomMovieSelection = await fetchRetry(`https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.TMDB_API_KEY}`, {}, 5)
    .then((randomMovieData) => randomMovieData.json());

  if (randomMovieSelection.adult === true) {
    return res.json({
      message: 'is an adult movie',
    });
  }
  return res.json({
    randomMovieSelection,
  });
};

export default { fetchRandomMovie };
