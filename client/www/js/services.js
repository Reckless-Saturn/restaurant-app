var serverUrl = 'http://10.8.30.243:5555';

angular.module('app.services', ['ngCordova'])

.factory('App', function($http, $location) {

  var login = function(username, password) {
    var loginUrl = serverUrl+'/login?'+
      'username='+username;

    $http({
      method: 'GET',
      url: loginUrl
    }).then(function(response) {
      // If restaurant logged in,
      if(response.data[0].restaurantID || response.data[0].restaurantID === 0) { $location.path('/restaurant/availability'); }
      // If customer logged in,
      else if(response.data[0].customerID || response.data[0].customerID === 0) { $location.path('/customer/search-criteria'); }
    });
    
    // NOTE: We're only querying username at the moment. No password for the MVP
  };

  return {
    login: login
  };

})

.factory('Customer', function($http, $location, $cordovaGeolocation, $ionicPopup, App) {

  // Define global pubnub variable
  var pubnub;
  //// C: needed customer info for .publish
  var customerInfo = { customerID: 1, 
                       name: "Armando Perez",
                       phoneNumber: '503-555-7777',
                       partySize: 1 };

  var signup = function(username, firstName, lastName, email, phoneNumber, password) {
    // For testing purposes
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
      // login after sign-up
      App.login(username, password);
    });

    // todo: Remove. Done here just to test.
    // App.login(username, password);
  };

  var searchResults = [
    // { restaurantID: 0,
    //   restaurantName: 'Mission Beach Cafe',
    //   // priceRange will be a number from 1 to 5
    //   // Todo: convert to dollar signs in view file; e.g. '2' --> '$$'
    //   priceRange: 2,
    //   address: '944 Market Street, San Francisco, CA',
    //   latitude: 1,
    //   longitude: 1,
    //   distance: 0.1,
    //   cuisine: 'American' },
    // { restaurantID: 1,
    //   restaurantName: 'Local Sushi',
    //   priceRange: 1,
    //   address: '945 Market Street, San Francisco, CA',
    //   latitude: 2,
    //   longitude: 2,
    //   distance: 0.2,
    //   cuisine: 'Japanese' }
  ];
    
  var getSearchResults = function(distance, priceRange, partySize, cuisine) {

    // C: Initialize PubNub
    // D: TODO - Initialization should be on User Login
    pubnub = PUBNUB.init({
      publish_key: 'pub-c-2c4e8ddb-7e65-4123-af2d-ef60485170d4',
      subscribe_key: 'sub-c-693a352e-3394-11e4-9846-02ee2ddab7fe'
    });

    // Get customer's geolocation using ngCordova 
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(position) {

        var lat  = position.coords.latitude
        var long = position.coords.longitude
        // For testing purposes
        console.log('lat', lat, 'long', long);

        // searchUrl to be used in following http request
        var searchUrl = serverUrl+'/customer/search-criteria?'+
          'find_distance='+distance+
          '&find_priceRange='+priceRange+
          '&find_partySize='+partySize+
          '&find_cuisine='+cuisine+
          '&customerLoc='+lat+','+long;

        console.log('searchUrl', searchUrl); // For testing purposes

        // Send GET request after getting customer position
        $http({
          method: 'GET', 
          url: searchUrl
        })
        .then(function(response) {
          response.data.forEach(function(item) {
            searchResults.push(item);
          });
          console.log("search results: ", response.data);
          customerInfo.partySize = partySize;
          $location.path('/customer/search-results');
        });
        // D: the line below is temporary until above post is working with actual online server
        // $location.path('/customer/search-results');

      }, function(err) {
        console.log(err);
      });

  };

  // Invoked when customer chooses a restaurant on search-results page
  var chooseRestaurant = function(restaurantID) {

    //C: Send Interest to Restaurant using PubNub
    var restaurant_channel = "r" + restaurantID; 
    console.log( restaurant_channel );  // For testing purposes
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
      message: function(restaurantName){
        console.log(restaurantName);  // For testing purposes
        // Alert customer a restaurant has confirmed them 
        restaurantConfirmation(restaurantName);
      }
    });

    console.log('chosen restaurant ID:', restaurantID); // For testing purposes
  };

  var restaurantConfirmation = function(restaurantName) {
    // Alert using $ionicPopup
    var confirmPopup = $ionicPopup.alert({
      title: 'Restaurant Confirmation',
      template: '<center><b>'+restaurantName+'</b><br/>is waiting for you.</center>',
      okText: 'Let\'s get going!',
      okType: 'button-balanced'
    });
    confirmPopup.then(function(res) {
      console.log('res', res);  // For testing purposes
    });
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

    // Determine restaurant's geolocation based on their provided address
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
      if(status = google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();  // Latitude
        var long = results[0].geometry.location.lng(); // Longitude

        // For testing purposes
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

        // If geolocation is sucessfully determined, sign up restaurant
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
          // login after sign-up
          App.login(username, password);
        });

        // todo: Remove. Done here just to test.
        // App.login(username, password);

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

  // Allow restaurant to toggle visibility in customers' searches
  var toggleAvailability = function(available) {
    
    // C: Initialize PubNub
    pubnub = PUBNUB.init({
      publish_key: 'pub-c-2c4e8ddb-7e65-4123-af2d-ef60485170d4',
      subscribe_key: 'sub-c-693a352e-3394-11e4-9846-02ee2ddab7fe'
    });

    //C: Subscribe to restaurant's own channel
    // var restaurant_channel = "r" + restaurantID; 
    var restaurant_channel = "r" + "0"; // D: need to create global on restaurant login to obtain restaurant id
    console.log( restaurant_channel );  // For testing purposes

    // C: .subscribe and .init should be the first things to happen when a re
    pubnub.subscribe({
      channel: restaurant_channel,
      message: function(m) { 
        console.log(interestedCustomers);  // For testing purposes
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // D: data is coming in properly however view (ng-repeat) does not update
        //    unless nav bar is taped or other customer is clicked
        interestedCustomers.push(m);
        console.log(interestedCustomers); // For testing purposes
      }
    });

    // For testing purposes
    console.log('available:', available);

    // Update restaurant's 'available' field in server
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

  // Invoked when restaurant chooses a customer in interested-customers page
  var chooseCustomer = function(customerID, partySize) {
    // For testing purposes
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
