import express from 'express';
import userController from '../../controllers/userController';

const app = express();

// Route to acquire all liked movies by a user to display them all.
app.get('/liked-movies/', userController.showLikedMovies);

// Both liked and disliked movies POST requests will be sent through here and will be seperatred
// into their proper locations by and if statement.
app.post('/save-movie/', userController.saveMovie);

// Removing a movie from the likedMovies array on the users model in mongoose
app.post('/delete-movie', userController.deleteMovie);

export default app;
