var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');




form.addEventListener('submit', function(e) {
  e.preventDefault();
  if ((input.value).split(' ')[0] == '/roll'){
      var read = (input.value).split(" ");
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
  else if (input.value == '/token') {
    socket.emit('chat message', input.value);
    socket.emit('token creation');
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

socket.on('token creation', e => {
  createDiv();
  e = dragElement(document.getElementById("mydiv"));
})

function createDiv() {
  let div = document.createElement('div');
  let divheader = document.createElement('div');
  div.id='mydiv';
  divheader.id="mydivheader"
  div.appendChild(divheader);
  document.body.appendChild(div);
}

