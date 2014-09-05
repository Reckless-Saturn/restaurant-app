angular.module('starter.controllers', ['starter.services'])

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customer) {

  $scope.signup = Customer.signup;
  $scope.searchResults = Customer.searchResults;
  // invoked after submitting search criteria form
  $scope.getSearchResults = Customer.getSearchResults;
  $scope.chooseRestaurant = Customer.chooseRestaurant;

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
})

.controller('RestaurantCtrl', function($scope, Restaurant) {

  $scope.signup = Restaurant.signup;
  $scope.toggleAvailability = Restaurant.toggleAvailability;
  $scope.interestedCustomers = Restaurant.interestedCustomers;
  $scope.chooseCustomer = Restaurant.chooseCustomer;

});
