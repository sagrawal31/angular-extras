'use strict';

angular.module('angular.extras.filters').filter('isEmpty', function () {
  return function (value) {
    return angular.isEmpty(value);
  };
});

angular.module('angular.extras.filters').filter('htmlToText', function () {

  return function (text, limit) {
    if (!text) {
      return '';
    }
    text = text.trim();

    var plainText = text ? String(text).replace(/<[^>]+>/gm, '') : '';
    if (!limit) {
      return plainText;
    }

    plainText = plainText.split(' ').splice(0, limit).join(' ');
    plainText += ' ...';
    return plainText;
  };
});