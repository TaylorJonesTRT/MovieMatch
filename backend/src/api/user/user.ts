import express from 'express';

const userController = require('../../controllers/userController');

const app = express();

// app.get('/', (req, res) => {
// 	res.json({
// 		message: 'testing, help me',
// 	})
// });
// app.get('/user/liked-movies', userController.showLikedMovies);

// Both liked and disliked movies POST requests will be sent through here and will be seperatred
// into their proper locations by and if statement.
app.post('/save-movie/', userController.saveMovie);

export default app;
