const app = require('express')();
const server = require('http').createServer(app);
app.get('/', (req, res) => {
  res.status(200).send('hello maat-bab');
});
server.listen(4000, () => console.log('port 4000'));
