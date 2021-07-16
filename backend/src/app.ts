import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
// const middlewares = require('./middlewares');

import api from './api';

require('dotenv').config();
require('./passport');

const app = express();

if (!process.env.MONGO_URL) {
  process.exit(1);
}
// Commenting out these next few lines until I am ready to setup and use Mongo for the project
// const mongoDB = process.env.MONGO_URL;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(
  session({
    secret: 'tinderandmoviesohyes',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req: any, res: any) => {
  res.json({ message: 'MovieMatch Backend' });
});

app.use('/api/', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// export default app;
module.exports = app;
