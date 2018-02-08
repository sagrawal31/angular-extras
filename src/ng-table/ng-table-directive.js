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

          $scope.$on('$locationChangeStart', function () {
            AeNgTableService.updateParams(ngTableParams, $location.search());
          });
        }
      };
    }]);