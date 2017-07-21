var socket = io();

$('form').submit(function () {
  var text = '';
  if ($('#initials').val()) {

    text += $('#initials').val() +': ';

  }

  text += $('#message').val();
  socket.emit('message', text);
  $('#message').val('');
  return false;
});

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});