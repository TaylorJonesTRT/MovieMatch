import express from 'express';
import userController from '../controllers/userController';

const app = express();

app.get('/user/liked-movies', userController.showLikedMovies);

app.post('/user/like-movie', userController.saveMovie);
app.post('/user/dislike-movie', userController.saveMovie);

export default app;
