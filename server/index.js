// require('dotenv').config();
// const express = require('express');
// const app = express();
// const router = require('./routes');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const https = require('https');
// const fs = require('fs');
// const credentials =
//   process.env.NODE_ENV === 'production'
//     ? {
//         key: fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/privkey.pem', 'utf8'),
//         cert: fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/cert.pem', 'utf8'),
//         ca: fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/chain.pem', 'utf8'),
//       }
//     : undefined;

// const server = credentials ? https.createServer(credentials, app) : require('http').createServer(app);
// const PORT = credentials ? process.env.HTTPS_PORT || 443 : process.env.HTTP_PORT || 80;

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static('public'));
// app.use(
//   cors({
//     origin: true,
//     methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
//     credentials: true,
//   })
// );
// app.use('/', router);

// server.listen(PORT, () => {
//   console.log(`Dev-Child server is running at ${PORT} port`);
// });
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();
app.use(express.static('public'));

const key = fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/server.maat-bab.com/chain.pem', 'utf8');

const credentials = {
  key: key,
  cert: cert,
  ca: ca,
};

app.use((req, res) => {
  res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
