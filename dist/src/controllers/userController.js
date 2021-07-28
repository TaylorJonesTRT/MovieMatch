"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const showLikedMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedJWT = jsonwebtoken_1.default.decode(req.headers['x-access-token']);
    // eslint-disable-next-line radix
    const userId = parseInt(decodedJWT.id);
    const activeUser = yield userModel_1.default.findOne({ githubID: userId }, (err, user) => {
        if (err) {
            return next(err);
        }
        return user;
    });
    console.log(activeUser.likedMovies);
    res.json({
        likedMovies: activeUser.likedMovies,
    });
});
const saveMovie = [
    // Validating and sanitization of data
    express_validator_1.body('movieTitle', 'Movie title must not be empty').trim().escape(),
    express_validator_1.body('movieRunTime', 'how long is this movie?').trim().escape(),
    express_validator_1.body('movieId', 'dont forget the movie id').trim().escape(),
    express_validator_1.body('liked', 'is the movie liked or disliked?').trim().escape(),
    // Processing the request after validation and sanitization
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from the request
        const errors = express_validator_1.validationResult(req);
        const decodedJWT = jsonwebtoken_1.default.decode(req.headers['x-access-token']);
        // eslint-disable-next-line radix
        const userId = parseInt(decodedJWT.id);
        const activeUser = yield userModel_1.default.findOne({ githubID: userId }, (err, user) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            return user;
        });
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
            }
            else {
                activeUser.save((err) => {
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
        }
        else if (req.body.liked === 'disliked') {
            activeUser.dislikedMovies.push(movie);
            if (!errors.isEmpty()) {
                console.log(errors);
                res.json({
                    errors,
                });
            }
            else {
                activeUser.save((err) => {
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
    }),
];
const deleteMovie = [
    // Validating and sanitization of data
    express_validator_1.body('movieId', "don't forget the movie id").trim().escape(),
    // Processing the request after validation and sanitization
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from the request
        const errors = express_validator_1.validationResult(req);
        const decodedJWT = jsonwebtoken_1.default.decode(req.headers['x-access-token']);
        // eslint-disable-next-line radix
        const userId = parseInt(decodedJWT.id);
        const activeUser = yield userModel_1.default.findOne({ githubID: userId }, (err, user) => {
            if (err) {
                return next(err);
            }
            return user;
        });
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.json({
                errors,
            });
        }
        activeUser.likedMovies = activeUser.likedMovies.filter((movie) => movie.movieId !== req.body.movieId);
        activeUser.save((err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            // console.log(activeUser.likedMovies);
            return res.json({
                message: 'Movie removed',
            });
        });
    }),
];
exports.default = { showLikedMovies, saveMovie, deleteMovie };
