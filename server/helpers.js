var url = require('url');

///////////////////////////////////////////////////////
// static data
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type': "application/json"
};

///////////////////////////////////////////////////////
// send reply back to client
module.exports.sendResponse = function(response, data, status) {
  status = status || 200;
  responseText = JSON.stringify(data);
  response.writeHead(status, headers);
  response.end(responseText);
};

///////////////////////////////////////////////////////
// send a 404 response
module.exports.send404 = function(response) {
  module.exports.sendResponse(response, 'Bad request', 404);
}

///////////////////////////////////////////////////////
// parser for get requests
module.exports.parseGet = function(request) {
  var data = url.parse(request.url, true).query;

  if (data.username || data.customerLoc) {
    if (data.customerLoc) {
      var coords = data.customerLoc.split(',');
      data.latitude = coords[0];
      data.longitude = coords[1];
    }
    return data;
  }
  return undefined;
};

///////////////////////////////////////////////////////
// parser for post requests
module.exports.parsePost = function(request, callback) {
  var data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", function() {
    if (data) { callback(JSON.parse(data)); }
    else { callback(); }
  });
};
