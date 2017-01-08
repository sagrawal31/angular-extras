'use strict';

/* global document */

/**
 * A directive to traverse the cell of any table using the arrow keys like an excel sheet. This directive needs to
 * be applied on a table element.
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
    link: function ($scope, $element) {
      var currentActiveCellIndex = 0;

      function getAboveOrBelowCellIndex(nextOrPreviousRowIndex, currentColumnIndex) {
        var cell = getCellAt(nextOrPreviousRowIndex, currentColumnIndex);
        if (cell.length > 0) {
          return $element.find('td').index(cell);
        }

        for (var i = 1; i <= currentColumnIndex; i++) {
          cell = getCellAt(nextOrPreviousRowIndex, currentColumnIndex - i);
          if (cell.length > 0) {
            return $element.find('td').index(cell);
          }
        }
      }

      function getLowerCellIndex(currentRowIndex, currentColumnIndex) {
        return getAboveOrBelowCellIndex(currentRowIndex + 1, currentColumnIndex);
      }

      function getUpperCellIndex(currentRowIndex, currentColumnIndex) {
        return getAboveOrBelowCellIndex(currentRowIndex - 1, currentColumnIndex);
      }

      function calculateNextCellIndex(e, arrow) {
        e.preventDefault();
        var currentActiveCell = angular.element('table td.active-cell');
        var currentColumnIndex = currentActiveCell.index();
        var currentRowIndex = currentActiveCell.parent().index();

        var totalColumns = $element.find('td').length;
        var nextActive = 0;

        if (arrow === 'left') { // Left or wrap
          nextActive = (currentActiveCellIndex > 0) ? currentActiveCellIndex - 1 : currentActiveCellIndex;
        } else if (arrow === 'right') { // Right or wrap
          nextActive = (currentActiveCellIndex < totalColumns - 1) ? currentActiveCellIndex + 1 : currentActiveCellIndex;
        } else if (arrow === 'up') {
          nextActive = getUpperCellIndex(currentRowIndex, currentColumnIndex);
        } else if (arrow === 'down') {
          nextActive = getLowerCellIndex(currentRowIndex, currentColumnIndex);
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

      // http://stackoverflow.com/a/10655273/2405040
      var keyMap = {};

      angular.element(document).on('keydown', function (e) {
        var keyCode = e.keyCode;
        keyMap[keyCode] = true;

        var arrow;
        if (keyCode === 37 || (keyMap[16] && keyMap[9])) {  // 16: shift key, 9: tab key
          arrow = 'left';
        } else if (keyCode === 38) {
          arrow = 'up';
        } else if (keyCode === 39 || keyCode === 9) {   // 39: right arrow, 9: tab key
          arrow = 'right';
        } else if (keyCode === 40) {
          arrow = 'down';
        }

        if (arrow) {
          calculateNextCellIndex(e, arrow);
          remarkActiveCell();
        }
      }).on('keyup', function (e) {
        keyMap[e.keyCode] = false;
      });

      angular.element(document).on('click', 'td', function () {
        currentActiveCellIndex = angular.element(this).closest('table').find('td').index(this);
        remarkActiveCell();
      });
    }
  };
});