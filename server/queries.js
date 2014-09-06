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
// insert users
exports.addUser = function(response, data, callback) {

  // step 2 - insert user
  var insertUser = function() {
    connection.query(
      'insert into diners (username, password, firstName, lastName,'
      + ' email, phone)'
      + ' values ("'
        + data.username   + '", "'
        + data.password   + '", "'
        + data.firstName  + '", "'
        + data.lastName   + '", "'
        + data.email      + '", "'
        + data.phoneNumber
      + '")',
      function(err, results) {
        if (err) { throw err; }
        callback(response, "User added successfully");
      }
    )
  }

  // step 1 - find if username or email already exists
  connection.query(
    'select 1 from diners where username = "' + data.username
    + '" or email = "' + data.email + '"',
    function(err, results) {
      if (err) { throw err; }
      if (results.length > 0) {
        callback(response, "Username or email already exists", 409);
      } else {
        insertUser();
      }
    }
  );
};

///////////////////////////////////////////////////////
// insert restaurants
exports.addRestaurant = function(response, data, callback) {
  connection.query(
    'insert into restaurants (restaurantName, password, address, latitude, longitude, priceRange, cuisine, email, phone)'
    + ' values ("'
      + data.restaurantName + '", "'
      + data.password       + '", "'
      + data.address        + '", "'
      + data.lat            + '", "'
      + data.long           + '", "'
      + data.priceRange     + '", "'
      + data.cuisine        + '", "'
      + data.email          + '", "'
      + data.phoneNumber
    + '")',
    function(err, results) {
      if (err) { throw err; }
      callback(response, "Restaurant added successfully");
    }
  )
};

///////////////////////////////////////////////////////
// query to find restaurants within a certain range
exports.getUserInfo = function(response, query, callback) {
  connection.query(
    'select * from diners where username = "' + query.username + '"',
    function(err, results) {
      if (err) { throw err; }
      if (results.length > 0) {
        callback(response, results, 200);
      } else {
        findRestaurants(results);
      }
    }
  )

  var findRestaurants = function(results) {
    connection.query(
      'select * from restaurants where username = "' + query.username + '"',
      function(err, results) {
        if (err) { throw err; }
        if (results.length > 0) {
          callback(response, results, 200);
        } else {
          callback(response, "No login found", 204);
        }
      }
    )
  }
};

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
      // geolocation proximity equation - converts to miles
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
      // if there are no results, this will return an empty array
      callback(response, results);
    }
  );
};
