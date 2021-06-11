import fetch from 'node-fetch';

// Comment goes here to describe the below 2 functions

function waitFor(millSeconds: any): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, millSeconds);
  });
}

// const fetchRandomMovie = async (url: any, options: any, n: number): Promise<any> => {
//   try {
//     const randomMovie = await fetch(url, options)
//       .then((randomMovieData) => randomMovieData.json());
//     if (randomMovie.adult) {
//       console.log(randomMovie);
//       console.log('Refetching as adult movie');
//       await waitFor(1000 * n);
//       return fetchRandomMovie(url, options, n - 1);
//     }
//     return randomMovie;
//   } catch (err) {
//     if (n === 1) {
//       throw err;
//     }

//     await waitFor(1000 * n);
//     return fetchRandomMovie(url, options, n - 1);
//   }
// };

const fetchRandomMovie = async (options: any, n: number): Promise<any> => {
  try {
    const latestMovieID = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}`)
      .then((data) => data.json())
      .then((movieData) => movieData.id)
    const randomMovieID = Math.floor(Math.random() * latestMovieID);
    const randomMovieSelection = await fetch(`https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.TMDB_API_KEY}`)
      .then((data) => data.json());

    if (!randomMovieSelection.ok) {
      console.log('404 error, refetching');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n - 1);
    }

    if (randomMovieSelection.adult) {
      console.log('Refeteching due to adult movie');
      await waitFor(100 * n);
      return fetchRandomMovie({}, n - 1);
    }
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
    randomMovieSelection,
  });
};

export default { getMovieDetails, fetchRandomMovie };
