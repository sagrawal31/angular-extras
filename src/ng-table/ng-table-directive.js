'use strict';

angular.module('angular.extras.thirdparty')
  .directive('aeNgTable',
    function ($location) {

      function _updateParams(parametersToUpdate, parametersFromURL) {
        var temporaryParams = {
          count: parametersFromURL.max,
          page: parametersFromURL.page
        };

        if (parametersFromURL.sort) {
          var sorting = {};
          sorting[parametersFromURL.sort] = parametersFromURL.order || 'asc';
          temporaryParams.sorting = sorting;
        }

        if (parametersFromURL.filters) {
          try {
            temporaryParams.filter = JSON.parse(parametersFromURL.filters);
          } catch (e) {
            console.error('Error parsing filters.', e);
            temporaryParams.filter = {};
          }
          // Do not use params.filter() or params.count() because they are setting the page back to 1
        }

        parametersToUpdate.parameters(temporaryParams);
      }

      return {
        restrict: 'A',
        scope: {
          ngTableParams: '=aeNgTable'
        },
        link: function ($scope) {
          var ngTableParams = $scope.ngTableParams;

          $scope.$on('$locationChangeSuccess', function (e, newURL, oldURL) {
            var updateParameters = true;

            if (newURL && oldURL) {
              var newURLBasePath = newURL.substring(0, newURL.indexOf('?'));
              var oldURLBasePath = oldURL.substring(0, oldURL.indexOf('?'));
              // only update the URL if we are on the same state/route not while changing the state/route
              updateParameters = newURLBasePath === oldURLBasePath;
            }

            if (updateParameters) {
              _updateParams(ngTableParams, $location.search());
            }
          });
        }
      };
    });