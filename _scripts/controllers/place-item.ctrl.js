/**
 * @fileOverview The Place Single Item controller.
 */
var Promise = require('bluebird');
var _ = require('lodash');

require('../services/place.service');
var helpers = require('../util/helpers');

/**
 * The Place Single Item controller.
 *
 * @constructor
 */
var PlaceItemCtrl = module.exports = function($rootScope, $scope, $log, $location,
  $routeParams, placesService) {

  $log.log('app.ctrl.PlaceItemCtrl.Ctor() :: Init');

  /** @type {Array} Places records */
  this.data = null;

  this.$routeParams = $routeParams;
  this.$rootScope = $rootScope;
  this.$log = $log;
  this.$location = $location;
  this.placesService = placesService;

  /** @type {Object} the single place model used by the ui */
  this.place = {};

  /** @type {Boolean} Indicates loading */
  this.loading = true;

  /** @type {Boolean} Indicates if place item was not found */
  this.notFound = false;

  /** @type {Array.<Object>} the places model used by the app, contains all */
  this.allPlaces = [];

  this.initData()
    .bind(this)
    .return($rootScope)
    .then(helpers.safeApply);
};

/**
 * Initialize data...
 *
 */
PlaceItemCtrl.prototype.initData = Promise.method(function() {
  return this.placesService.get()
    .bind(this)
    .then(function(data) {
      this.$log.log('app.ctrl.PlaceItemCtrl.initData() :: Got places:', data.length);
      this.allPlaces = data;
      var placeItem = _.find(data, {objectId: this.$routeParams.placeId});
      if (!placeItem) {
        this.notFound = true;
      } else {
        this.place = placeItem;
        console.log(this.place);
      }

      this.loading = false;
      return data;
    });
});

angular.module('app')
  .controller('PlaceItemCtrl', ['$rootScope', '$scope', '$log', '$location',
    '$routeParams', 'PlacesService',
    PlaceItemCtrl
  ]);
