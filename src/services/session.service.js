'use strict';

angular
  .module('angular.extras.thirdparty.services')
  .factory('SessionService', function () {

    var isUserLoggedIn;
    var roles = [];

    return {
      hasRole: function (role) {
        return roles.indexOf(role) !== -1;
      },
      isLoggedIn: function () {
        return isUserLoggedIn;
      },
      loggedIn: function (userRoles) {
        roles = userRoles;
        isUserLoggedIn = true;
      },
      loggedOut: function () {
        roles = [];
        isUserLoggedIn = false;
      }
    };
  });