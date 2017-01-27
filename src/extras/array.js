/* global angular */

'use strict';

/**
 * @ngdoc function
 * @name Array.prototype.collate
 * @param {Object} collateSize the length of each sub-list in the returned list
 * @description Collates this list into sub-lists of length size. Mimic Groovy's collect method for collections.
 *
 * @example
 * var anyList = [ 1, 2, 3, 4, 5, 6, 7 ];
 *
 * anyList.collate(3) == [[1, 2, 3], [4, 5, 6], [7]];
 */
Array.prototype.collate = function (collateSize) {
  var collatedList = [];

  if (collateSize <= 0) {
    return [];
  }
  angular.forEach(this, function (item, index) {
    if (index % collateSize === 0) {
      collatedList[Math.floor(index / collateSize)] = [item];
    } else {
      collatedList[Math.floor(index / collateSize)].push(item);
    }
  });

  return collatedList;
};

/**
 * @ngdoc function
 * @name Array.prototype.indexOfWithKeyValue
 * @param {String} key Key name of the object.
 * @param {Object} value Value of the key.
 * @description Works like "indexOf" method but used to get the index of any object with a given key and its value
 * in the list of objects.
 * @example
 *
 * var anyList = [{name: 'john'}, {name: 'luna'}];
 * assert anyList.indexOfWithKeyValue('name', 'luna') == 1
 * assert anyList.indexOfWithKeyValue('name', 'doe') == -1
 */
Array.prototype.indexOfWithKeyValue = function(key, value) {
  var index = -1;
  var _this = this;
  // Use "for" loop instead of Angular's "forEach" to avoid iterating a large array since "forEach" doesn't support
  // "break" https://github.com/angular/angular.js/issues/263#issuecomment-8153737
  for (var i = 0; i < this.length; i++) {
    var item = _this[i];
    if (item[key] === value) {
      index = i;
      break;
    }
  }

  return index;
};

/**
 * @ngdoc function
 * @name Array.prototype.contains
 * @param {String} key name of the object's key.
 * @param {Object} value Value of the key.
 * @description Used to check if a given key with its given value exists in the list of objects. Mimic Groovy's contains method of collections.
 * @example
 *
 * var anyList = [{name: 'john'}, {name: 'luna'}];
 * assert anyList.contains('name', 'luna') == true
 * assert anyList.contains('name', 'doe') == false
 */
Array.prototype.contains = function(key, value) {
  return this.indexOfWithKeyValue(key, value) > -1;
};

/**
 * @ngdoc function
 * @name Array.prototype.find
 * @param {String} key name of the object's key.
 * @param {Object} value Value of the key.
 * @descripton Used to find an object with a given key and its given value in the list of objects. Mimic Groovy's
 * find method of collections.
 * @example
 *
 * var anyList = [{name: 'john', rating: 31}, {name: 'luna', rating: 14}];
 * assert anyList.find('name', 'luna') == {name: 'luna', rating: 14}
 * assert anyList.find('name', 'doe') == undefined
 */
Array.prototype.find = function(key, value) {
  var index = this.indexOfWithKeyValue(key, value);
  return this[index];
};

/**
 * @ngdoc function
 * @name Array.prototype.remove
 * @param {String} key name of the object's key.
 * @param {Object} value Value of the key.
 * @description Used to remove an object with a given key and its given value from the list of objects. Mimic Groovy's remove method of collections.
 * @example
 *
 * var anyList = [{name: 'john', rating: 31}, {name: 'luna', rating: 14}];
 * assert anyList.remove('name', 'luna') == true
 * assert anyList[0].name == 'luna'
 */
Array.prototype.remove = function(key, value) {
  var index = this.indexOfWithKeyValue(key, value);

  if (index > -1) {
    this.splice(index, 1);
    return true;
  }
  return false;
};

/**
 * @ngdoc function
 * @name Array.prototype.collect
 * @param {Object} keyToCollect Key name to collect values for.
 * @description Used to collect a particular key value from a list of object. Mimic Groovy's collect method for
 * collections.
 * @example
 *
 * var anyList = [{name: 'john'}, {name: 'luna'}];
 * assert anyList.collect('name') == ['john', 'luna']
 */
Array.prototype.collect = function(keyToCollect) {
  var collectedList = [];
  angular.forEach(this, function(item) {
    collectedList.push(item[keyToCollect]);
  });

  return collectedList;
};