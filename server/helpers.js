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
// parser for get requests
module.exports.parseQuery = function(request) {
  var query = url.parse(request.url, true).query;
  var coords = query.customerLoc.split(',');
  query.latitude = coords[0];
  query.longitude = coords[1];
  return query;
};

///////////////////////////////////////////////////////
// parser for post requests
module.exports.parseData = function(request, callback) {
  var data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", function() {
    callback(JSON.parse(data));
  });
};
