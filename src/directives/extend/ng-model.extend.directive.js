'use strict';

(function () {
  var directiveDefinition = {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, element, $attr, ngModelCtrl) {
      if (ngModelCtrl) {
        ngModelCtrl.$element = element;
      }
    }
  };

  /**
   * Extend ng-model and add the reference to the element itself to the ngModelController.
   */
  angular.module('angular.extras.form.directives').directive('input', [function () {
    return directiveDefinition;
  }]);

  angular.module('angular.extras.form.directives').directive('select', [function () {
    return directiveDefinition;
  }]);

  angular.module('angular.extras.form.directives').directive('textarea', [function () {
    return directiveDefinition;
  }]);

}());
