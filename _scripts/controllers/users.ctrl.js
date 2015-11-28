/**
 * @fileOverview The Users controller.
 */

var Parse = require('parse');

var helpers = require('../util/helpers');

var UsersCtrl = module.exports = function($rootScope, $scope, $log) {

  $log.log('app.ctrl.UsersCtrl() :: Init');

  this.$log = $log;
  this.$rootScope = $rootScope;

  /** @type {Object} User data object */
  this.user = {
    // name: null,
    email: null,
    password: null,
  };

  /** @type {Boolean} Indicates login error */
  this.loginError = false;

};

/**
 * Sign up user.
 *
 */
UsersCtrl.prototype.signup = function() {
  console.log('here', this.user.email, this.password);
  var user = new Parse.User();
  // console.log('here', this.user.name, this.user);
  user.set('username', this.user.email);
  user.set('password', this.user.password);
  user.set('email', this.user.email);

  // other fields can be set just like with Parse.Object
  // user.set('phone', '415-392-0202');

  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      console.log('userrrrr', user);
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      console.log('Error: ' + error.code + ' ' + error.message);
    }
  });
};

/**
 * Perform user login.
 *
 */
UsersCtrl.prototype.login = function() {
  this.loginError = false;
  var self = this;
  Parse.User.logIn(this.user.email, this.user.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log('userrrrr', user);
    },
    error: function(user, error) {
      self.loginError = true;
      // The login failed. Check error to see why.
      self.$log.log('app.ctrl.login() :: Error logging in, code:', error.code,
        'message:', error.message);
      helpers.safeApply(self.$rootScope);
    }
  });
};

angular.module('app')
  .controller('UsersCtrl', ['$rootScope', '$scope', '$log',
    UsersCtrl
  ]);
