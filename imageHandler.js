var socket = io();

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