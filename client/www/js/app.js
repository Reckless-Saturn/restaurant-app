angular.module('starter', ['ionic', 'starter.controllers'])

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
  ['ionic', 
  'starter.controllers'])

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
      templateUrl: "templates/menu.html"
    })

    .state('app.splash', {
      url: "/splash",
      views: {
        'menuContent' :{
          templateUrl: "templates/splash.html"
        }
      }
    })

   .state('app.login', {
    url: "/login",
    views: {
      'menuContent' :{
        templateUrl: "templates/login.html",
        controller: 'AppCtrl'
        }
      }
    })

/////////////////////////////////////////////
// C: Customer routing
//
    .state('app.customerSignUp', {
      url: "/customer/signup",
      views: {
        'menuContent' :{
          templateUrl: "templates/customer/signup.html",
          controller: 'CustomerCtrl'
        }
      }
    })

    .state('customer', {
      url: "/customer",
      abstract: true,
      templateUrl: "templates/customer/menu.html"
    })

    .state('customer.searchCriteria', {
      url: "/search-criteria",
      views: {
        'customer/search-criteria-tab' :{
          templateUrl: "templates/customer/search-criteria.html",
          controller: 'CustomerCtrl'
        }
      }
    })

    .state('customer.searchResults', {
      url: "/search-results",
      views: {
        'customer/search-results-tab' :{
          templateUrl: "templates/customer/search-results.html",
          controller: 'CustomerCtrl'
        }
      }
    })

/////////////////////////////////////////////
// C: Restaurant Routing
//
    .state('app.restaurantSignUp', {
      url: "/restaurant/signup",
      views: {
        'menuContent' :{
          templateUrl: "templates/restaurant/signup.html",
          controller: 'RestaurantCtrl'
        }
      }
    })

    .state('restaurant', {
      url: "/restaurant",
      abstract: true,
      templateUrl: "templates/restaurant/menu.html"
    })

    .state('restaurant.availability', {
      url: "/availability",
      views: {
        'restaurant/availability-tab' :{
          templateUrl: "templates/restaurant/availability.html",
          controller: 'RestaurantCtrl'
        }
      }
    })

    .state('restaurant.interestedCustomers', {
      url: "/interested-customers",
      views: {
        'restaurant/interested-customers-tab' :{
          templateUrl: "templates/restaurant/interested-customers.html",
          controller: 'RestaurantCtrl'
        }
      }
    })

    ;
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/splash');
});

