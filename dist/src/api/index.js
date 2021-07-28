"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("./auth/authenticate"));
const movieData_1 = __importDefault(require("./movie/movieData"));
const user_1 = __importDefault(require("./user/user"));
const app = express_1.default();
app.get('/', (req, res) => res.json({
    message: 'MovieMatch API Routes',
}));
app.use('/auth/', authenticate_1.default);
app.use('/movie/', movieData_1.default);
app.use('/user/', user_1.default);
// router.use('/posts', passport.authenticate('jwt', { session: false }), posts);
// router.use('/test', passport.authenticate('jwt', { session: false }), test);
exports.default = app;
