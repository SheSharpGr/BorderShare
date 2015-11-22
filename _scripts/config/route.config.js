/**
 * @fileOverview Create and configure the routes.
 */

// load controllers
require('../controllers/place.ctrl');
require('../controllers/place-item.ctrl');
require('../controllers/users.ctrl');

/**
 * Application configuration, adding routes.
 *
 * @param {Object} $routeProvider The $routeProvider.
 * @param {Object} $locationProvider The $locationProvider.
 */
var routeConfig = module.exports = function ($routeProvider, $locationProvider) {

  // enable html5 routing
  // $locationProvider.html5Mode({
  //   enabled: false,
  //   requireBase: true,
  // }).hashPrefix('!');
  $locationProvider.html5Mode(true).hashPrefix('!');

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
    .when('/place/:placeId', {
      templateUrl: partialsPath + 'place-single.html',
    })
    .otherwise({
      redirectTo: '/'
    });
};

angular.module('app')
  .config(['$routeProvider', '$locationProvider',
    routeConfig
  ]);
