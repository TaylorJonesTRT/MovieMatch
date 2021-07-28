"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = __importDefault(require("../../controllers/movieController"));
const app = express_1.default();
// GET request for movie details and data
app.get('/random/', movieController_1.default.getMovieDetails);
exports.default = app;
