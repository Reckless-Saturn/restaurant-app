angular.module('starter.controllers')

  .factory('Customers', function($http, $location) {

    var searchResults = [
        { restaurantID: 0,
          restaurantName: 'Mission Beach Cafe',
          // priceRange will be a number from 1 to 5
          // Todo: convert to dollar signs in view file; e.g. '2' --> '$$'
          priceRange: 2,
          address: '944 Market Street, San Francisco, CA',
          latitude: 1,
          longitude: 1,
          cuisine: 'American',
          // available field will be a 0 (false) or 1 (true) -- should all be true here
          available: 1,
          // Todo: For ion-checkbox.
          // Todo: Ideally, shouldn't have this property in the data.
          chosen: false },
        { restaurantID: 1,
          restaurantName: 'Local Sushi',
          priceRange: 1,
          address: '945 Market Street, San Francisco, CA',
          latitude: 2,
          longitude: 2,
          cuisine: 'Japanese',
          available: 1,
          // Todo: For ion-checkbox.
          // Todo: Ideally, shouldn't have this property in the data.
          chosen: false }
        ];
      
    var getSearchResults = function() {
      console.log('send GET request');
      $location.path("/customer/search-criteria");
    };

    return {
      getSearchResults: getSearchResults,
      searchResults: searchResults
    };

  })
.factory('Restaurants', function($http) {
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
    interestedCustomers: interestedCustomers
  }
});

/* 
CUSTOMERS FACTORY:
this should be the function to request from the server. Once the user submits on 'search-criteria.html', it should invoke this function. 

Upon success, this function should change the value of searchResults
  
  var getSearchResults = function() {
    return $http({
      method: 'GET', 
      url: '/ArmandoAndEddieurl?find_cuisine=american&find_price=2&find_party=6&find_distance=0.5
    })
    .then(function(response) {
      searchResults = response.data
    });
  }
  */
