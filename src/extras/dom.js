/**
 * Created by Shashank on 15/06/16.
 */

/* global document */

'use strict';


/**
 * @ngdoc function
 * @name angular.element.prototype.find
 * @param {String} selector name.
 * @description Mimic jQuery find method
 * Returns the first element within the document that matches the specified group of selectors.
 * This methods are injected to angular.element() instances.
 * @example
 * var element = domElement.find(".form");
 * var element = domElement.find("#form");
 */
angular.element.prototype.find = function(selector) {
    return angular.element(this[0].querySelector(selector));
};

/**
 * @ngdoc function
 * @name angular.element.prototype.findAll
 * @param {String} selector name.
 * @description Mimic jQuery find method
 * Returns a list of the elements within the document within the document that matches the specified group of selectors.
 * This methods are injected to angular.element() instances.
 *
 * @example
 * var elementList = domElement.findAll(".form");
 * var elementList = domElement.findAll("#form");
 */
angular.element.prototype.findAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
};

/**
 * @ngdoc function
 * @name angular.element.prototype.parents
 * @param {String} selector name (optional).
 * @description Mimic jQuery find method
 * Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.
 * This methods are injected to angular.element() instances.
 *
 * @example
 * var parents = domElement.parents(".form");
 * var parents = domElement.parents("#form");
 */
angular.element.prototype.parents = function(selector) {
    // At least IE6
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    var element = this[0];
    var parents = [];

    // Traverse element's ancestor tree until the upto the root and pushing all the ancestors to an array.
    while (element.parentNode.parentNode) {
        element = element.parentNode;

        // Get the ancestors of element filtered by a selector (if any)
        if (selector) {
            if (isIE) {
                /*
                 * For IE versions less then 9. Since Microsoft introduces msMatchesSelector method from 9.
                 * @see Browser compatibility in https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                 */
                if (element.msMatchesSelector(selector)) {
                    parents.push(element);
                }
            } else {
                if (element.matches(selector)) {
                    parents.push(element);
                }
            }
        } else {
            // If no selector is defined then get all the ancestors with no filtering
            parents.push(element);
        }
    }
    return angular.element(parents);
};

/**
 * @ngdoc function
 * @name angular.element.prototype.closest
 * @param {String} selector name.
 * @description Mimic jQuery's closest method
 * For each element in the set, get the first element that matches the selector by testing the element itself and
 * traversing up through its ancestors in the DOM tree.
 *
 * @example
 * var parents = domElement.closest(".form");
 * var parents = domElement.closest("#form");
 *
 * Source http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery
 * TODO Use closest directly later https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
 */
angular.element.prototype.closest = function(selector) {
    var el = this[0];
    var closestElement;

    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            closestElement = parent;
            break;
        }
        el = parent;
    }

    return angular.element(closestElement);
};