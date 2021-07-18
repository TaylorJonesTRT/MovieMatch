/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import passport from 'passport';
import passportGitHub from 'passport-github';
import passportJWT from 'passport-jwt';
import User from './models/userModel';

const GitHubStrategy = passportGitHub.Strategy;
const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.serializeUser(function (user: any, cb) {
  cb(null, user);
});
passport.deserializeUser(function (user: any, cb) {
  cb(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/api/auth/github/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      User.findOne(
        { githubID: profile.id },
        async function (err: any, user: any) {
          if (err) {
            return cb(err, null);
          }
          // If new user, creating an instance of them in the database and then logging in.
          if (!user) {
            const newUser = await User.create({
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
        },
      );
    },
  ),
);

// todo: Need to find a way to use Github authentication with JWT so that I can store it in that
// todo: rather than in a cookie session.
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
  secretOrKey: 'TOP_SECRET',
  issuer: 'Github',
  audience: 'MovieMatch',
};

passport.use(
  new JWTStrategy(jwtOptions, function (jwtPayload: any, done: any) {
    User.findOne({ id: jwtPayload.id }, function (err: any, user: any) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }),
);
