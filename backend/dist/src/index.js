"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const server = require('./app');
const corsOptions = {
    origin: true,
    credentials: true,
};
server.options('*', cors_1.default(corsOptions));
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
