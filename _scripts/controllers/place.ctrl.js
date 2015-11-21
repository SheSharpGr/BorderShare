/**
 * @fileOverview The Places controller.
 */
require('../services/place.service');

var PlacesCtrl = module.exports = function($scope, $log, $location,
  placesService) {

  /** @type {Array} Places records */
  this.data = null;

  this.$log = $log;
  this.placesService = placesService;

};

/**
 * Initialize data...
 * 
 */
PlacesCtrl.prototype.initData = function() {
  this.placesService.get()
    .success(function(data) {
      this.data = data;
      this.$log.log(this.data);
    });
};

angular.module('app')
  .controller('PlacesCtrl', ['$scope', '$log', '$location',
    'placesService',
    PlacesCtrl
  ]);