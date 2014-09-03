angular.module('starter.controllers')

  .factory('Customers', function($http) {
  // Todo: Hard-coded data for now. Eventually received via GET request.
  // Returned data will be all available restaurants.
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

    return {
      searchResults: searchResults
    };

  });