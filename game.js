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

socket.on('user image', image);
function image (base64Image) {
  $('#images').append( '<img src="' + base64Image + '"/>');
}

$('#imagefile').bind('change', function(e){
var data = e.originalEvent.target.files[0];
var reader = new FileReader();
reader.onload = function(evt){
  image( evt.target.result);
  socket.emit('user image', evt.target.result);
};
reader.readAsDataURL(data);

});