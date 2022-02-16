// Project by: Dawson Skirvin
// Handles and interprets any and all commands or chat messages sent via the Chat Bar on the page
// Makes sure all users see the same messages as one another and that messages get sent across the network

var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');




form.addEventListener('submit', function(e) { // upon pushing the submit button...
  e.preventDefault();
  var read = (input.value).split(" "); // break the inputted text into discrete parts
  if (read[0] == '/roll'){
      var resultTracker = 0;
      // Provide a random number from 1 to whatever number you wish...
      // Can be provided either as one dice of 1 to x or of multiple dice of 1 to x.
      // Example: /roll 1 6 = 3 or /roll 3 6 = 15
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
      socket.emit('command', resultString); // Sends a call to the server to execute and distribute 'command' action.
      input.value = '';
      
  }
  else if (read[0] == '/token') {
    socket.emit('chat message', input.value); // Sends a call to the server to execute and distribute 'chat message' action.
    socket.emit('token creation', read[1]); // Sends a call to the server to execute and distribute 'token creation' action.
  }
  else if (input.value) {
    socket.emit('chat message', input.value); // Sends a call to the server to execute and distribute 'chat message' action.
    input.value = '';
  }
});

socket.on('command', function(cmd){ // functionally similar to 'chat message' this simply interprets the multi-part nature of command calls and displays them in a readable manner.
  var item = document.createElement('li');
  item.textContent = cmd[0];
  item.title = cmd[1];
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);

});

socket.on('chat message', function(msg) { // Displays user's inputted text in readable format on webpage.
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('token creation', function(color) {
  dragElement(createToken(color));
})

function createToken(color) { // Creates a token for the dragElement function to be called on.
  var div = document.createElement('div');
  div.id = 'mydiv';
  document.body.appendChild(div);
  return div;
  
}

