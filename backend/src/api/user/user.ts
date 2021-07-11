import express from 'express';
import userController from '../controllers/userController';

const app = express();

app.get('/user/liked-movies', userController.getUserLikedMovies);

app.post('/user/like-movie', userController.addLikedMovie);
app.post('/user/dislike-movie', userController.addDislikedMovie);

export default app;
