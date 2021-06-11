import express from 'express';
import movieController from '../controllers/movieController';

const app = express();

app.get('/latest-movie', movieController.getMovieDetails);

export default app;
