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

  this.placesService = placesService;
};

/**
 * Submit new place record.
 *
 */
PlaceIntakeCtrl.prototype.submitNew = Promise.method(function(place) {

  console.log('place', place);
  return this.placesService.newPlace(place)
    .bind(this)
    .then(function() {
      this.$log.log('app.ctrl.PlaceItemCtrl.submitNew() :: New place record');
      return;
    });

});

angular.module('app')
  .controller('PlaceIntakeCtrl', ['$log', 'PlacesService',
    PlaceIntakeCtrl
  ]);
