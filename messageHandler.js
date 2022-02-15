// Project by: Dawson Skirvin
// Handles and interprets any and all commands or chat messages sent via the Chat Bar on the page
// Makes sure all users see the same messages as one another and that messages get sent across the network

var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');




form.addEventListener('submit', function(e) {
  e.preventDefault();
  var read = (input.value).split(" ");
  if (read[0] == '/roll'){
      var resultTracker = 0;
      for (let index = 0; index < read[1]; index++) {
        const result = Math.floor(Math.random() * read[2]) + 1;
        resultTracker = resultTracker + result;
        if(index != 0){
          input.value = input.value + ' + ' + result;
        }
        else{
          input.value = input.value + ' = ' + result;
        }
        
      }
      const storedInput = input.value;
      const resultString = [resultTracker.toString(), storedInput];
      socket.emit('command', resultString);
      input.value = '';
      
  }
  else if (read[0] == '/token') {
    socket.emit('chat message', input.value);
    socket.emit('token creation', read[1]);
  }
  else if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('command', function(cmd){
  var item = document.createElement('li');
  item.textContent = cmd[0];
  item.title = cmd[1];
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);

});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('token creation', function(color) {
  dragElement(createToken(color));
})

function createToken(color) {
  var div = document.createElement('div');
  div.id = 'mydiv';
  document.body.appendChild(div);
  return div;
  
}

