import React, { useState, useEffect } from 'react';
import { moveEmitHelpers } from 'typescript';
import './App.css';

function App() {
	const [randomMovieData, setRandomMovieData] = useState([]);
	const [latestMovieID, setLatestMovieID] = useState();

	useEffect(() => {
		const fetchLatestMovie = async () => {
			const movie = await fetch(
				'https://api.themoviedb.org/3/movie/latest?api_key=' +
					process.env.REACT_APP_API_KEY
			);
			const data = await movie.json();
			setLatestMovieID(data.id);
		};
		fetchLatestMovie();
	});

	useEffect(() => {
		const fetchRandomMovie = async () => {
			const randomMovieID = Math.floor(Math.random() * latestMovieID!);
			const randomMovie = await fetch(
				`https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);
			const data = await randomMovie.json();
			setRandomMovieData(data);
		};
		fetchRandomMovie();
	}, [latestMovieID]);

	return (
		<div className="App">
			<h1>hi</h1>
		</div>
	);
}

export default App;
