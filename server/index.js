require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
// const options =
//   process.env.NODE_ENV === 'production'
//     ? {
//         key: fs.readFileSync(__dirname + '/key.pem'),
//         cert: fs.readFileSync(__dirname + '/cert.pem'),
//         // ca: fs.readFileSync(__dirname + '/인증서경로/ca-chain-bundle.pem'),
//       }
//     : undefined;
const options = undefined;

const server = options ? require('https').createServer(options, app) : require('http').createServer(app);
const PORT = options ? process.env.HTTPS_PORT || 443 : process.env.HTTP_PORT || 80;

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

server.listen(PORT, () => {
  console.log(`Dev-Child server is running at ${PORT} port`);
});
