import express from 'express';
import movieController from '../../controllers/movieController';

const app = express();

// GET request for movie details and data
app.get('/random/', movieController.getMovieDetails);

export default app;
