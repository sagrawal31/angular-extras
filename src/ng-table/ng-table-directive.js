'use strict';

angular.module('angular.extras.thirdparty')
  .directive('aeNgTable', ['AeNgTableService', '$location',
    function (AeNgTableService, $location) {
      return {
        restrict: 'A',
        scope: {
          ngTableParams: '=aeNgTable'
        },
        link: function ($scope) {
          var ngTableParams = $scope.ngTableParams;

          // This will only be needed for non-HTML5 URL mode
          $scope.$on('$locationChangeStart', function () {
            AeNgTableService.updateParams(ngTableParams, $location.search());
          });
        }
      };
    }]);