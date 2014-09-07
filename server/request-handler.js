///////////////////////////////////////////////////////
// import required files
var url = require('url');
var sendResponse = require('./helpers').sendResponse;
var parser = require('./helpers').parseData;
var parseQuery = require('./helpers').parseQuery;
var pn = require("pubnub");
// import db queries
var addUser = require('./queries').addUser;
var addRestaurant = require('./queries').addRestaurant;
var getRestaurants = require('./queries').getRestaurants;
var addTransaction = require('./queries').addTransaction;
var getUserInfo = require('./queries').getUserInfo;

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
    // C: Publish Messages
    var customer_channel = "c" + data.customerID;
    console.log( "restaurantName:", data.restaurantName );
    pubnub.publish({ 
        channel   : 'c0',
        message   : data.restaurantName,
        callback  : function(e) { console.log( "SUCCESS!", e ); },
        error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
    });
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

// ///////////////////////////////////////////////////////
// // C: Listen for Messages
// pubnub.subscribe({
//     channel  : "r0",
//     callback : function(message) {
//         console.log( " > ", message );
//     }
// });

// ///////////////////////////////////////////////////////
// // C: Type Console Message
// var stdin = process.openStdin();
// stdin.on( 'data', function(chunk) {
//     pubnub.publish({
//         channel : "r0",
//         message : ''+chunk
//     });
// });