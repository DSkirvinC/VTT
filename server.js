// Project by: Dawson Skirvin
// The Server for VTT
// This server handles the networking for all of the other functions and files in this project
// Additionally, this file 'serves' all the files necessary to execute this program to every connected client

const { fstat } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/HTML/entryPage.html'); // Sends every user who connects on the default address to the entryPage, providing them with the file.
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/HTML/gamePage.html'); // Sends every user who connects on the game directory to the gamePage, providing them with the html file for that page.
});

app.get('/messageHandler.js', function (req, res) {
  res.sendFile(__dirname + '/Scripts/messageHandler.js'); // Provides every connected user with the messageHandler.js file.
});
app.get('/imageHandler.js', function (req, res) {
  res.sendFile(__dirname + '/Scripts/imageHandler.js'); // Provides every connected user with the imageHandler.js file.
});

app.get('/gamePageStyle.css', function (req, res) {
  res.sendFile(__dirname + '/Style/gamePageStyle.css'); // Provides every connected user with the gamePageStyle.css file.
});

app.get('/tokenHandler.js', function (req, res) {
  res.sendFile(__dirname + '/Scripts/tokenHandler.js'); // Provides every connected user with the tokenHandler.js file.
});


io.on('connection', (socket) => { // On any given connection to the webapp...
  socket.on('chat message', msg => { // Check for a 'chat message' request...
    io.emit('chat message', msg); // Execute protocol for 'chat message' and disperse to every connected user.
  });
  socket.on('command', cmd => { // Check for a 'command' request...
    io.emit('command', cmd); // Execute protocol for 'command' and disperse to every connected user.
  });
  socket.on('user image', function (msg) { // Check for a 'user image' request...
    console.log(msg);
    socket.broadcast.emit('user image', msg); // Execute protocol for 'user image' and disperse to every connected user.
  });
  socket.on('token creation', e => { // Check for a 'token creation' request...
    socket.broadcast.emit('token creation', e); // Execute protocol for 'token creation' and disperse to every connected user.
  });
});



http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});