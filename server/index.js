require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const router = require('./routes');

app.use('/', router);

const PORT = process.env.PORT;
const TEST = process.env.TEST;
const TEST1 = process.env.TEST1;
console.log(TEST);
server.listen(PORT, () => {
  console.log('test : ', TEST);
  console.log('test1 : ', TEST1);
  console.log(`Dev-Child server is running at ${PORT} port`);
});
