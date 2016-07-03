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
Array.prototype.collate = function(collateSize) {
    var collatedList = [];

    if (collateSize <= 0) {
        return [];
    }
    angular.forEach(this, function(item, index) {
        if (index % collateSize === 0) {
            collatedList[Math.floor(index / collateSize)] = [item];
        } else {
            collatedList[Math.floor(index / collateSize)].push(item);
        }
    });

    return collatedList;
};