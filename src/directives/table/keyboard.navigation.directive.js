'use strict';

/* global document */

/**
 * A directive to traverse the cell of any table using the arrow keys.
 */
angular.module('angular.extras.number.directives').directive('keyboardNavigation', function () {

  /**
   * Get the DOM element of the cell at given row index and given column index.
   * @param rowIndex
   * @param columnIndex
   */
  function getCellAt(rowIndex, columnIndex) {
    return angular.element('tr:eq(' + rowIndex + ') td:eq(' + columnIndex + ')');
  }

  return {
    restrict: 'A',
    link: function () {
      var currentActiveCellIndex = 0;

      function getAboveOrBelowCellIndex(nextOrPreviousRowIndex, currentColumnIndex) {
        var cell = getCellAt(nextOrPreviousRowIndex, currentColumnIndex);
        if (cell.length > 0) {
          return angular.element('td').index(cell);
        }

        for (var i = 1; i <= currentColumnIndex; i++) {
          cell = getCellAt(nextOrPreviousRowIndex, currentColumnIndex - i);
          if (cell.length > 0) {
            return angular.element('td').index(cell);
          }
        }
      }

      function getBelowCellIndex(currentRowIndex, currentColumnIndex) {
        return getAboveOrBelowCellIndex(currentRowIndex + 1, currentColumnIndex);
      }

      function getAboveCellIndex(currentRowIndex, currentColumnIndex) {
        return getAboveOrBelowCellIndex(currentRowIndex - 1, currentColumnIndex);
      }

      function calculateNextCellIndex(e) {
        var currentActiveCell = angular.element('table td.active-cell');
        var currentColumnIndex = currentActiveCell.index();
        var currentRowIndex = currentActiveCell.parent().index();

        var totalColumns = angular.element('table td').length;
        var nextActive = 0;

        if (e.keyCode === 37) { // move left or wrap
          nextActive = (currentActiveCellIndex > 0) ? currentActiveCellIndex - 1 : currentActiveCellIndex;
        }
        if (e.keyCode === 38) { // move up
          nextActive = getAboveCellIndex(currentRowIndex, currentColumnIndex);
        }
        if (e.keyCode === 39) { // move right or wrap
          nextActive = (currentActiveCellIndex < totalColumns - 1) ? currentActiveCellIndex + 1 : currentActiveCellIndex;
        }
        if (e.keyCode === 40) { // move down
          nextActive = getBelowCellIndex(currentRowIndex, currentColumnIndex);
        }

        currentActiveCellIndex = nextActive || currentActiveCellIndex;
      }

      function remarkActiveCell() {
        angular.element('.active-cell input').blur();
        angular.element('.active-cell').removeClass('active-cell');

        var $td = angular.element('table tr td').eq(currentActiveCellIndex);
        $td.addClass('active-cell');
        $td.find('input').focus();
      }

      angular.element(document).keydown(function (e) {
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
          calculateNextCellIndex(e);
          remarkActiveCell();
        }
      });

      angular.element(document).on('click', 'td', function () {
        currentActiveCellIndex = angular.element(this).closest('table').find('td').index(this);
        remarkActiveCell();
      });
    }
  };
});