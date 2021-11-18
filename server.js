const { fstat } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/HTML/entryPage.html');
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/HTML/game.html');
});

app.get('/messageHandler.js', function (req, res) {
  res.sendFile(__dirname + '/messageHandler.js');
});
app.get('/imageHandler.js', function (req, res) {
  res.sendFile(__dirname + '/imageHandler.js');
});

app.get('/gameStyle.css', function (req, res) {
  res.sendFile(__dirname + '/gameStyle.css');
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

io.on('connection', (socket) => {
    socket.on('command', cmd => {
      io.emit('command', cmd);
    });
  });

io.on('connection', (socket) => {
  socket.on('user image', function (msg) {
    console.log(msg);
    socket.broadcast.emit('user image', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});