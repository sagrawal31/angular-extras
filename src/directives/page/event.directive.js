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

/**
 * @ngdoc directive
 * @name stopBubbling
 * @description When applied to any element, this will stop the click event to bubble up the DOM tree.
 */
angular.module('angular.extras.event.directives').directive('stopBubbling', function () {
  return {
    restrict: 'A',
    link: function ($scope, $element) {
      $element.on('click', function (e) {
        e.stopPropagation();
      });
    }
  };
});

/**
 * @ngdoc directive
 * @name preventDefault
 */
angular.module('angular.extras.event.directives').directive('preventDefault', function () {
  return {
    restrict: 'A',
    link: function ($scope, $element) {
      $element.on('click', function (e) {
        e.preventDefault();
      });
    }
  };
});