/**
 * @fileOverview The Dashboard controller.
 */

var Promise = require('bluebird');
var Parse = require('parse');
var helpers = require('../util/helpers');

var DashboardCtrl = module.exports = function($rootScope, $scope, $location, $log) {

  $log.log('app.ctrl.DashboardCtrl() :: Init');

  this.$log = $log;
  this.$rootScope = $rootScope;
  this.$location = $location;

  /** @type {Object} The own user UDO */
  this.ownUdo = {};

  var currentUser = Parse.User.current();

  if (currentUser) {

    Promise.resolve(currentUser.fetch())
      .bind(this)
      .then(function(res) {
        this.ownUdo = res.toJSON();
        helpers.safeApply(this.$rootScope);
      })
      .catch(function(err) {
        console.error('USER FETCH ERR:', err);
      });
  } else {
    $location.path('/login');
  }
};

angular.module('app')
  .controller('DashboardCtrl', ['$rootScope', '$scope', '$location', '$log',
    DashboardCtrl
  ]);
