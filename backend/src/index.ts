import cors from 'cors';

const server = require('./app');

const corsOptions = {
  origin: true,
  credentials: true,
};

server.options('*', cors(corsOptions));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
