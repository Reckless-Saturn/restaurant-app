///////////////////////////////////////////////////////
<<<<<<< HEAD
// import required files
var http = require('http');
var router = require('./request-handler');
=======
// pull in required files
var http = require("http");
var url = require('url');
var sendResponse = require('./helpers').sendResponse;
// var getRestaurants = require('./queries').getRestaurants; // D: ERROR WITH CONNECT!!
var getRestaurants = function(){console.log('hey')}; // D: ERROR WITH CONNECT!!
>>>>>>> Added PubNub to Server

///////////////////////////////////////////////////////
// set up server config
var ip = "127.0.0.1";
var port = 5555;

///////////////////////////////////////////////////////
// fire up the server
var server = http.createServer(router);
server.listen(port, ip);
console.log("Listening");

///////////////////////////////////////////////////////
// D: PubNub
var pubnub = require("pubnub").init({
    publish_key   : "pub-c-2c4e8ddb-7e65-4123-af2d-ef60485170d4",
    subscribe_key : "sub-c-693a352e-3394-11e4-9846-02ee2ddab7fe"
});

/* ---------------------------------------------------------------------------
Publish Messages
--------------------------------------------------------------------------- */
var message = { "some" : "data" };
pubnub.publish({ 
    channel   : 'my_channel',
    message   : message,
    callback  : function(e) { console.log( "SUCCESS!", e ); },
    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
});

//  ---------------------------------------------------------------------------
// Listen for Messages
// --------------------------------------------------------------------------- 
pubnub.subscribe({
    channel  : "my_channel",
    callback : function(message) {
        console.log( " > ", message );
    }
});

/* ---------------------------------------------------------------------------
Type Console Message
--------------------------------------------------------------------------- */
var stdin = process.openStdin();
stdin.on( 'data', function(chunk) {
    pubnub.publish({
        channel : "my_channel",
        message : ''+chunk
    });
});

