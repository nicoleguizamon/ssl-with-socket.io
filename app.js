var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

var options = {
  key: fs.readFileSync('./file.pem'),
  cert: fs.readFileSync('./file.crt'),
  ca: fs.readFileSync('./csr.pem')
};
var serverPort = 3000;

var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
	console.log(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('new connection');
  socket.emit('message', 'If you see the this message, then the connection has worked.');
});

server.listen(serverPort, function() {	
  console.log('server up and running at %s port', serverPort);
});