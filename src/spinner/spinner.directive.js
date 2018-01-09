'use strict';

/* global document */


/**
 * Use like <any-element class="some-class" ae-spinner promise="scopePromiseVariable"></any-element>
 */
angular.module('angular.extras.spinner').directive('aeSpinner', ['$templateCache', '$injector', function ($templateCache, $injector) {
  var constantName = 'angular.extras.spinner.global.template';

  return {
    restrict: 'A',
    scope: {
      promise: '=',
      template: '='
    },
    link: function ($scope, $element) {
      var spinnerTemplate = '<span class="spinner-wrapper"><i class="fa fa-spin spinner fa-spinner fa-2x"></i></span>';

      if ($scope.template) {
        spinnerTemplate = $templateCache.get($scope.template);
      } else if ($injector.has(constantName)) {
        spinnerTemplate = $templateCache.get($injector.get(constantName));
      }

      function showSpinner() {
        $element.addClass('p-relative disabled');
        $element.append(spinnerTemplate);
      }

      function hideSpinner() {
        $element.removeClass('disabled');
        $element.find('.spinner-wrapper').remove();
      }

      $scope.$watch('promise', function (newPromise) {
        if (newPromise) {
          var promise = newPromise;
          if (angular.isObject(newPromise.$promise)) {
            promise = newPromise.$promise;
          }

          // If it is not a promise
          if (!promise || !angular.isFunction(promise.then)) {
            return;
          }

          showSpinner();
          promise.finally(hideSpinner);
        }
      });
    }
  };
}]);

angular.element(document.head).prepend('<style type="text/css">.p-relative{position:relative}' +
  '.spinner-wrapper{z-index:10;font-weight:bold;position:absolute;top:0;left:0;width:100%;height:100%;background;background:rgba(255,255,255,0.7)}' +
  '.spinner{z-index:10;position:absolute !important;top:calc(50% - 14px);left:calc(50% - 12.5px)}');
