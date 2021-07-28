import cors from 'cors';

const server = require('./app');

const corsOptions = {
  origin: true,
  credentials: true,
};

server.options('*', cors(corsOptions));

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening: http://localhost:${process.env.PORT}`);
});
