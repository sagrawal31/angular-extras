'use strict';

angular.module('angular.extras.thirdparty').service('AppHelperService', ['$injector', function ($injector) {

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

  this.resumeURLRouter = function () {
    if (!$injector.has('$urlRouter')) {
      return;
    }

    // Getting the dependency dynamically to avoid the dependency of ui-router library where it is not used
    var $urlRouter = $injector.get('$urlRouter');

    // Once permissions are set-up
    // kick-off router and start the application rendering
    $urlRouter.sync();
    // Also enable router to listen to url changes
    $urlRouter.listen();
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

    // Getting the dependency dynamically to avoid the dependency of ui-router library where it is not used
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