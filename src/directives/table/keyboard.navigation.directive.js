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
angular.module('angular.extras.core').directive('keyboardNavigation', function () {

  /**
   * Get the DOM element of the cell at given row index and given column index.
   * @param rowIndex
   * @param columnIndex
   */
  function getCellAt($tableElement, rowIndex, columnIndex) {
    if (rowIndex === null) {
      return $tableElement.find('tr td:eq(' + columnIndex + ')');
    }

    return $tableElement.find('tr:eq(' + rowIndex + ') td:eq(' + columnIndex + ')');
  }

  var typableSelector = ['input', 'select', 'textarea'].join(':not(:disabled):not([readonly]),');

  return {
    restrict: 'A',
    scope: true,
    link: function ($scope, $element, $attr) {
      // Index of the cell (td) among all the cells (td)
      var currentActiveCellIndex = 0, recursiveCallCount = 0, lastCellIndexWithInput;
      var colspanEncountered = false, columnIndexBeforeColspan;

      var onlySelectCellWithInput = $attr.autoScrollToCell === undefined || $attr.autoScrollToCell === true;

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
        var currentActiveCell = getCellAt($element, null, currentActiveCellIndex);
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

        if (onlySelectCellWithInput) {
          var totalColumns = $element.find('td').length;
          var $cell = getCellAt($element, null, currentActiveCellIndex);
          var $input = $cell.find(typableSelector);

          // After navigation, if next active cell doesn't have any input fields then do a recursive call
          // to find the next active cell till we find a cell with an input field
          if ($input.length === 0) {
            // The recursive call count can not be greater then then number of columns to lookup the next cell with
            // an input. TODO This might be the worst fix to handle stackoverflow due to recursive calls.
            var recursiveCallExceededNumberOfColumns = recursiveCallCount > totalColumns;

            if (!recursiveCallExceededNumberOfColumns) {
              recursiveCallCount++;
              console.log('Recursive call to find the next active cell with any input');
              calculateNextCellIndex(e, arrow);
            } else {
              recursiveCallCount = 0;
              // Now since we didn't find any next active cell with an input after searching for n number of times
              // (n = number of columns), we can just reset the current cell index to the last cell index that has
              // an input
              currentActiveCellIndex = lastCellIndexWithInput;
            }
          }
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
        recursiveCallCount = 0;
        $element.find('.active-cell').removeClass('active-cell');

        var $cellToMarkActive = $element.find('tr td:eq(' + currentActiveCellIndex + ')');
        $cellToMarkActive.addClass('active-cell');
        var $input = $cellToMarkActive.find('input,textarea,select');

        if ($input.length !== 0) {
          $input.focus();
          lastCellIndexWithInput = currentActiveCellIndex;
        } else {
          angular.element('input,textarea,select').blur();
        }

        if ($attr.hasOwnProperty('autoScrollToCell')) {
          scrollViewToCell();
        }
      }

      // http://stackoverflow.com/a/10655273/2405040
      var keyMap = {};
      var keydownEventListener = function (e) {
        var keyCode = e.keyCode;
        keyMap[keyCode] = true;

        var arrow;
        if (keyCode === 37 || (keyMap[16] && keyMap[9])) {  // 16: shift key, 9: tab key
          arrow = 'left';
        } else if (keyCode === 38) {
          arrow = 'up';
        } else if (keyCode === 39 || keyCode === 9) {   // 39: right arrow, 9: tab key
          arrow = 'right';
        } else if (keyCode === 40 || keyCode === 13) {
          arrow = 'down';
        }

        if (arrow) {
          e.preventDefault();
          e.stopPropagation();
          calculateNextCellIndex(e, arrow);
          remarkActiveCell();
        }
      };

      var keyupEventListener = function (e) {
        keyMap[e.keyCode] = false;
      };

      var clickEventListener = function () {
        currentActiveCellIndex = angular.element(this).closest($element).find('td').index(this);
        // We'll not maintain the proper colspan position if user manually clicks somewhere
        colspanEncountered = false;
        remarkActiveCell();
      };

      // Click event can be listened on a particular td element but keydown events can only be listen if td has input
      // So if want to navigate to input with non-editable cells then we need to register the listner on document
      var elementToRegisterEvent = onlySelectCellWithInput ? $element : document;
      angular.element(elementToRegisterEvent).on('keydown', keydownEventListener).on('keyup', keyupEventListener);
      angular.element($element).on('click', 'td', clickEventListener);

      $scope.$on('$destroy', function () {
        angular.element(elementToRegisterEvent).off('keydown', keydownEventListener).off('keyup', keyupEventListener);
        angular.element($element).off('click', 'td', clickEventListener);
      });
    }
  };
});