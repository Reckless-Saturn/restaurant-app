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
exports.sendResponse = function(response, status, text) {
  responseText = JSON.stringify(text);
  response.writeHead(status, headers);
  response.end(responseText);
};