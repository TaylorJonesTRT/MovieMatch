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
app.get('/github/callback/', (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/error' }, (err, user, info) => {
    try {
      if (err || !user) {
        return next(err);
      }
      req.login(user, { session: false }, (error) => {
        if (error) return next(error);

        const body = { id: user.githubID };
        const token = jwt.sign({ id: user.githubID }, process.env.JWT_SECRET!);

        return res.json({
          message: 'Logged in',
          body,
          token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

app.get('logout', (req, res, next) => {
  req.logout();
});

export default app;
