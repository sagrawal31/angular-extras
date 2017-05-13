'use strict';

angular.module('angular.extras.thirdparty.services').service('AppHelperService', ['$injector', function ($injector) {

  var _this = this;

  this.userRoles = [];

  this.hasRole = function (role) {
    return this.userRoles.indexOf(role) !== -1;
  };

  this.loggedIn = function (userRoles) {
    this.userRoles = userRoles;
    this.isLoggedIn = true;
  };

  this.loggedOut = function () {
    this.userRoles = [];
    this.isLoggedIn = false;
  };

  this.setGlobalScope = function (scope) {
    this.globalScope = scope;
    this.globalVM = this.globalScope.globalCtrl;
    this.globalData = this.globalVM.globalData;
  };

  this.setRoles = function (roles) {
    this.roles = roles;
    this.setupAngularPermissions();
  };

  this.setupAngularPermissions = function () {
    if (!$injector.has('PermRoleStore')) {
      return;
    }

    var PermRoleStore = $injector.get('PermRoleStore');
    var PermPermissionStore = $injector.get('PermPermissionStore');

    PermPermissionStore.definePermission('isAuthorized', function () {
      return _this.isLoggedIn;
    });

    PermPermissionStore.definePermission('isAnonymous', function () {
      return !_this.isLoggedIn;
    });

    angular.forEach(this.roles, function (role) {
      PermRoleStore.defineRole(role, function () {
        return _this.hasRole(role);
      });
    });
  };
}]);