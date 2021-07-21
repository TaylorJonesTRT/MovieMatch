import express from 'express';
import passport from 'passport';
import authenticate from './auth/authenticate';
import movieData from './movie/movieData';
import userRoutes from './user/user';

const app = express();

app.get('/', (req, res) => res.json({
  message: 'Testing',
}));

app.use('/movie/', movieData);

app.use('/auth/', authenticate);
app.use('/user/', userRoutes);
// router.use('/posts', passport.authenticate('jwt', { session: false }), posts);
// router.use('/test', passport.authenticate('jwt', { session: false }), test);

export default app;
