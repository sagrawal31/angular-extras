'use strict';

/**
 * Simple directive to convert number to words. Examples:
 *
 * <to-word number="12345"></to-word>                   ==>     Twelve Thousand Three hundred Forty Five
 * <to-word number="12345" suffix="'Only'"></to-word>   ==>     Twelve Thousand Three hundred Forty Five Only
 */
angular.module('angular.extras.number.directives').directive('toWord', function () {
  var specialNames = ['', ' Thousand', ' Million', ' Billion', ' Trillion', ' Quadrillion', 'Quintillion'];

  var tensNames = [
    '', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'
  ];

  var numNames = ['', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine',
    'Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen',
    'Seventeen', ' Eighteen', ' Nineteen'
  ];

  function convertLessThanOneThousand(numberToConvert) {
    var current;

    if (numberToConvert % 100 < 20) {
      current = numNames[parseInt(numberToConvert % 100)];
      numberToConvert = parseInt(numberToConvert / 100);
    } else {
      current = numNames[parseInt(numberToConvert % 10)];
      numberToConvert = parseInt(numberToConvert / 10);

      current = tensNames[parseInt(numberToConvert % 10)] + current;
      numberToConvert = parseInt(numberToConvert / 10);
    }

    if (numberToConvert === 0) {
      return current;
    }

    return numNames[numberToConvert] + ' hundred' + current;
  }

  function numberToWords(numberToConvert, suffix) {
    if (!numberToConvert) {
      return '';
    }

    if (numberToConvert === 0) {
      return 'zero';
    }

    var prefix = '';

    if (numberToConvert < 0) {
      numberToConvert = -numberToConvert;
      prefix = '(negative)';
    }
    var current = '';
    var place = 0;
    while (numberToConvert > 0) {
      var n = parseInt(numberToConvert % 1000);
      if (n !== 0) {
        var s = convertLessThanOneThousand(n);
        current = s + specialNames[place] + current;
      }

      place++;
      numberToConvert = parseInt(numberToConvert / 1000);
    }

    var words = prefix + ' ' + current;
    if (suffix) {
      words += ' ' + suffix;
    }

    return words;
  }

  return {
    restrict: 'E',
    scope: {
      number: '=',
      suffix: '='
    },
    link: function ($scope, $element) {
      $scope.$watch('number', function (newValue) {
        $element.html(numberToWords(newValue, $scope.suffix));
      });
    }
  };
});