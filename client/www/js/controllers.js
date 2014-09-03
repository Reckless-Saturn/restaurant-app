angular.module('starter.controllers', ['starter.services'])

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customers) {

  $scope.signup = Customers.signup;

  $scope.searchResults = Customers.searchResults;

  // invoked after submitting search criteria form
  $scope.getSearchResults = Customers.getSearchResults;

  $scope.chooseRestaurant = Customers.chooseRestaurant;

})

.controller('RestaurantCtrl', function($scope, Restaurants) {

  $scope.signup = Restaurants.signup;

  // David to Mai: The restaurant should send a POST request asking the server to change their availability to true. 

  $scope.toggleAvailability = Restaurants.toggleAvailability;

  $scope.interestedCustomers = Restaurants.interestedCustomers;

  $scope.chooseCustomer = Restaurants.chooseCustomer;

});
