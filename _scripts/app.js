/**
 * BorderShare Learn where to make donations for people in need.
 * http://bordershare.gr/
 *
 * Copyright (c) 2015 SheShar & SKGTech
 * @author Theodore Kelloglou
 * @author Thanasis Polychronakis
 * @author Andigoni Founta
 *
 * @fileOverview The Front Application bootstrap file.
 */

require('angular/angular');
require('angular-route/angular-route');

/**
 * Master boot of angular app
 *
 */
angular.module('app', [
  'ngRoute',
]);

// Templates

// Require components
require('./config/logger.config');

// Page scripts
require('./parse');
