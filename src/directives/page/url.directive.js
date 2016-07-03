'use strict';

/**
 * @ngdoc directive
 * @name url
 * @description A directive used to auto add a link for any URL.
 * @example
 *
 * <url>https://google.com</url> ==> <a href="https://google.com">https://google.com</a>
 * <url>{{user.linkedin}}</url>
 */
angular.module('angular.extras.page.directives').directive('url', function () {
  return {
    restrict: 'E',
    replace: true,
    template: function (element) {
      return '<a href="' + element.html() + '">' + element.html() + '</a>';
    }
  };
});
