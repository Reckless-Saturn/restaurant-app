angular.module('starter.services', [])

.factory('Customers', function($http) {

  var signup = function(username, firstName, lastName, email, phoneNumber, password) {
    console.log({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    });

    $http({
      method: 'POST',
      // todo: update URL
      url: 'http://[URL-HERE]/customer/signup',
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      },
      headers: {
        'Content-type': 'application/json'
      }
    });

  };

  var searchResults = [
      { restaurantID: 0,
        restaurantName: 'Mission Beach Cafe',
        // priceRange will be a number from 1 to 5
        // Todo: convert to dollar signs in view file; e.g. '2' --> '$$'
        priceRange: 2,
        address: '944 Market Street, San Francisco, CA',
        latitude: 1,
        longitude: 1,
        distance: 0.1,
        cuisine: 'American',
        // Todo: For ion-checkbox.
        // Todo: Ideally, shouldn't have this property in the data.
        chosen: false },
      { restaurantID: 1,
        restaurantName: 'Local Sushi',
        priceRange: 1,
        address: '945 Market Street, San Francisco, CA',
        latitude: 2,
        longitude: 2,
        distance: 0.2,
        cuisine: 'Japanese',
        // Todo: For ion-checkbox.
        // Todo: Ideally, shouldn't have this property in the data.
        chosen: false }
      ];
    
  var getSearchResults = function(distance, priceRange, partySize, cuisine) {

    console.log('send GET request. this should also redirect to search-results.html');

    var searchUrl = 'http://[URL-HERE]?find_distance='+distance+'&find_priceRange='+priceRange+'&find_partySize='+partySize+'&find_cuisine='+cuisine;
    console.log(searchUrl);

    $http({
      method: 'GET', 
      url: searchUrl
    })
    .then(function(response) {
      searchResults = response.data;
      // todo: redirect to search-results page
    });

  };

  return {
    signup: signup,
    getSearchResults: getSearchResults,
    searchResults: searchResults
  };

})

.factory('Restaurants', function($http) {

  var signup = function(restaurantName, address, priceRange, cuisine, email, phoneNumber, password) {
  
    console.log({
      restaurantName: restaurantName,
      address: address,
      priceRange: priceRange,
      cuisine: cuisine,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    });

    $http({
      method: 'POST',
      // todo: update URL
      url: 'http://[URL-HERE]/restaurant/signup',
      data: {
        restaurantName: restaurantName,
        address: address,
        priceRange: priceRange,
        cuisine: cuisine,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      },
      headers: {
        'Content-type': 'application/json'
      }

    });

  };

  var interestedCustomers = [
    { userID: 1,
      name: 'David Nguyen',
      phoneNumber: '415-555-5555',
      partySize: 5 },
    { userID: 2,
      name: 'Mai Le',
      phoneNumber: '222-333-3333',
      partySize: 4 }
  ];

  return {
    signup: signup,
    interestedCustomers: interestedCustomers
  };

});

/* 
CUSTOMERS FACTORY:
this should be the function to request from the server. Once the user submits on 'search-criteria.html', it should invoke this function. 

Upon success, this function should change the value of searchResults
*/
