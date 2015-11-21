/**
 * @fileOverview Places Service.
 */

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
PlacesService.prototype.fetch = function () {
  return this.$http({
    method: 'GET',
    url: '/summary',
    transformResponse: function (data) {
      try {
        data = JSON.parse(data);
      } catch(ex) {
        return data;
      }

      if (data && data.usage && data.usage.isPolicyCount) {
        // in case of Count policy types reduce one from the usage count.
        // kansas inits the value starting from 1.
        data.usage.usage--;
      }

      return data;
    }
  });
};

angular.module('app')
  .service('PlacesService', ['$http',
    PlacesService
  ]);
