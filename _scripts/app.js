/**
 * BorderShare Learn where to make donations for people in need.
 * http://bordershare.gr/
 *
 * Copyright (c) 2015 SheSharp & SKGTech
 * @author Theodore Kelloglou
 * @author Thanasis Polychronakis
 * @author Andigoni Founta
 *
 * @fileOverview The Front Application bootstrap file.
 */

var Parse = require('parse');
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
require('./config/route.config');

// initialize parse
Parse.initialize('ka61YPSHXHZgsaVEUwIZpWeOvLoBD63sRgoBi85N',
    '7kKk2X1i2RKJVr19Dw7F2Gldq9tsf304GBP0thIe');
