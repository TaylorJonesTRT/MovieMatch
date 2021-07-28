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
server.listen(process.env.PORT || 4000, () => {
    console.log(`Listening: http://localhost:${process.env.PORT}`);
});
