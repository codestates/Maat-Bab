const express = require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use('/', router);

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Dev-Child server is running at ${PORT} port`)
);
