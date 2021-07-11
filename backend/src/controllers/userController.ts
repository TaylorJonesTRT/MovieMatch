import { body, validationRequest } from 'express-validator';
import Movie from '../models/movieModel';

exports.showLikedMovies = function (req, res, next) {
  // Not implemented yet
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
    const errors = validationRequest(req);

    // Add the movie to to the correct section (liked/disliked)

    // Adding movie to the liked section
    if (req.body.liked === true) {
      const movie = new Movie({
        title: req.body.movieTitle,
        description: req.body.movieDescription,
        runTime: req.body.movieRunTime,
        liked: req.body.liked,
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
