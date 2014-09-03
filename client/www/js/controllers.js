angular.module('starter.controllers', ['starter.services'])

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customer) {

  $scope.signup = Customer.signup;

  $scope.searchResults = Customer.searchResults;

  // invoked after submitting search criteria form
  $scope.getSearchResults = Customer.getSearchResults;

  $scope.chooseRestaurant = Customer.chooseRestaurant;

})

.controller('RestaurantCtrl', function($scope, Restaurant) {

  $scope.signup = Restaurant.signup;

  // David to Mai: The restaurant should send a POST request asking the server to change their availability to true. 

  $scope.toggleAvailability = Restaurant.toggleAvailability;

  $scope.interestedCustomers = Restaurant.interestedCustomers;

  $scope.chooseCustomer = Restaurant.chooseCustomer;

});
