import fetch from 'node-fetch';

const fetchRandomMovie = async function (req: any, res: any, next: any) {
  const latestMovieID = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}`)
    .then((data) => data.json())
    .then((movieData) => movieData.id);
  // const latestMovieData = await latestMovie.json();
  // const latestMovieID = latestMovieData.id;

  const randomMovieID = Math.floor(Math.random() * latestMovieID);
  const randomMovieSelection = await fetch(`https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.TMDB_API_KEY}`)
    .then((randomMovieData) => randomMovieData.json());

  return res.json({
    randomMovieSelection,
  });
};

export default { fetchRandomMovie };
