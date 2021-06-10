/* eslint-disable no-unused-vars */
import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import passport from 'passport';

const router = express.Router();

router.get('/', async (req, res, next) => res.json({
  message: 'testing',
}));

export default router;
