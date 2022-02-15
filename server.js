// The Server for VTT
// This server handles the networking for all of the other functions and files in this project
// Additionally, this file 'serves' all the files necessary to execute this program to every connected client

const { fstat } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/HTML/entryPage.html');
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/HTML/gamePage.html');
});

app.get('/messageHandler.js', function (req, res) {
  res.sendFile(__dirname + '/messageHandler.js');
});
app.get('/imageHandler.js', function (req, res) {
  res.sendFile(__dirname + '/imageHandler.js');
});

app.get('/gamePageStyle.css', function (req, res) {
  res.sendFile(__dirname + '/gamePageStyle.css');
});

app.get('/tokenHandler.js', function (req, res) {
  res.sendFile(__dirname + '/tokenHandler.js');
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('command', cmd => {
    io.emit('command', cmd);
  });
  socket.on('user image', function (msg) {
    console.log(msg);
    socket.broadcast.emit('user image', msg);
  });
  socket.on('token creation', e => {
    socket.broadcast.emit('token creation', e);
  });
});



http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});