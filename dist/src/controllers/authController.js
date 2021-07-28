"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const githubAuth = (req, res, next) => {
    passport_1.default.authenticate('github', (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error(err);
                return next(error);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.githubID }, 'TOP_SECRET', {
                expiresIn: '1d',
            });
            req.login(user, { session: false }, (error) => {
                if (error)
                    return next(error);
            });
            res.cookie('token', token, { maxAge: 86400000 });
            res.redirect('http://localhost:3000');
        }
        catch (error) {
            res.redirect('http://localhost:3000');
            return next(error);
        }
    })(req, res, next);
};
const logout = (req, res, next) => {
    req.logout();
};
exports.default = { githubAuth, logout };
