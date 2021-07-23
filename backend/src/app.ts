import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import middleware from './middlewares';
// const middlewares = require('./middlewares');

import api from './api';

require('dotenv').config();
require('./passport');

const app = express();

if (!process.env.MONGO_URL) {
  process.exit(1);
}
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: any, res: any) => {
  res.json({ message: 'MovieMatch Backend' });
});

app.use('/api/', api);

app.use(middleware.notFound);
app.use(middleware.errorHandler);
// app.use(middleware.isAuthenticated);

// export default app;
module.exports = app;
