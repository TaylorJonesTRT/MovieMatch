"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const app = express_1.default();
// Route to acquire all liked movies by a user to display them all.
app.get('/liked-movies/', userController_1.default.showLikedMovies);
// Both liked and disliked movies POST requests will be sent through here and will be seperatred
// into their proper locations by and if statement.
app.post('/save-movie/', userController_1.default.saveMovie);
// Removing a movie from the likedMovies array on the users model in mongoose
app.post('/delete-movie', userController_1.default.deleteMovie);
exports.default = app;
