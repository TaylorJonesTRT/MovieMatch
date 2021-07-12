/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { body, validationResult } from 'express-validator';
import async from 'async';
import Movie from '../models/movieModel';
import User from '../models/userModel';

exports.showLikedMovies = async function (req: any, res: any , next: any) {
  // todo: need to figure out a way to make it return only liked movies and not every single movie
  const user = await User.findById(req.body.userID);

  // todo: not sure if i am on the right track with the below, need to refactor some more
  // async.parallel({
  //   user: function (callback) {
  //     User.findById(req.params.id)
  //       .exec(callback);
  //   },
  //   likedMovies: function (callback) {
  //     User.get('likedMovies')
  //       .exec(callback);
  //   },
  // });

  // User.find({}, 'title description runTime')
  //   .exec(function (err: any, listMovies: any) {
  //     if (err) return next(err);
  //     res.json({
  //       movies: {
  //         listMovies,
  //       },
  //     });
  //   });
};

exports.saveMovie = [
  // Validating and sanitization of data
  body('movieTitle', 'Movie title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('movieDescription').trim().isLength({ min: 0 }).escape(),
  body('movieRunTime').trim().isLength({ min: 0 }).escape(),

  // Processing the request after validation and sanitization
  (req: any, res: any, next: any) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    const user = User.findById(req.body.userID);
    const movie = {
      title: req.body.movieTitle,
      desc: req.body.movieDescription,
      runTime: req.body.movieRunTime,
    };

    // Creating a new movie in the database for the user, if errors throwing errors instead.
    if (req.body.liked === true) {
      user.likedMovies = [...user.likedMovies, movie];
      if (!errors.isEmpty()) {
        res.json({
          errors,
        });
      } else {
        user.save((err: any) => {
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
