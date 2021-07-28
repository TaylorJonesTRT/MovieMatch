"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = __importDefault(require("./middlewares"));
const api_1 = __importDefault(require("./api"));
const path = require('path');
require('dotenv').config();
require('./passport');
const app = express_1.default();
if (!process.env.MONGO_URL) {
    process.exit(1);
}
const mongoDB = process.env.MONGO_URL;
mongoose_1.default.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use('/api/', api_1.default);
// app.get('/', (req: any, res: any) => {
//   res.json({ message: 'Invalid Endpoint' });
// });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(middlewares_1.default.notFound);
app.use(middlewares_1.default.errorHandler);
// app.use(middleware.isAuthenticated);
// export default app;
module.exports = app;
