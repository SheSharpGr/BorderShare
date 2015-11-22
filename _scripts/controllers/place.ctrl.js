/**
 * @fileOverview The Places controller.
 */
var Promise = require('bluebird');

require('../services/place.service');
var helpers = require('../util/helpers');

var PlacesCtrl = module.exports = function($rootScope, $scope, $log, $location,
  placesService) {

  $log.log('app.ctrl.PlacesCtrl() :: Init');

  /** @type {Array} Places records */
  this.data = null;

  this.$rootScope = $rootScope;
  this.$log = $log;
  this.$location = $location;
  this.placesService = placesService;

  /** @type {Array.<Object>} the places model used by the ui, contains filtered */
  this.places = [];

  /** @type {Array.<Object>} the places model used by the app, contains all */
  this.allPlaces = [];

  /** @type {Array.<string>} The area filter items in slugs */
  this.filterAreaItems = [];
  /** @type {Array.<string>} The actual labels to use */
  this.filterAreaItemLabels = [];

  /** @type {String} The active area filter */
  this.activeAreaFilter = '';

  this.initData()
    .bind(this)
    .then(this.setupFilters)
    .return($rootScope)
    .then(helpers.safeApply);
};

/**
 * Initialize data...
 *
 */
PlacesCtrl.prototype.initData = Promise.method(function() {
  return this.placesService.get()
    .bind(this)
    .then(function(data) {
      this.$log.log('app.ctrl.PlacesCtrl() :: Got places:', data.length);
      this.allPlaces = data;
      return data;
    });
});

/**
 * Setup the available filters.
 *
 * @param {Array.<Object>} places The places.
 * @return {Promise} A Promise.
 */
PlacesCtrl.prototype.setupFilters = Promise.method(function(places) {
  this._setUniqueAreaItems(places);

  // check if we have area filters in place
  var query = this.$location.search();

  if (query.area) {
    this.activeAreaFilter = query.area;

    this.places = places.filter(this._areaFilter, this);
  } else {
    this.places = places;
  }
});

/**
 * The area filter callback method.
 *
 * @param {Object} placeItem The place item to examine.
 * @return {boolean} True / False.
 */
PlacesCtrl.prototype._areaFilter = function(placeItem) {
  return placeItem.bigArea === this.activeAreaFilter;
};

/**
 * Get the unique filter area items from the places dataset.
 *
 * @param {Array.<Object>} places The places.
 * @private
 */
PlacesCtrl.prototype._setUniqueAreaItems = function(places) {
  this.filterAreaItems = ['all'];
  this.filterAreaItemLabels = ['Όλες'];

  places.forEach(function(placeItem) {
    if (typeof placeItem.bigArea !== 'string') {
      return;
    }
    if (placeItem.bigArea.trim() === '') {
      return;
    }

    if (this.filterAreaItems.indexOf(placeItem.bigArea) === -1) {
      this.filterAreaItems.push(placeItem.bigArea);
      this.filterAreaItemLabels.push(placeItem.bigAreaLabel);
    }
  }, this);

};

angular.module('app')
  .controller('PlacesCtrl', ['$rootScope', '$scope', '$log', '$location',
    'PlacesService',
    PlacesCtrl
  ]);
