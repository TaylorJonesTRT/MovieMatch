/* eslint-disable no-unused-vars */
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import middleware from '../../middlewares'

const app = express.Router();

app.get('/', (req, res, next) => res.json({
  message: 'help',
}));

app.get('/error/', (req, res, next) => res.json({
  message: 'Unknown Error',
}));

app.get('/github/', passport.authenticate('github'));
app.get('/github/callback/', passport.authenticate('github', { failureRedirect: 'http://localhost:3000' }), (req, res) => {
  res.redirect('http://localhost:3000');
});

app.get('/getuser', middleware.isAuthenticated);

app.get('logout', (req, res, next) => {
  req.logout();
});

export default app;
