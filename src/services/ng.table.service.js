'use strict';

/* Specific to our personal use across projects */

angular
  .module('angular.extras.thirdparty.services')
  .factory('NgTableService', ['NgTableParams', '$q', function (NgTableParams, $q) {

    return {
      getTableParams: function (model, customNgTableParameters, additionalParams, callback) {
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

            var deferred = $q.defer();

            var queryParams = angular.extend({}, basicParams, additionalParams);
            model.query(queryParams, function (data, headerGetter) {
              var headers = headerGetter();
              params.total(headers['total-count']);
              if(callback) {
                callback(data);
              }
              if(data.result) {
                deferred.resolve(data.result);
              } else {
                deferred.resolve(data);
              }
            });

            return deferred.promise;
          }
        });
      }
    };
  }]);