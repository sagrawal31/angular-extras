'use strict';

/* global document, window */

/**
 * A directive to traverse the cell of any table using the arrow keys like an excel sheet. This directive needs to
 * be applied on a table element.
 *
 * Currently supports the colspan attribute to properly traverse the cells. TODO Add support for rowspan.
 *
 * For example: <table class="table table-bordered" keyboard-navigation></table> and consider a table
 *
 *      A    B    C    D
 *     ---------------------
 * 1   | A1 | B1 | C1 | D1 |
 *     ---------------------
 * 2   | A2 | B2           |              (B2 having colspan="3")
 *     ---------------------
 * 3   | A3 | B3 | C3 | D3 |
 *     ---------------------
 * 4   | A4 | B4 | C4      |              (C3 having colspan="2")
 *     ---------------------
 *
 * See a working example here http://codepen.io/shashank-agrawal/pen/EZjBvz
 */
angular.module('angular.extras.number.directives').directive('keyboardNavigation', function () {

  /**
   * Get the DOM element of the cell at given row index and given column index.
   * @param rowIndex
   * @param columnIndex
   */
  function getCellAt($tableElement, rowIndex, columnIndex) {
    return $tableElement.find('tr:eq(' + rowIndex + ') td:eq(' + columnIndex + ')');
  }

  return {
    restrict: 'A',
    link: function ($scope, $element) {
      // Index of the cell (td) among all the cells (td)
      var currentActiveCellIndex = 0;
      var colspanEncountered = false, columnIndexBeforeColspan;

      function getAboveOrBelowCellIndex(rowIndex, currentColumnIndex) {
        // Suppose we are on C3 and hit the down key, then we check if a cell exists at C4
        var cell = getCellAt($element, rowIndex, currentColumnIndex);
        if (cell.length > 0) {
          colspanEncountered = false;
          return $element.find('td').index(cell);
        }

        // If that don't exists that means, either we are on top/bottom most row or the cell at same position at
        // above/below row might be a cell with "colspan" value. So we need to check previous cell at the same row.
        // Suppose we are on D3 and hit up arrow key, then first check if D2 exists then if D1 exists
        for (var i = 1; i <= currentColumnIndex; i++) {
          cell = getCellAt($element, rowIndex, currentColumnIndex - i);

          if (cell.length > 0) {
            colspanEncountered = true;
            return $element.find('td').index(cell);
          }
        }
      }

      function getLeftCellIndex() {
        var newIndex = currentActiveCellIndex - 1;

        // If no new index or index goes to negative
        return (newIndex === undefined || newIndex < 0) ? currentActiveCellIndex : newIndex;
      }

      function getRightCellIndex() {
        var newIndex = currentActiveCellIndex + 1;
        var totalColumns = $element.find('td').length;

        // If no new index or new index crosses the total number of columns
        return (newIndex === undefined || newIndex > (totalColumns - 1)) ? currentActiveCellIndex : newIndex;
      }

      function getLowerCellIndex(currentRowIndex, currentColumnIndex) {
        var newIndex = getAboveOrBelowCellIndex(currentRowIndex + 1, currentColumnIndex);
        if (colspanEncountered) {
          columnIndexBeforeColspan = currentColumnIndex;
        }

        // If no new index then be on the same index
        return newIndex === undefined ? currentActiveCellIndex : newIndex;
      }

      function getUpperCellIndex(currentRowIndex, currentColumnIndex) {
        var newIndex = getAboveOrBelowCellIndex(currentRowIndex - 1, currentColumnIndex);
        if (colspanEncountered) {
          columnIndexBeforeColspan = currentColumnIndex;
        }

        // If no new index then be on the same index
        return newIndex === undefined ? currentActiveCellIndex : newIndex;
      }

      function calculateNextCellIndex(e, arrow) {
        var currentActiveCell = $element.find('td.active-cell');
        // Index of the active column among all columns in the current/parent row
        var currentColumnIndex = colspanEncountered ? columnIndexBeforeColspan : currentActiveCell.index();
        // Index of the current row amount all rows
        var currentRowIndex = currentActiveCell.parent().index();

        if (arrow === 'left') {
          // Reset it as we have moved left
          colspanEncountered = false;
          currentActiveCellIndex = getLeftCellIndex(currentRowIndex, currentColumnIndex);
        } else if (arrow === 'right') {
          // Reset it as we have moved right
          colspanEncountered = false;
          currentActiveCellIndex = getRightCellIndex(currentRowIndex, currentColumnIndex);
        } else if (arrow === 'up') {
          currentActiveCellIndex = getUpperCellIndex(currentRowIndex, currentColumnIndex);
        } else if (arrow === 'down') {
          currentActiveCellIndex = getLowerCellIndex(currentRowIndex, currentColumnIndex);
        }
      }

      function scrollViewToCell() {
        var target = $element.find('td:eq(' + currentActiveCellIndex + ')');
        if (target.length) {
          var top = target.offset().top;

          // This will require jQuery. TODO Port to angular
          if (window.jQuery) {
            angular.element('html,body').stop().animate({scrollTop: top - 120}, 400);
          }
          return false;
        }
      }

      function remarkActiveCell() {
        //$element.find('.active-cell input,textarea,select').blur();
        $element.find('.active-cell').removeClass('active-cell');

        var $cellToMarkActive = $element.find('tr td:eq(' + currentActiveCellIndex + ')');
        $cellToMarkActive.addClass('active-cell');
        $cellToMarkActive.find('input,textarea,select').focus();

        scrollViewToCell();
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
          e.preventDefault();
          e.stopPropagation();
          calculateNextCellIndex(e, arrow);
          remarkActiveCell();
        }
      }).on('keyup', function (e) {
        keyMap[e.keyCode] = false;
      });

      angular.element(document).on('click', 'td', function () {
        currentActiveCellIndex = angular.element(this).closest($element).find('td').index(this);
        // We'll not maintain the proper colspan position if user manually clicks somewhere
        colspanEncountered = false;
        remarkActiveCell();
      });
    }
  };
});