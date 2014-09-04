var serverUrl = 'http://[URL-HERE]';

angular.module('starter.services', ['ngCordova'])

.factory('Customer', function($http, $location, $cordovaGeolocation) {

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
      url: serverUrl+'/customer/signup',
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
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
      cuisine: 'American' },
    { restaurantID: 1,
      restaurantName: 'Local Sushi',
      priceRange: 1,
      address: '945 Market Street, San Francisco, CA',
      latitude: 2,
      longitude: 2,
      distance: 0.2,
      cuisine: 'Japanese' }
  ];
    
  var getSearchResults = function(distance, priceRange, partySize, cuisine) {

    // ngCordova geolocation
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {

        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log('lat', lat, 'long', long);

        var searchUrl = serverUrl+'/customer/search-criteria?'+
          'find_distance='+distance+
          '&find_priceRange='+priceRange+
          '&find_partySize='+partySize+
          '&find_cuisine='+cuisine+
          '&customerLoc='+lat+','+long;

        console.log('searchUrl', searchUrl);

        // Send GET request after getting customer position
        $http({
          method: 'GET', 
          url: searchUrl
        })
        .then(function(response) {
          searchResults = response.data;
          $location.path('/app/customer/search-results');
        });

      }, function(err) {
        console.log(err)
      });

  };

  var chooseRestaurant = function(restaurantID) {
    console.log('chosen restaurant ID:', restaurantID);
    $http({
      method: 'POST',
      url: serverUrl+'/customer/choose-restaurant',
      data: { restaurantID: restaurantID }
    });
  };

  return {
    signup: signup,
    getSearchResults: getSearchResults,
    chooseRestaurant: chooseRestaurant,
    searchResults: searchResults
  };

})

.factory('Restaurant', function($http) {

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
      url: serverUrl+'/restaurant/signup',
      data: {
        restaurantName: restaurantName,
        address: address,
        priceRange: priceRange,
        cuisine: cuisine,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      }
    });

  };

  var interestedCustomers = [
    { customerID: 1, 
      name: 'David Nguyen',
      phoneNumber: '415-555-5555',
      partySize: 5 },
    { customerID: 2,
      name: 'Mai Le',
      phoneNumber: '222-333-3333',
      partySize: 4 }
  ];

  var toggleAvailability = function(available) {
    console.log('available:', available);
    $http({
      method: 'POST',
      url: serverUrl+'/restaurant/toggle-availability',
      data: { available: available }
    });
  };

  var chooseCustomer = function(customerID) {
    console.log('chosen customer ID:', customerID);
    $http({
      method: 'POST',
      url: serverUrl+'/restaurant/choose-customer',
      data: { customerID: customerID }
    });
  };

  return {
    signup: signup,
    interestedCustomers: interestedCustomers,
    toggleAvailability: toggleAvailability,
    chooseCustomer: chooseCustomer
  };

});

/* 
CUSTOMERS FACTORY:
this should be the function to request from the server. Once the user submits on 'search-criteria.html', it should invoke this function. 

Upon success, this function should change the value of searchResults
*/
