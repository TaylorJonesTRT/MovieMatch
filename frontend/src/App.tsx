import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchMovie = async () => {
			const movie = await fetch(
				'https://api.themoviedb.org/3/movie/latest?api_key=77361ec1e5766470409b32417bc7594b&language=en-US'
			);
			const data = await movie.json();
			setData(data);
		};
		fetchMovie();
	});

	return (
		<div className="App">
			<h1>hi</h1>
		</div>
	);
}

export default App;
