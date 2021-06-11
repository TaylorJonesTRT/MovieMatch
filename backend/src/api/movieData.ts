import express from 'express';
import movieController from '../controllers/movieController';

const app = express();

app.get('/random/', movieController.getMovieDetails);

export default app;
