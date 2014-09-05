angular.module('starter.controllers', ['starter.services'])

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customer) {

  $scope.signup = Customer.signup;
  $scope.searchResults = Customer.searchResults;
  // invoked after submitting search criteria form
  $scope.getSearchResults = Customer.getSearchResults;
  $scope.chooseRestaurant = Customer.chooseRestaurant;

<<<<<<< HEAD
=======
  // // begin watching
  // var watch = $cordovaGeolocation.watchPosition({ frequency: 1000 });
  // watch.promise.then(function() { /* Not  used */ }, 
  //   function(err) {
  //     // An error occurred.
  //   }, 
  //   function(position) {
  //     // Active updates of the position here
  //     // position.coords.[ latitude / longitude]
  // });

  // // clear watch
  // $cordovaGeolocation.clearWatch(watch.watchID)

<<<<<<< HEAD
=======
.controller('PushCtrl', function($scope, $stateParams, $cordovaPush) {
  $scope.sendPush = function() {
    $cordovaPush.register("someData"); //D: this is for debugging
    console.log("In Push Controller");
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
>>>>>>> Start Push Notifications
>>>>>>> Start Push Notifications
})

.controller('RestaurantCtrl', function($scope, Restaurant) {

  $scope.signup = Restaurant.signup;
  $scope.toggleAvailability = Restaurant.toggleAvailability;
  $scope.interestedCustomers = Restaurant.interestedCustomers;
  $scope.chooseCustomer = Restaurant.chooseCustomer;

});
