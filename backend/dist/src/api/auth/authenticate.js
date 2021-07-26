"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = __importDefault(require("../../controllers/authController"));
const app = express_1.default.Router();
app.get('/github/', passport_1.default.authenticate('github'));
app.get('/github/callback/', authController_1.default.githubAuth);
app.get('logout', authController_1.default.logout);
exports.default = app;
