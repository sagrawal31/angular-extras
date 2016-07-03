'use strict';

/**
 * Since the attribute "autofocus" of HTML5 only works on page load and does not focus the element when the input
 * field is loaded dynamically.
 *
 * This directive using default HTML attribute `autofocus` to set focus to input element when the same view
 * is already loaded but could not acquire focus automatically.
 */
angular.module('angular.extras.form.directives').directive('autofocus', [function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element[0].focus();
    }
  };
}]);

/**
 * A directive to mimic HTML5 "autofoucs" but only apply focus based on the given expression.
 * @example <code>
 *              <input type="text" focus-on="isFocus">
 *          </code>
 * @attr focusOn boolean Based on which focus would be applied
 */
directives.directive('focusOn', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.focusOn, function (isFocus) {
        if (angular.isDefined(isFocus) && isFocus) {
          $timeout(function () {
            element[0].focus();
          });
        }
      }, true);
    }
  };
}]);