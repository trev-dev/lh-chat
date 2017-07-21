$.ajax({

  url: '/recents',
  type: 'get'

}).done(function(data){
  
  data = JSON.parse(data);

  if (data.length > 0) {
    
    data.forEach(function(msg){

      $('<li>').text(msg.name+" : "+msg.text).appendTo('#history');

    });

  } else {
    console.log('Hello');
    $('<li>').text('No recent messages').appendTo('#history');

  }
  

});



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

  $('#history').animate({ scrollTop: $('#history').prop('scrollHeight') }, 1000);
  // Play notification if message doesn't contain your initials.
  if (msg.user != UID) {

      $('<li>').text(msg.name+" : "+msg.text).appendTo('#history');
      var audio = new Audio('msg.mp3');
      audio.play();

  } else {

    $('<li style="background-color: lightblue; border-radius: 6px;">').text(msg.name+" : "+msg.text).appendTo('#history');

  }
  
});