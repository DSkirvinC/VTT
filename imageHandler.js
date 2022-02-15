// Project by: Dawson Skirvin
// This file is responsible for image display and transfer
// Converts image to byte64 and distributes it to all users on the server

var socket = io();

socket.on('user image', image);
// Converts a given image to base64 format.
function image (base64Image) {
  $('#images').append( '<img src="' + base64Image + '"/>');
}

// Takes encoded base64 format and reformats it back into the original image on every connected users screen.
$('#imagefile').bind('change', function(e){
var data = e.originalEvent.target.files[0];
var reader = new FileReader();
reader.onload = function(evt){
  image( evt.target.result);
  socket.emit('user image', evt.target.result);
};
reader.readAsDataURL(data);

});