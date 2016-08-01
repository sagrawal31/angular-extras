'use strict';

/**
 * @ngdoc directive
 * @name ngEnter
 */
angular.module('angular.extras.event.directives').directive('ngEnter', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    }
  };
});