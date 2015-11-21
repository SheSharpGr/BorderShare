/**
 * @fileOverview Create and configure the routes.
 */

// load controllers
require('../controllers/place.ctrl');

/**
 * Application configuration, adding routes.
 *
 * @param {Object} $routeProvider The $routeProvider.
 * @param {Object} $locationProvider The $locationProvider.
 */
var routeConfig = module.exports = function ($routeProvider, $locationProvider) {

  // enable html5 routing
  $locationProvider.html5Mode(true);

  var partialsPath = 'ngtpl/';

  $routeProvider
    .when('/', {
      templateUrl: partialsPath + 'places.html',
    })
    .when('/signup', {
      templateUrl: partialsPath + 'signup.html',
    })
    .when('/login', {
      templateUrl: partialsPath + 'login.html',
    })
    .otherwise({
      redirectTo: '/'
    });
};

angular.module('app')
  .config(['$routeProvider', '$locationProvider',
    routeConfig
  ]);
