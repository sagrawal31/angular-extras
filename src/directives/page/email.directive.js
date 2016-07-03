'use strict';

/**
 * @ngdoc directive
 * @name email
 * @description A directive used to auto add a anchor email link for any email address.
 * @example
 *
 * <email>john@example.com</email> ==> <a href="mailto:john@example.com">john@example.com</a>
 * <email>{{user.email}}</email>
 */
angular.module('angular.extras.page.directives').directive('email', function () {
  return {
    restrict: 'E',
    replace: true,
    template: function (element) {
      return '<a href="mailto:' + element.html() + '">' + element.html() + '</a>';
    }
  };
});
