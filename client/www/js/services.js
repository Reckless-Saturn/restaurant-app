var serverUrl = 'http://127.0.0.1:5555';

angular.module('starter.services', ['ngCordova'])

.factory('App', function($http, $location) {

  var login = function(username, password) {

    var loginUrl = serverUrl+'/login?'+
      'username='+username;

    $http({
      method: 'GET',
      url: loginUrl
    }).then(function(response) {
      // todo: Handle login based on response data object
      // if customer,
      $location.path('/customer/search-criteria');
      // if restaurant,
      $location.path('/restaurant/availability');
    });

    // todo: Remove. Only here for testing purposes.
    console.log('in App factory login');
    $location.path('/customer/search-criteria'); // this works

    // NOTE: We're only querying username at the moment. No password for the MVP
    // TODO: Add logic to determine if Customer or Restaurant. Add promise to redirect to appropriate page
  };

  return {
    login: login
  };

})

.factory('Customer', function($http, $location, $cordovaGeolocation, App) {

  // Define global pubnub variable
  var pubnub;
  //// C: needed customer info for .publish
  var customerInfo = {  customerID: 1, 
                        name: "Armando Perez",
                        phoneNumber: '503-555-7777',
                        partySize: 1};

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
        password: password,
      }
    }).then(function(response) {
      // todo: handle login after sign-up?
      // App.login(username, password);
    });

    // todo: Remove. Done here just to test.
    App.login(username, password);
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

    // C: Initialize PubNub
    // D: TODO - Initialization should be on User Login
    pubnub = PUBNUB.init({
      publish_key: 'pub-c-2c4e8ddb-7e65-4123-af2d-ef60485170d4',
      subscribe_key: 'sub-c-693a352e-3394-11e4-9846-02ee2ddab7fe'
    });

    // ngCordova geolocation
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(position) {

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
          customerInfo.partySize = partySize;
          $location.path('/customer/search-results');
        });
        // D: the line below is temporary until above post is working with actual online server
        $location.path('/customer/search-results');

      }, function(err) {
        console.log(err)
      });

  };

  var chooseRestaurant = function(restaurantID) {

    //C: Send Interest to Restaurant using PubNub
    var restaurant_channel = "r" + restaurantID; 
    console.log( restaurant_channel );
    pubnub.publish({
      channel: restaurant_channel,        
      message: customerInfo
    });

    // C: .subscribe and .init should be the first things to happen so that the client is always able to here the server
    // D: need to add this logic instead of hardcoding
    // var customer_channel = 'c' + customerID
    var customer_channel = "c0";

    pubnub.subscribe({
      channel: customer_channel,
      message: function(m){ console.log( m );}
    });

    console.log('chosen restaurant ID:', restaurantID);
  };

  return {
    signup: signup,
    getSearchResults: getSearchResults,
    chooseRestaurant: chooseRestaurant,
    searchResults: searchResults,
    customerInfo: customerInfo // C: Needed for PubNub Communication
  };

})

.factory('Restaurant', function($http, $location, App) {

  // Define global pubnub variable
  var pubnub;

  var signup = function(username, password, restaurantName, address, priceRange, cuisine, email, phoneNumber) {

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, function(results, status) {
      if(status = google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();
        console.log('lat', lat, 'long', long);
        console.log({
          username: username,
          password: password,
          restaurantName: restaurantName,
          address: address,
          lat: lat,
          long: long,
          priceRange: priceRange,
          cuisine: cuisine,
          email: email,
          phoneNumber: phoneNumber
        });

        $http({
          method: 'POST',
          url: serverUrl+'/restaurant/signup',
          data: {
            username: username,
            restaurantName: restaurantName,
            address: address,
            lat: lat,
            long: long,
            priceRange: priceRange,
            cuisine: cuisine,
            email: email,
            phoneNumber: phoneNumber,
            password: password
          }
        }).then(function(response) {
          // todo: handle login after sign-up?
          // App.login(username, password);
        });

        // todo: Remove. Done here just to test.
        App.login(username, password);

      } else {
        alert('Google Maps Geocoder failed.');
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
    
    // C: Initialize PubNub
    pubnub = PUBNUB.init({
      publish_key: 'pub-c-2c4e8ddb-7e65-4123-af2d-ef60485170d4',
      subscribe_key: 'sub-c-693a352e-3394-11e4-9846-02ee2ddab7fe'
    });

    //C: Subscribe to restaurant's own channel
    // var restaurant_channel = "r" + restaurantID; 
    var restaurant_channel = "r" + "0"; // D: need to create global on restaurant login to obtain restaurant id
    console.log( restaurant_channel );

    // C: .subscribe and .init should be the first things to happen when a re
    pubnub.subscribe({
      channel: restaurant_channel,
      message: function(m){ 
        console.log(interestedCustomers);
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // D: data is coming in properly however view (ng-repeat) does not update
        //    unless nav bar is taped or other customer is clicked
        interestedCustomers.push(m);
        console.log(interestedCustomers); }
    });

    console.log('available:', available);

    $http({
      method: 'POST',
      url: serverUrl+'/restaurant/toggle-availability',
      data: { available: available }
    })        
    // D: This will replace the $location.path below once post is actually working 
    // .then( function() {
    //   $location.path('/app/restaurant/interested-customers');
    //   console.log("In the then where template switches");
    // });

    // D: the line below is temporary until above post is working with actual online server
    $location.path('/restaurant/interested-customers');
  };

  var chooseCustomer = function(customerID, partySize) {
    console.log('chosen customer ID:', customerID);
    $http({
      method: 'POST',
      url: serverUrl+'/restaurant/choose-customer',
      // D: restaurantID and restaurantName are hard coded for now
      data: { customerID: customerID, restaurantID: 0, partySize: partySize, restaurantName: "GoodStuff" }
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
