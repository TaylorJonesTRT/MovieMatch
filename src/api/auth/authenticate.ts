/* eslint-disable no-unused-vars */
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import middleware from '../../middlewares';
import authController from '../../controllers/authController';

const app = express.Router();

app.get('/github/', passport.authenticate('github'));
app.get('/github/callback/', authController.githubAuth);

app.get('logout', authController.logout);

export default app;
