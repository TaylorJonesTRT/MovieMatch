import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/userModel';

const githubAuth = (req: any, res: any, next: any) => {
  passport.authenticate('github', (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(err);
        return next(error);
      }

      const token = jwt.sign({ id: user.githubID }, 'TOP_SECRET', {
        expiresIn: '1d',
      });

      req.login(user, { session: false }, (error: any) => {
        if (error) return next(error);
      });

      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      res.redirect('http://localhost:3000');
    } catch (error) {
      res.redirect('http://localhost:3000');
      return next(error);
    }
  })(req, res, next);
};

const logout = (req: any, res: any, next: any) => {
  req.logout();
};

export default { githubAuth, logout };
