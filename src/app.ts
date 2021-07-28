/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import middleware from './middlewares';

import api from './api';

const path = require('path');

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

app.use(express.static(path.join(__dirname, '../../public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', api);
// app.get('/', (req: any, res: any) => {
//   res.json({ message: 'Invalid Endpoint' });
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.use(middleware.notFound);
app.use(middleware.errorHandler);
// app.use(middleware.isAuthenticated);

// export default app;
module.exports = app;
