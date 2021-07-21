import express from 'express';

const userController = require('../../controllers/userController');

const app = express();

app.get('/', (req, res) => {
	res.json({
		message: 'testing, help me',
	})
});
// app.get('/user/liked-movies', userController.showLikedMovies);

// Both RESTful requests below will use the same function since the request will
// show if the movie was liked or disliked and use conditionals to decide where to put them
app.post('/save-movie/', userController.saveMovie);
// app.post('/user/dislike-movie', userController.saveMovie);

export default app;
