var socket = io();

$('form').submit(function () {
  var text = '';
  if ($('#initials').val()) {

    text += $('#initials').val() +': ';

  } else {

    text += 'ANON: ';

  }

  text += $('#message').val();
  socket.emit('message', text);
  $('#message').val('');
  return false;
});

socket.on('message', function (msg) {

  $('<li>').text(msg).appendTo('#history');
  console.log(msg.indexOf($('#initials').val() +': ') < 0);
  // Play notification if message doesn't contain your initials.
  if (msg.indexOf($('#initials').val() +': ') < 0) {

      var audio = new Audio('msg.mp3');
      audio.play();

  }
  
});