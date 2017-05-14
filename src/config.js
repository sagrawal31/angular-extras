'use strict';

angular.module('angular.extras.core').run(function ($rootScope, $state, $stateParams, $http) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.currentDate = new Date();
  $http.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
});