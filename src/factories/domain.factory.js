'use strict';

/* Specific to our personal use across projects */

angular
  .module('angular.extras.core.factories')
  .factory('DomainFactory', ['$resource', function($resource) {

    return function (url, paramDefaults, actions, options) {
      var resourceActions = {'update': {method: 'PUT'}, 'list': {method: 'GET', isArray: true}};
      angular.extend(resourceActions, actions);

      return $resource(
        url,
        paramDefaults || null,
        resourceActions,
        options || {}
      );
    };
  }]);

