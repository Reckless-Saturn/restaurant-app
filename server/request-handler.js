///////////////////////////////////////////////////////
// import required files
var url = require('url');
var sendResponse = require('./helpers').sendResponse;
var parser = require('./helpers').parseData;
var parseQuery = require('./helpers').parseQuery;
// import db queries
var addUser = require('./queries').addUser;
var getRestaurants = require('./queries').getRestaurants;

///////////////////////////////////////////////////////
// route handlers
var handleOptions = function(request, response) {
  sendResponse(response, '', 200);
};

var handleGet = function(request, response) {
  query = parseQuery(request);
  getRestaurants(response, query, sendResponse);
};

var handlePost = function(request, response) {
  parser(request, function(data) {
    addUser(response, data, sendResponse);
  });
}

//////////////////////////////////////////////////////
// main server router
module.exports = function(request, response) {
  var path = url.parse(request.url, true).pathname;
  console.log(request.method, "request -", path);
  if (request.method === 'OPTIONS') {
    handleOptions(request, response);
  } else if (request.method === 'GET' && path === '/customer/search-criteria') {
    handleGet(request, response);
  } else if (request.method === 'POST' && path == '/customer/signup') {
    handlePost(request, response);
  } else {
    sendResponse(response, 'Bad request', 404);
  }
};
