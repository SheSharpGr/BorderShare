/**
 * @fileOverview Places Service.
 */
var Parse = require('parse');
var Promise = require('bluebird');

/**
 * Places service.
 *
 * @param {$http} $http The http service.
 * @constructor
 */
var PlacesService = module.exports = function ($http, $log) {
  this.$http = $http;
  this.$log = $log;

  /** @type {?Array.<Object>} Cache data here */
  this.data = null;
};

/**
 * Get the summary.
 *
 * @return {Promise} A Promise.
 */
PlacesService.prototype.get = Promise.method(function () {
  if (this.data) {
    return this.data;
  }

  var Places = Parse.Object.extend('Places');

  var query = new Parse.Query(Places);

  var self = this;
  return query.find()
    .then(function(results) {
      var data = [];
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var jsonObj = object.toJSON();
        try {
          jsonObj.collectingIcons = JSON.parse(jsonObj.collectingIcons);
        } catch (e) {
          self.$log.log(e);
        }
        data.push(jsonObj);
      }

      self.data = data;
      return data;
    });
});

angular.module('app')
  .service('PlacesService', ['$http', '$log',
    PlacesService
  ]);
