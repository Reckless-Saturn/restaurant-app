angular.module('starter.controllers', ['starter.services'])

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customers) {

  $scope.signup = Customers.signup;

  $scope.searchResults = Customers.searchResults;

  // invoked after submitting search criteria form
  $scope.getSearchResults = Customers.getSearchResults;

})

.controller('RestaurantCtrl', function($scope, Restaurants) {
  
  $scope.signup = Restaurants.signup;

  // Todo: Eventually, 'available' will be determined by GET request?
  // David to Mai: The restaurant should send a POST request asking the server to change their availability to true. 
  $scope.available = true;

  $scope.interestedCustomers = Restaurants.interestedCustomers;

});
