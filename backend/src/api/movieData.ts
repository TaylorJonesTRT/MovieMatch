import express from 'express';
import movieController from '../controllers/movieController';

const app = express();

app.get('/latest-movie', movieController.fetchRandomMovie);

export default app;
