'use strict';

angular.module('angular.extras.core', []);
angular.module('angular.extras.event.directives', []);
angular.module('angular.extras.form.directives', []);
angular.module('angular.extras.list.directives', []);
angular.module('angular.extras.page.directives', []);
angular.module('angular.extras.page.directives', []);
angular.module('angular.extras.number.directives', []);
angular.module('angular.extras.thirdparty', []);
angular.module('angular.extras.core.factories', []);
angular.module('angular.extras.spinner', []);
angular.module('angular.extras.filters', []);

angular.module('angular.extras', [
  'angular.extras.core',
  'angular.extras.event.directives',
  'angular.extras.page.directives',
  'angular.extras.form.directives',
  'angular.extras.list.directives',
  'angular.extras.number.directives',
  'angular.extras.thirdparty',
  'angular.extras.core.factories',
  'angular.extras.spinner',
  'angular.extras.filters'
]);

/**
 * Accepts an String, Array or an Object and returns a boolean value indicating whether the given value is
 * empty or not. Result will be true if the given value is either empty or null.
 * assert angular.isEmpty("") === true
 * assert angular.isEmpty([]) === true
 * assert angular.isEmpty({}) === true
 * assert angular.isEmpty(null) === true
 * assert angular.isEmpty(false) === true
 * assert angular.isEmpty(undefined) === true
 * assert angular.isEmpty("ABC") === false
 * assert angular.isEmpty([1, 2, 3]) === false
 * assert angular.isEmpty({name: "xyz"}) === false
 */
angular.isEmpty = function(value) {
  if (!value) {
    return true;
  }

  if (angular.isArray(value)) {
    return value.length === 0;
  }

  if (angular.isObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (angular.isString(value)) {
    return value.length === 0;
  }

  return false;
};