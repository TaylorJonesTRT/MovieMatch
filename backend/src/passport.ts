import passport from 'passport';
import GitHubStrategy from 'passport-github';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';

passport.use(
	new GitHubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOrCreate({ githubId: profile.id }, function (err, user) {
				return cb(err, user);
			});
		}
	)
);

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
		},
		async (username, password, done) => {
			try {
				const user = await User.findOne({ username });

				if (!user) {
					return done(null, false, { message: 'User not found' });
				}

				const validate = await bcrypt.compare(password, user.password);

				if (!validate) {
					return done(null, false, { message: 'Wrong Password' });
				}

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(error);
			}
		}
	)
);

const jwtOptions = {
	jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
	secretOrKey: 'TOP_SECRET',
};

passport.use(
	new JWTstrategy(jwtOptions, function (jwtPayload, done) {
		User.findOne({ id: jwtPayload.id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);
