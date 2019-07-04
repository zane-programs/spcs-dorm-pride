const express = require('express');

let currentColor = {
  r: 0,
  g: 0,
  b: 0
};

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const adminSocket = io.of('/admin');

app.use(require('body-parser').json());
app.use('/static', express.static(`${__dirname}/static`));

app.get('/', (req, res) => res.status(200).sendFile(`${__dirname}/index.html`));
app.get('/admin', (req, res) => res.status(200).sendFile(`${__dirname}/admin.html`));

app.post('/color', (req, res) => {
  currentColor = req.body.color;
  io.emit('color', currentColor);
  res.status(200).send({ status: res.statusCode, message: "OK" });
});

io.on('connection', socket => {
  socket.emit('color', currentColor);
});

adminSocket.on('connection', socket => {
  socket.emit('color', currentColor);
  socket.on('color', data => {
    currentColor = data;
    io.emit('color', currentColor);
  });
});

const listener = server.listen(3000, () => console.log(`Server listening on port ${listener.address().port}`));
