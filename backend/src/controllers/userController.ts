/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const showLikedMovies = async function (req: any, res: any, next: any) {
  const user = await User.findById(req.body.userID);
  res.json({
    likedMovies: user.likedMovies,
  });
};

const saveMovie = [
  // Validating and sanitization of data
  body('movieTitle', 'Movie title must not be empty').trim().escape(),
  body('movieDescription', 'what is the movie about?').trim().escape(),
  body('movieRunTime', 'how long is this movie?').trim().escape(),
  body('movieID', "don't forget the movie id").trim().escape(),
  body('liked', 'is the movie liked or disliked?').trim().escape(),

  // Processing the request after validation and sanitization
  async (req: any, res: any, next: any) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    const decodedJWT: any = jwt.decode(req.headers['x-access-token']);
    // eslint-disable-next-line radix
    const userId = parseInt(decodedJWT.id);
    const activeUser = await User.findOne(
      { githubID: userId },
      (err: any, user: any) => {
        if (err) {
          return next(err);
        }
        return user;
      }
    );
    const movie = {
      title: req.body.movieTitle,
      desc: req.body.movieDescription,
      runTime: req.body.movieRunTime,
      id: req.body.movieID,
    };

    // Creating a new movie in the database for the user, if errors throwing errors instead.
    if (req.body.liked === 'liked') {
      activeUser.likedMovies.push(movie);
      if (!errors.isEmpty()) {
        res.json({
          errors,
        });
      } else {
        activeUser.save((err: any) => {
          if (err) {
            return next(err);
          }
          return res.json({
            message: 'Movie added to list',
            movie,
          });
        });
      }
    } else if (req.body.liked === 'disliked') {
      activeUser.dislikedMovies.push(movie);
      if (!errors.isEmpty()) {
        res.json({
          errors,
        });
      } else {
        activeUser.save((err: any) => {
          if (err) {
            return next(err);
          }
          return res.json({
            message: 'Movie added to list',
            movie,
          });
        });
      }
    }
  },
];

export default { showLikedMovies, saveMovie };