/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { body, validationResult } from 'express-validator';
import Movie from '../models/movieModel';

exports.showLikedMovies = function (req, res:any , next: any) {
  // todo: need to figure out a way to make it return only liked movies and not every single movie
  const user = req.body.username;

  Movie.find({}, 'title description runTime')
    .exec(function (err: any, listMovies: any) {
      if (err) return next(err);
      res.json({
        movies: {
          listMovies,
        },
      });
    });
};

exports.saveMovie = [
  // Validating and sanitization of data
  body('movieTitle', 'Movie title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('movieDescription').trim().isLength({ min: 0 }).escape(),
  body('movieRunTime').trim().isLength({ min: 0 }).escape(),
  body('liked').escape().toBoolean(),

  // Processing the request after validation and sanitization
  (req: any, res: any, next: any) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    // Creating a new movie in the database for the user, if errors throwing errors instead.
    if (req.body.liked === true) {
      const movie = new Movie({
        title: req.body.movieTitle,
        description: req.body.movieDescription,
        runTime: req.body.movieRunTime,
        liked: req.body.liked,
        belongsTo: req.body.username,
      });
      if (!errors.isEmpty()) {
        res.json({
          errors,
        });
      } else {
        movie.save((err: any) => {
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
