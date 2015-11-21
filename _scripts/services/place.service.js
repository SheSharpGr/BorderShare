/**
 * @fileOverview Places Service.
 */
var Parse = require('parse');

/**
 * Places service.
 *
 * @param {$http} $http The http service.
 * @constructor
 */
var PlacesService = module.exports = function ($http) {
  this.$http = $http;
};

/**
 * Get the summary.
 *
 * @return {Promise} A Promise.
 */
PlacesService.prototype.get = function () {
  var Places = Parse.Object.extend('Test');
  var query = new Parse.Query(Places);
  // query.equalTo('city', 'Thessaloniki');
  query.find({
    success: function(results) {
      console.log('GOT:', results);
    },
    error: function(error) {
      console.error('ERROR:', error);
    }
  });

  return this.$http({
    method: 'GET',
    url: 'https://api.parse.com/1/classes/Places'
  })
    .then(function(res) {
      console.log('GOT RES:', res);
    });
};

angular.module('app')
  .service('PlacesService', ['$http',
    PlacesService
  ]);
