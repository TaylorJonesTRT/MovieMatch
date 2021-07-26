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
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// This function is used to retry the fetching of the movie details if the data
// that is returned back to the app is not suitable (an adult movie or a movie with no poseter)
// each attempt utilizes a backoff method so that the api isn't hit right after a failure
function waitFor(millSeconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millSeconds);
    });
}
// Processes the data that is returned by the TMDB API and makes sure that a movie is actually
// returned, that a movie is not an adult movie, and that it has a poster to show.
const fetchRandomMovie = (options, n, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestMovieID = yield node_fetch_1.default(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}`)
            .then((data) => data.json())
            .then((movieData) => movieData.id);
        const randomMovieID = Math.floor(Math.random() * latestMovieID);
        const randomMovieSelection = yield node_fetch_1.default(`https://api.themoviedb.org/3/movie/${randomMovieID}?api_key=${process.env.TMDB_API_KEY}`).then((data) => data.json());
        const jwtToken = jsonwebtoken_1.default.decode(token);
        const userId = parseInt(jwtToken.id);
        const activeUser = yield userModel_1.default.findOne({ githubID: userId }, (err, user) => {
            if (err) {
                console.log(err);
                throw Error(err);
            }
            return user;
        });
        const alreadySaved = yield activeUser.likedMovies.some((movie) => randomMovieSelection.id === movie.id);
        if (alreadySaved) {
            console.log('Movie already liked or disliked, refetching');
            yield waitFor(100 * n);
            return fetchRandomMovie({}, n - 1, token);
        }
        if (randomMovieSelection.status_code === 34) {
            console.log('404 error, refetching');
            yield waitFor(100 * n);
            return fetchRandomMovie({}, n + 1, token);
        }
        if (randomMovieSelection.adult) {
            console.log('Refeteching due to adult movie');
            yield waitFor(100 * n);
            return fetchRandomMovie({}, n + 1, token);
        }
        // eslint-disable-next-line max-len
        if (randomMovieSelection.poster_path === null ||
            randomMovieSelection.poster_path === undefined) {
            console.log('movie has no poster, skipping');
            yield waitFor(100 * n);
            return fetchRandomMovie({}, n + 1, token);
        }
        // Successful movie grab
        return randomMovieSelection;
    }
    catch (err) {
        if (n === 10) {
            throw Error('All attempts failed');
        }
        yield waitFor(100 * n);
        return fetchRandomMovie({}, n + 1, token);
    }
});
// Function for the GET request from the front ends request for a movie
const getMovieDetails = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const randomMovieSelection = yield fetchRandomMovie({}, 0, req.headers['x-access-token']);
        return res.json({
            movie: randomMovieSelection,
        });
    });
};
exports.default = { getMovieDetails };
