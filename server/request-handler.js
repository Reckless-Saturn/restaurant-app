///////////////////////////////////////////////////////
// import required files
var url = require('url');
var pn = require("pubnub");
var sendResponse = require('./helpers').sendResponse;
var parsePost = require('./helpers').parsePost;
var parseGet = require('./helpers').parseGet;
var send404 = require('./helpers').send404;
// import db queries
var addUser = require('./queries').addUser;
var addRestaurant = require('./queries').addRestaurant;
var getRestaurants = require('./queries').getRestaurants;
var addTransaction = require('./queries').addTransaction;
var getLoginInfo = require('./queries').getLoginInfo;

///////////////////////////////////////////////////////
// C: Initialize PubNub
var pubnub = pn.init({
    publish_key   : "pub-c-2c4e8ddb-7e65-4123-af2d-ef60485170d4",
    subscribe_key : "sub-c-693a352e-3394-11e4-9846-02ee2ddab7fe"
});

///////////////////////////////////////////////////////
// route handlers
var handleOptions = function(request, response) {
  sendResponse(response, '', 200);
};

var handleLogin = function(request, response) {
  var data = parseGet(request);
  if (data) { getLoginInfo(response, data, sendResponse); }
  else { send404(response); }
};

var handleSearch = function(request, response) {
  data = parseGet(request);
  if (data) { getRestaurants(response, data, sendResponse); }
  else { send404(response); }
};

var handleNewCust = function(request, response) {
  parsePost(request, function(data) {
    if (data) { addUser(response, data, sendResponse); }
    else { send404(response); }
  });
};

var handleNewRestaurant = function(request, response) {
  parsePost(request, function(data) {
    if (data) { addRestaurant(response, data, sendResponse); }
    else { send404(response); }
  });
};

var handleTransactionPost = function(request, response) {
  parsePost(request, function(data) {
    if (data) {
      addTransaction(response, data);
      // C: Publish Messages
      var customer_channel = "c" + data.customerID;
      console.log( "restaurantName:", data.restaurantName );
      pubnub.publish({
          channel   : customer_channel,
          message   : data.restaurantName,
          callback  : function(e) { console.log( "SUCCESS!", e ); },
          error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
      });
    }
    else { send404(response); }
  });
};

//////////////////////////////////////////////////////
// main server router
module.exports = function(request, response) {
  var path = url.parse(request.url, true).pathname;
  console.log(request.method, "request -", path);
  if (request.method === 'OPTIONS') {
    handleOptions(request, response);

  } else if (request.method === 'GET' && path === '/login') {
    handleLogin(request, response);

  } else if (request.method === 'GET' && path === '/customer/search-criteria') {
    handleSearch(request, response);

  } else if (request.method === 'POST' && path === '/customer/signup') {
    handleNewCust(request, response);

  } else if (request.method === 'POST' && path === '/restaurant/signup') {
    handleNewRestaurant(request, response);

  } else if (request.method === 'POST' && path === '/restaurant/choose-customer') {
    handleTransactionPost(request, response);

  } else {
    send404(response);
  }
};
