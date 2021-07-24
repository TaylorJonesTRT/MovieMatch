/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const showLikedMovies = async (req: any, res: any, next: any) => {
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
    },
  );
  console.log(activeUser.likedMovies);
  res.json({
    likedMovies: activeUser.likedMovies,
  });
};

const saveMovie = [
  // Validating and sanitization of data
  body('movieTitle', 'Movie title must not be empty').trim().escape(),
  body('movieRunTime', 'how long is this movie?').trim().escape(),
  body('movieId', 'dont forget the movie id').trim().escape(),
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
          console.log(err);
          return next(err);
        }
        return user;
      },
    );
    const movie = {
      title: req.body.movieTitle,
      runTime: req.body.movieRunTime,
      movieId: req.body.movieId,
    };

    // Creating a new movie in the database for the user, if errors throwing errors instead.
    if (req.body.liked === 'liked') {
      activeUser.likedMovies.push(movie);
      if (!errors.isEmpty()) {
        console.log(errors);
        res.json({
          errors,
        });
      } else {
        activeUser.save((err: any) => {
          if (err) {
            console.log(err);
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
        console.log(errors);
        res.json({
          errors,
        });
      } else {
        activeUser.save((err: any) => {
          console.log(err);
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

const deleteMovie = [
  // Validating and sanitization of data
  body('movieId', "don't forget the movie id").trim().escape(),

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
      },
    );

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.json({
        errors,
      });
    }
    activeUser.likedMovies = activeUser.likedMovies.filter(
      (movie: any) => movie.movieId !== req.body.movieId,
    );
    activeUser.save((err: any) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      // console.log(activeUser.likedMovies);
      return res.json({
        message: 'Movie removed',
      });
    });
  },
];

export default { showLikedMovies, saveMovie, deleteMovie };
