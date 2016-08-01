'use strict';

/* Specific to our personal use across projects */

angular
  .module('angular.extras.thirdparty.services')
  .factory('NgTableService', ['NgTableParams', function (NgTableParams) {

    return {
      getTableParams: function (model, customNgTableParameters, additionalParams) {
        var baseNgTableParameters = {
          page: 1,            // show first page
          count: 10,
          sorting: {
            id: 'asc'
          }
        };

        angular.extend(baseNgTableParameters, customNgTableParameters);

        return new NgTableParams(baseNgTableParameters, {
          getData: function (params) {
            var sorting = params.sorting();
            var sortKey = Object.keys(sorting)[0];
            var order = sorting[sortKey];

            var basicParams = {
              max: params.count(),
              page: params.page(),
              filters: params.filter(),
              sort: sortKey,
              order: order
            };

            var queryParams = angular.extend({}, basicParams, additionalParams);

            return model.query(queryParams, function (data, headerGetter) {
              var headers = headerGetter();
              params.total(headers['total-count']);

              return data;
            }).$promise;
          }
        });
      }
    };
  }]);