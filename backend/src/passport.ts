/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import passport from 'passport';
import GitHubStrategy from 'passport-github';
import JWTStrtegy from 'passport-jwt';
import User from './models/userModel';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/api/auth/github/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      User.findOne({ githubID: profile.id }, async function (err: any, user: any) {
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
          return cb(null, newUser);
        }
        // User already in database, logging in.
        return cb(null, user);
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
  cb(null, user);
});
passport.deserializeUser(function (user: any, cb) {
  cb(null, user);
});