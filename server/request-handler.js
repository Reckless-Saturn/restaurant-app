///////////////////////////////////////////////////////
// import required files
var url = require('url');
var sendResponse = require('./helpers').sendResponse;
var parser = require('./helpers').parseData;
var parseQuery = require('./helpers').parseQuery;
// import db queries
var addUser = require('./queries').addUser;
var addRestaurant = require('./queries').addRestaurant;
var getRestaurants = require('./queries').getRestaurants;
var addTransaction = require('./queries').addTransaction;
var getUserInfo = require('./queries').getUserInfo;

///////////////////////////////////////////////////////
// route handlers
var handleOptions = function(request, response) {
  sendResponse(response, '', 200);
};

var handleGet = function(request, response) {
  query = parseQuery(request);
  getRestaurants(response, query, sendResponse);
};

var handlePost = function(request, response, type) {
  parser(request, function(data) {
    if (type === 'customer') {
      addUser(response, data, sendResponse);
    } else if (type === 'restaurant') {
      addRestaurant(response, data, sendResponse);
    }
  });
};

var handleTransactionPost = function(request, response, type) {
  parser(request, function(data) {
    addTransaction(response, data);
  });
};

var handleLoginGet = function(request, response, type) {
  query = parseQuery(request);
  getUserInfo(response, query, sendResponse);
};

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
    handlePost(request, response, 'customer');

  } else if (request.method === 'POST' && path == '/restaurant/signup') {
    handlePost(request, response, 'restaurant');

  } else if (request.method === 'POST' && path == '/restaurant/choose-customer') {
    handleTransactionPost(request, response );

  } else if (request.method === 'GET' && path == '/login') {
    handleLoginGet(request, response );

  } else {
    sendResponse(response, 'Bad request', 404);
  }
};

