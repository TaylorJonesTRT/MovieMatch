/* eslint-disable no-unused-vars */
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const app = express.Router();

app.get('/', (req, res, next) => res.json({
  message: 'help',
}));

app.get('/error/', (req, res, next) => res.json({
  message: 'Unknown Error',
}));

app.get('/github/', passport.authenticate('github'));
app.get('/github/callback/', passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
  res.json({
    message: 'logged in',
    user: req.user,
  });
});

app.get('logout', (req, res, next) => {
  req.logout();
});

export default app;
