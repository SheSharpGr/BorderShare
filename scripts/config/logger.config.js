/**
 * @fileOverview The logging facilities.
 */

var moment = require('moment/moment');

/**
 * Log decorator for applying timestamp to all log messages.
 *
 * @param {Object} $provide The $provide service.
 */
var logConfig = module.exports = function ($provide) {
  $provide.decorator('$log', ['$delegate', function ($delegate) {
    var methods = [
      'debug',
      'log',
      'info',
      'warn',
      'error',
    ];

    /**
     * Format logging messages.
     *
     * @param {Function} origMethod Original method.
     * @param {string} methodName The method's name.
     */
    function formatLogMessage(origMethod) {
      var args = [].slice.call(arguments, 1);

      var time = moment().format('YYYY/MM/DD HH:mm:ss.SSS');

      args[0] = [
        time,
        args[0]
      ].join(' ');

      // Send on our enhanced message to the original debug method.
      origMethod.apply(null, args);
    }

    /**
     * Stub the logging method.
     *
     * @param {string} method The method.
     */
    function stubMethod (method) {
      var orig = $delegate[method];
      $delegate[method] = angular.bind(null, formatLogMessage, orig, method);
      // Keeps angular-mocks happy
      // https://groups.google.com/forum/#!msg/angular/DWOMe6c7L_Q/Qe6DM7ugQw0J
      // http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/
      $delegate[method].logs = [];
    }

    angular.forEach(methods, stubMethod);

    return $delegate;
  }]);
};

angular.module('app')
  .config(['$provide',
    logConfig
  ]);
