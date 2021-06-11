import express from 'express';
import movieData from './movieData';

// const express = require('express');
// import passport from 'passport';
// const authenticate = require('./authenticate');

const app = express();

app.get('/', (req, res) => res.json({
  message: 'Testing',
}));

app.use('/movie/', movieData);

// router.use('/auth', authenticate);
// router.use('/posts', passport.authenticate('jwt', { session: false }), posts);
// router.use('/test', passport.authenticate('jwt', { session: false }), test);

export default app;
