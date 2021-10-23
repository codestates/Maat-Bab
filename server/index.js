const app = require('express')();
const server = require('http').createServer(app);
const router = require('./routes');

app.use('/', router);

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Dev-Child server is running at ${PORT} port`));
