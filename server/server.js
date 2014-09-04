///////////////////////////////////////////////////////
// pull in required files
var http = require("http");
var url = require('url');
var sendResponse = require('./helpers').sendResponse;
var getRestaurants = require('./queries').getRestaurants;

///////////////////////////////////////////////////////
// set up server config
var ip = "127.0.0.1";
var port = 5555;

///////////////////////////////////////////////////////
// main server router
var router = function(request, response) {
  var path = url.parse(request.url, true).pathname;
  var query = url.parse(request.url, true).query;
  var method = request.method;
  var status = 200;
  var reply = 'server works';

  if (method === 'OPTIONS') {
    sendResponse(response, reply, status);
  } else if (method === 'GET') {
    if (path === '/customer/search-criteria' && query.find_distance > 0) {
      getRestaurants(response, query, sendResponse);
    } else {
      sendResponse(response, reply, status);
    }
  } else if (method === 'POST') {
    sendResponse(response, reply, status);
  } else {
    status = 404;
    reply = "Bad page";
    sendResponse(response, reply, status);
  }
}

///////////////////////////////////////////////////////
// fire up the server
var server = http.createServer(router);
server.listen(port, ip);

console.log("Listening");
