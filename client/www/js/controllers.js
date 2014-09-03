angular.module('starter.controllers', [])

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customers) {
  
  $scope.searchResults = Customers.searchResults;

  // invoked after submitting search criteria form
  $scope.getSearchResults = Customers.getSearchResults;

// Todo: calculate distance for each restaurant from user
// David to Mai: If the server will give this back to us, will this distance be in the data model?
  $scope.distance = 0.1;

})

.controller('RestaurantCtrl', function($scope, Restaurants) {

  // Todo: Eventually, 'available' will be determined by GET request?
  // David to Mai: The restaurant should send a POST request asking the server to change their availability to true. 
  $scope.available = true;

  $scope.interestedCustomers = Restaurants.interestedCustomers;

});
