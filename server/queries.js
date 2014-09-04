var mysql = require('mysql');

///////////////////////////////////////////////////////
// db connection
var connection = mysql.createConnection({
  user: 'root',
  password: 'superman',
  database: 'restApp'
});

connection.connect();

///////////////////////////////////////////////////////
// query to find restaurants within a certain range
exports.getRestaurants = function(response, query, callback) {
  connection.query(
    'select restaurantID,'
      + 'restaurantName,'
      + 'priceRange,'
      + 'address,'
      + 'latitude,'
      + 'longitude,'
      + 'cuisine,'
      + 'case available when 1 then "true" else "false" end as available,'
        + ' 0.621371 * 111.045 * DEGREES(ACOS(COS('
        + ' RADIANS(' + query.latitude + ')) * COS(RADIANS(latitude))'
        + ' * COS(RADIANS(' + query.longitude + ') - RADIANS(longitude))'
        + ' + SIN(RADIANS(' + query.latitude + ')) *'
        + ' SIN(RADIANS(latitude))))'
      + ' AS distance'
    + ' from restaurants'
    + ' where priceRange <= ' + query.find_priceRange
      + ' and cuisine = "' + query.find_cuisine + '"'
    + ' having distance <= ' + query.find_distance,
    function(err, results) {
      if (err) { throw err; }
      callback(response, results);
    }
  );
};
