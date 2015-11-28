/**
 * @fileOverview The Place Intake controller.
 */
var Promise = require('bluebird');
// var _ = require('lodash');

/**
 * The Place Intake controller.
 *
 * @constructor
 */
var PlaceIntakeCtrl = module.exports = function($log, placesService) {
  $log.log('app.ctrl.PlaceIntakeCtrl.Ctor() :: Init');

  this.$log = $log;
  this.placesService = placesService;
};

/**
 * Submit new place record.
 *
 */
PlaceIntakeCtrl.prototype.submitNew = Promise.method(function(place) {
  // Stringify collectingIcons object/param because Parse stores it as a string.
  place.collectingIcons = JSON.stringify(place.collectingIcons);

  return this.placesService.newPlace(place);
});

angular.module('app')
  .controller('PlaceIntakeCtrl', ['$log', 'PlacesService',
    PlaceIntakeCtrl
  ]);
