"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    _id: Number,
    githubID: { type: String, required: true },
    likedMovies: [
        {
            title: String,
            runTime: String,
            movieId: String,
        },
    ],
    dislikedMovies: [
        {
            title: String,
            runTime: String,
            movieId: String,
        },
    ],
});
exports.default = mongoose_1.default.model('User', UserSchema);
