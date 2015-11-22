/**
 * @fileOverview The Places controller.
 */
require('../services/place.service');
var helpers = require('../util/helpers');

var PlacesCtrl = module.exports = function($rootScope, $scope, $log, $location,
  placesService) {

  $log.log('app.ctrl.PlacesCtrl() :: Init');

  /** @type {Array} Places records */
  this.data = null;

  this.$rootScope = $rootScope;
  this.$log = $log;
  this.placesService = placesService;

  /** @type {Array.<Object>} the places model used by the ui */
  this.places = [];

  this.initData();
};

/**
 * Initialize data...
 *
 */
PlacesCtrl.prototype.initData = function() {
  var self = this;
  this.placesService.get()
    .then(function(data) {
      self.$log.log('app.ctrl.PlacesCtrl() :: Got places:', data.length);
      self.places = data;
      helpers.safeApply(self.$rootScope);
    });
};

angular.module('app')
  .controller('PlacesCtrl', ['$rootScope', '$scope', '$log', '$location', 'PlacesService',
    PlacesCtrl
  ]);
