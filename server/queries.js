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
        callback(response, "Diner added successfully");
      }
    )
  };

  // step 1 - find if username or email already exists
  findUsername(data.username, data.email, function(results) {
    if (results.length === 0) { insertUser(); }
    else { callback(response, "Username or email already in use", 409); }
  })
};

///////////////////////////////////////////////////////
// insert restaurants
exports.addRestaurant = function(response, data, callback) {
  // step 2 - insert restaurant
  var insertRestaurant = function() {
    connection.query(
      'insert into restaurants (restaurantName, username, password, address, latitude, longitude, priceRange, cuisine, email, phone)'
      + ' values ("'
        + data.restaurantName + '", "'
        + data.username       + '", "'
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

  // step 1 - find if username or email already exists
  findUsername(data.username, data.email, function(results) {
    if (results.length === 0) { insertRestaurant(); }
    else { callback(response, "Username or email already in use", 409); }
  })
};

///////////////////////////////////////////////////////
// insert transaction data
exports.addTransaction = function(response, data) {
  connection.query(
    'insert into trans_history (customerID, restaurantID, partySize)'
    + ' values ("'
      + data.customerID   + '", "'
      + data.restaurantID + '", "'
      + data.partySize
    + '")',
    function(err, results) {
      if (err) { throw err; }
      console.log("Transaction inserted");
    }
  )
};

///////////////////////////////////////////////////////
// query to find login info
exports.getLoginInfo = function(response, query, callback) {
  findUsername(query.username, undefined, function(results) {
    if (results.length > 0) { callback(response, results, 200); }
    else { callback(response, "No login found", 204); }
  })
};

///////////////////////////////////////////////////////
// helper queries to find if a username already exists in *some* table
var findUsername = function(name, email, callback) {
  var dinerQuery = 'select * from diners where username = "' + name + '"';
  var restaurantQuery = 'select * from restaurants where username = "' + name + '"';
  if (email) {
    dinerQuery += ' or email = "' + email + '"';
    restaurantQuery += ' or email = "' + email + '"';
  }

  var searchDiners = function() {
    connection.query(dinerQuery,
      function(err, results) {
        if (err) { throw err; }
        if (results.length > 0) {
          callback(results);
        } else {
          searchRestaurants();
        }
      }
    )
  }

  var searchRestaurants = function() {
    connection.query(restaurantQuery,
      function(err, results) {
        if (err) { throw err; }
        callback(results);
      }
    )
  }

  // start with diners. if the username isn't found, then try restaurants
  searchDiners();
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
      + ' as distance'
    + ' from restaurants'
    + ' where priceRange <= ' + query.find_priceRange
      + ' and cuisine = "' + query.find_cuisine + '"'
    + ' having distance <= ' + query.find_distance,
    function(err, results) {
      if (err) { throw err; }
      // if there are no results, this will return an empty array
      results.map(function(result) {
        result.distance = Math.round(result.distance * 100) / 100
      });
      callback(response, results);
    }
  );
};
