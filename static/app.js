var socket = io();

function keyGen() {
    var len = 24;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var string = '';

    for (var i = 0; i < len; i++) {
        
        let key = Math.floor(Math.random() * chars.length);
        string += chars[key];
        
    }

    return string;

}

var UID = keyGen();

$('form').submit(function () {
  var message = {};
  if ($('#initials').val()) {

    message.name = $('#initials').val();

  } else {

    message.name = 'Anonymous';

  }

  message.text = $('#message').val();
  message.user = UID;
  socket.emit('message', JSON.stringify(message));
  $('#message').val('');
  return false;
});

socket.on('message', function (msg) {
  msg = JSON.parse(msg);

  $('<li>').text(msg.name+" : "+msg.text).appendTo('#history');

  // Play notification if message doesn't contain your initials.
  if (msg.user != UID) {

      var audio = new Audio('msg.mp3');
      audio.play();

  }
  
});