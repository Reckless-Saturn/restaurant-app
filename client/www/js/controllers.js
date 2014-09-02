angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

// Start Restaurant App's controllers
.controller('CustomerCtrl', function($scope) {

  // Todo: Hard-coded data for now. Eventually received via GET request.
  $scope.searchResults = [
    { restaurantID: 0,
      restaurantName: 'Mission Beach Cafe',
      priceRange: '$$',
      restaurantLoc: [1, 1],
      cuisine: 'American',
      available: true,
      // Todo: For ion-checkbox.
      // Todo: Ideally, shouldn't have this property in the data.
      chosen: false },
    { restaurantID: 1,
      restaurantName: 'Local Sushi',
      priceRange: '$',
      restaurantLoc: [2, 2],
      cuisine: 'Japanese',
      available: true,
      // Todo: For ion-checkbox.
      // Todo: Ideally, shouldn't have this property in the data.
      chosen: false }
  ];

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
