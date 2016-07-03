'use strict';

/**
 * @ngdoc directive
 * @name pageTitle
 * @requires $window
 * @description Directive used to set page title based on the given value. This directive can be used as HTML
 * attribute accepting a value as page title. If only the directive is given but no value is given then the text
 * inside the element will be used as the page title. This is helpful when the heading of the page needs to be used
 * as page title, instead of defining the same for page title.
 */
angular.module('angular.extras.page.directives').directive('pageTitle', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function($scope, element, attr) {
            attr.$observe('pageTitle', function (title) {
                if (title) {
                    $window.document.title = title;
                }
            });
        }
    };
}]);