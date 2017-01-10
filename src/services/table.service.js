'use strict';

angular
  .module('angular.extras.core')
  .factory('AeTableService', ['NgTableParams', '$q', function () {
    return {
      /**
       * Process a row column bases object-array structure and generate excel like cell number. The input should be
       * like:
       *
       * var rows = [{
       *     columns: [{
       *         text: 'Foo'     // any custom data
       *     }, {
       *         text: 'Bar'
       *     }, {
       *         text: 'Ok'
       *     }]
       * }, {
       *    columns: [{
       *        text: 'Foo Bar',
       *        colspan: 2      // Supports colspan
       *    }, {
       *        text: 'Ok'
       *    }]
       * }]
       *
       * This method will convert it to like:
       *
       * var rows = [{
       *     rowNumber: 1,
       *     columns: [{
       *         text: 'Foo'
       *         columnNumber: 1,
       *         cellNumber: 'A1'
       *     }, {
       *         text: 'Bar'
       *         columnNumber: 2,
       *         cellNumber: 'B1'
       *     }, {
       *         text: 'Ok'
       *         columnNumber: 3,
       *         cellNumber: 'C1'
       *     }]
       * }, {
       *    columns: [{
       *        text: 'Foo Bar',
       *        colspan: 2,
       *        columnNumber: 1,
       *        cellNumber: 'A2'
       *    }, {
       *        text: 'Ok',
       *        columnNumber: 3,
       *        cellNumber: 'C2'
       *    }]
       * }]
       */
      generateCellNumber: function (rows) {
        angular.forEach(rows, function (row, rowIndex) {
          row.rowNumber = rowIndex + 1;

          angular.forEach(row.columns, function (column, columnIndex) {
            var columnNumber = columnIndex + 1;

            row.mergedColumns = row.mergedColumns || 0;
            columnNumber += row.mergedColumns;

            // We need to also consider the colspan values in order to generate proper column number
            if (column.colspan) {
              row.mergedColumns += column.colspan;
            }
            if (column.colspan > 0) {
              row.mergedColumns--;
            }

            column.columnNumber = columnNumber;

            // Calculate the cell number like an excel sheet
            column.cellNumber = String.fromCharCode(columnNumber + 64) + row.rowNumber;
          });
        });
      }
    };
  }]);