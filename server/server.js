///////////////////////////////////////////////////////
// import required files
var http = require('http');
var router = require('./request-handler');

///////////////////////////////////////////////////////
// set up server config
var ip = "127.0.0.1";
var port = 5555;

///////////////////////////////////////////////////////
// fire up the server
var server = http.createServer(router);
server.listen(port, ip);
console.log("Listening");
