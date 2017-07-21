var express = require('express');
var routes = require('./routes');
var http = require('http');

var PORT = 8080;
var app = express();

app.set('view engine', 'pug');
app.use(express.static('static'));

routes(app);

var server = http.Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('message', function(msg){
        io.emit('message', msg);
    });
});

server.listen(PORT, function(){

    console.log(`Express running on port ${PORT}`);

});