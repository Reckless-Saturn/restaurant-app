angular.module('starter.controllers', [])


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope, Customers) {

  // Todo: Hard-coded data for now. Eventually received via GET request.

  // Returned data will be all available restaurants.

  $scope.searchResults = Customers.searchResults;

  // Todo: calculate distance for each restaurant from user
  $scope.distance = 0.1;

})

.controller('RestaurantCtrl', function($scope) {

  // Todo: Eventually, 'available' will be determined by GET request?
  $scope.available = true;

  $scope.interestedCustomers = [
    { userID: 1,
      name: 'David Nguyen',
      phoneNumber: '415-555-5555',
      partySize: 5 },
    { userID: 2,
      name: 'Mai Le',
      phoneNumber: '222-333-3333',
      partySize: 4 }
  ];

})

;
