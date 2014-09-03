///////////////////////////////////////////////////////
// pull in required files
var http = require("http");
var url = require('url');
var sendResponse = require('./helpers').sendResponse;
var getMessages = require('./queries').getMessages;

///////////////////////////////////////////////////////
// set up server config
var ip = "127.0.0.1";
var port = 5555;

///////////////////////////////////////////////////////
// main server router
var router = function(request, response) {
  var path = url.parse(request.url).pathname;
  var method = request.method;
  var status = 200;
  var reply = messages = 'server works';

  if (path === '/' || path === '') {
    if (method === 'OPTIONS') {
      sendResponse(response, status, reply);
    } else if (method === 'GET') {
      getMessages(response, status, sendResponse);
    }
    // if (method === 'POST') {}

  } else {
    status = 404;
    reply = "Bad page";
    sendResponse(response, status, reply);
  }
}

///////////////////////////////////////////////////////
// fire up the server
var server = http.createServer(router);
server.listen(port, ip);

console.log("Listening");
