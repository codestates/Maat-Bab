require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const key = fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/fullchain.pem', 'utf8');

const credentials = {
  key: key,
  cert: cert,
  ca: ca,
};

// const https_server = require('https').createServer(credentials, app);
const http_server = require('http').createServer(app);
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTP_PORT = process.env.HTTP_PORT || 80;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use('/', router);

http_server.listen(HTTP_PORT, () => {
  console.log(`Dev-Child server is running at ${HTTP_PORT} port`);
});

// https_server.listen(HTTPS_PORT, () => {
//   console.log(`Dev-Child server is running at ${HTTPS_PORT} port`);
// });
