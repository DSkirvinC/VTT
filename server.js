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

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});