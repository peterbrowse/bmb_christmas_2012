/*var server = require("./servers/socket_io/server.js");

server.start();

exports.left = function(){
 	console.log("left"); 
	server.left();
}

exports.right = function (){
 	console.log("right");
	server.right();
}

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  	socket.emit('news', { hello: 'world' });
  	socket.on('my other event', function (data) {
  	  console.log(data);
  	});
  
  	socket.on('connect', function() { 
		console.log('Connected');  	
  		//connectCounter++; 
  	});
	socket.on('disconnect', function() {
		console.log('Disconnect'); 
		//connectCounter--; 
	});
});*/

var clients = [];

var http = require("http");
var fs = require("fs");
var httpServer = http.createServer(function(request, response) {
    fs.readFile(__dirname + "/chat.html", "utf8", function(error, content) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.end(content);
    });
}).listen(8080);

var io = require("socket.io").listen(httpServer);

io.sockets.on("connection", function(socket) {

	socket.on('join', function(username, callback) {
        if (clients.indexOf(username) < 0) {
            socket.username = username;
            clients.push(username);
            socket.broadcast.emit("Now Joining: ", username);
            callback(true, clients);
        } else {
            callback(false);
        }
    });
    
    socket.on("chat", function(message) {
        if (socket.username && message) {
            io.sockets.emit("chat", {sender: socket.username, message: message});
        }
    });
    
	socket.on("disconnect", function() {
        if (socket.username) {
            clients.splice(clients.indexOf(socket.username), 1);
            io.sockets.emit("user-left", socket.username);
        }
    });

});


