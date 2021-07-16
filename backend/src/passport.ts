/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import passport from 'passport';
import GitHubStrategy from 'passport-github';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/userModel';

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    // todo: need to use the below to go through the already made user model/schema.
    // todo: the below code block doesn't actually work and need to flesh it out to get it to work
    // todo: how I want it to.
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      User.findOne({ githubID: profile.id }, async function (err: any, user: any) {
        if (!user) {
          const newUser = await User.create({
            githubID: profile.id,
          });
          return cb(null, newUser);
        }
        return cb(err, user);
      });
    },
  ),
);

// todo: Need to find a way to use Github authentication with JWT so that I can store it in that
// todo: rather than in a cookie session.
// const jwtOptions = {
//   jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
//   secretOrKey: 'TOP_SECRET',
// };

// passport.use(
//   new JWTstrategy(jwtOptions, function (jwtPayload, done) {
//     User.findOne({ id: jwtPayload.id }, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );

passport.serializeUser(function (user: any, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id: any, cb) {
  cb(null, id);
});