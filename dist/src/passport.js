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
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const passport_1 = __importDefault(require("passport"));
const passport_github_1 = __importDefault(require("passport-github"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const userModel_1 = __importDefault(require("./models/userModel"));
const GitHubStrategy = passport_github_1.default.Strategy;
const JWTStrategy = passport_jwt_1.default.Strategy;
const { ExtractJwt } = passport_jwt_1.default;
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://mern-moviematch.herokuapp.com/api/auth/github/callback',
}, function (accessToken, refreshToken, profile, cb) {
    const profileIdAsInt = parseInt(profile.id);
    userModel_1.default.findOne({ githubID: profile.id }, function (err, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return cb(err, null);
            }
            // If new user, creating an instance of them in the database and then logging in.
            if (!user) {
                const newUser = yield userModel_1.default.create({
                    _id: profileIdAsInt,
                    githubID: profile.id,
                    likedMovies: [],
                    dislikedMovies: [],
                });
                return cb(null, newUser, {
                    message: 'New user added to database. Loggin in.',
                });
            }
            // User already in database, logging in.
            return cb(null, user, {
                message: 'User found in database, logging in',
            });
        });
    });
}));
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'TOP_SECRET',
    issuer: 'Github',
    audience: 'MovieMatch',
};
passport_1.default.use(new JWTStrategy(jwtOptions, function (jwtPayload, done) {
    userModel_1.default.findOne({ githubID: jwtPayload.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    });
}));
