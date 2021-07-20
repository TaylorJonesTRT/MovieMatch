/* eslint-disable no-unused-vars */
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import middleware from '../../middlewares';

const app = express.Router();

app.get('/', (req, res, next) =>
  res.json({
    message: 'help',
  })
);

app.get('/error/', (req, res, next) =>
  res.json({
    message: 'Unknown Error',
  })
);

app.get('/github/', passport.authenticate('github'));
app.get('/github/callback/', (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(err);
        return next(error);
      }

      const token = jwt.sign({ id: user.githubID }, 'TOP_SECRET', {
        expiresIn: '1d',
      });

      req.login(user, { session: false }, (error) => {
        if (error) return next(error);
      });

      res.cookie('token', token);
      res.redirect('http://localhost:3000');
    } catch (error) {
      res.redirect('http://localhost:3000');
      return next(error);
    }
  })(req, res, next);
});

// This route will be used by the frontend to get a new JWT from whenever one is needed.
app.get(
  '/verify',
  middleware.isAuthenticated,
  (req: any, res: any, next: any) => {
    const body = { id: req.user.githubID };
    const token = jwt.sign(
      {
        id: req.user.githubID,
        iat: new Date().getTime() / 1000,
        expiresIn: '1d',
      },
      // eslint-disable-next-line comma-dangle
      process.env.JWT_SECRET!
    );

    return res.json({
      body,
      token,
    });
  }
);

app.get('logout', (req, res, next) => {
  req.logout();
});

export default app;
