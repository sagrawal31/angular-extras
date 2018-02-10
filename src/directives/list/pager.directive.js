'use strict';

/**
 * @ngdoc directive
 * @name pagerInfo
 * @description Shows information about current pagination status of the page. This includes information about number
 * of records being shown out of total number of available records in a listing page.
 * @example
 * <code>
 *      <ae-pager-info max="itemsPerPage" page="currentPage" total="totalCount" />
 * </code>
 *
 * Use of this directive will show info for example as, "Showing from 11 to 20 of 100"
 */
angular.module('angular.extras.list.directives').directive('aePagerInfo', function () {
  return {
    restrict: 'E',
    scope: {
      max: '=',
      page: '=',
      total: '=',
      noDataMsg: '='
    },
    link: function ($scope, element) {
      $scope.$watch('page + max + total', function () {
        if ($scope.total && parseInt($scope.total)) {
          var offset = ($scope.page - 1) * $scope.max;
          var limit = offset + $scope.max;
          var from = offset + 1;
          var to = parseInt(limit > $scope.total ? $scope.total : limit);

          var html = '<small>Showing: <strong>' + from + '-' + to + '</strong> of <strong>' + $scope.total + '</strong></small>';

          element.html(html);
        } else {
          element.html($scope.noDataMsg || 'No records found.');
        }
      });
    }
  };
});
