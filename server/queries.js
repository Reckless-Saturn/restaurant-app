var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: 'superman',
  database: 'restApp'
});

connection.connect();

exports.getMessages = function(callback) {
  var latitude = 37.783548;
  var longitude = -122.408953;

  connection.query('select restaurantName,'
  + ' 111.045 * DEGREES(ACOS(COS('
  + ' RADIANS(' + latitude + ')) * COS(RADIANS(latitude))'
  + ' * COS(RADIANS(' + longitude + ') - RADIANS(longitude))'
  + ' + SIN(RADIANS(' + latitude + ')) *'
  + ' SIN(RADIANS(latitude))))'
  + ' AS distance_in_km'
  + ' from restaurants', function(err, results) {
    if (err) { throw err; }
    if (results && results.length > 0) {
      console.log("query results:", results);
    }
//    callback(err, results);
  });
};
