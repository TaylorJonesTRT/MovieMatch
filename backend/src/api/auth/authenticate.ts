/* eslint-disable no-unused-vars */
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => res.json({
  message: 'help',
}));

router.get('/error/', (req, res, next) => res.json({
  message: 'Unknown Error',
}));

router.get('/github/', passport.authenticate('github'));
router.get('/github/callback/', passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
  res.json({
    message: 'logged in',
    user: req.user,
  });
});

export default router;
