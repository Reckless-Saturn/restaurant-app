angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })

    .state('app.splash', {
      url: "/splash",
      views: {
        'menuContent' :{
          templateUrl: "templates/splash.html"
        }
      }
    })

    // Customer
    .state('app.customerSignUp', {
      url: "/customer/signup",
      views: {
        'menuContent' :{
          templateUrl: "templates/customer/signup.html",
          controller: 'CustomerCtrl'
        }
      }
    })

    .state('app.customerSearchCriteria', {
      url: "/customer/search-criteria",
      views: {
        'menuContent' :{
          templateUrl: "templates/customer/search-criteria.html",
          controller: 'CustomerCtrl'
        }
      }
    })

    .state('app.customerSearchResults', {
      url: "/customer/search-results",
      views: {
        'menuContent' :{
          templateUrl: "templates/customer/search-results.html",
          controller: 'CustomerCtrl'
        }
      }
    })

    // Restaurant
    .state('app.restaurantSignUp', {
      url: "/restaurant/signup",
      views: {
        'menuContent' :{
          templateUrl: "templates/restaurant/signup.html",
          controller: 'RestaurantCtrl'
        }
      }
    })

    .state('app.restaurantAvailability', {
      url: "/restaurant/availability",
      views: {
        'menuContent' :{
          templateUrl: "templates/restaurant/availability.html",
          controller: 'RestaurantCtrl'
        }
      }
    })

    .state('app.restaurantInterestedCustomers', {
      url: "/restaurant/interested-customers",
      views: {
        'menuContent' :{
          templateUrl: "templates/restaurant/interested-customers.html",
          controller: 'RestaurantCtrl'
        }
      }
    })

    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

