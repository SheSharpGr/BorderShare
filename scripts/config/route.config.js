/**
 * @fileOverview Create and configure the routes.
 */

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

  var partialsPath = '';

  $routeProvider
    .when('/', {
      templateUrl: partialsPath + 'places.html',
    })
    .otherwise({
      redirectTo: '/'
    });
};

angular.module('app')
  .config(['$routeProvider', '$locationProvider',
    routeConfig
  ]);
