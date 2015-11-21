/**
 * @fileOverview The Places controller.
 */
require('../services/place.service');

var PlacesCtrl = module.exports = function($scope, $log, $location,
  placesService) {

  $log.log('app.ctrl.PlacesCtrl() :: Init');

  /** @type {Array} Places records */
  this.data = null;

  this.$log = $log;
  this.placesService = placesService;

  this.initData();
};

/**
 * Initialize data...
 * 
 */
PlacesCtrl.prototype.initData = function() {
  this.placesService.get()
    .then(function(res) {
      console.log('CTRL:', res);
    });
};

angular.module('app')
  .controller('PlacesCtrl', ['$scope', '$log', '$location', 'PlacesService',
    PlacesCtrl
  ]);
