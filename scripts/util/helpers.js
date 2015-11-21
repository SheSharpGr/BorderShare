/**
 * @fileOverview Generic helpers.
 */

var helpers = module.exports = {};

/**
 * Perform a safe apply checkign if we are already in a digest cycle.
 *
 * @param {Object} $rootScope The $rootScope object.
 * @param {Function=} fn The callback.
 */
helpers.safeApply = function($rootScope, fn) {
  var phase = $rootScope.$$phase;
  if(phase === '$apply' || phase === '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    $rootScope.$apply(fn);
  }
};
