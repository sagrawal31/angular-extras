'use strict';

/* global window, document */

/**
 * Returns the version of Internet Explorer or 0 if not IE.
 */
function getIEVersion() {
  var version = 0; // Return value assumes failure.

  if (window.navigator.appName === 'Microsoft Internet Explorer' || window.navigator.appName === 'Netscape') {
    var regexString;

    if (window.navigator.appName === 'Netscape') {
      regexString = 'Trident/.*rv:([0-9]{1,}[.0-9]{0,})';
    } else {
      regexString = 'MSIE ([0-9]{1,}[.0-9]{0,})';
    }

    var regex = new RegExp(regexString);
    if (regex.exec(window.navigator.userAgent) !== null) {
      version = parseFloat(RegExp.$1);
    }
  }
  return version;
}

// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isOpera = !!window.opera || window.navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3+ "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isEdge = window.navigator.userAgent.indexOf('Edge') > -1;
// Chrome 1+
var isChrome = !!window.chrome && !isOpera && !isEdge;
// At least IE6
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Silk/i.test(window.navigator.userAgent);

// Detect Mobile Browser
if(isMobile) {
  angular.element('html').addClass('is-mobile');
}
angular.module('angular.extras').run(['$rootScope', function($rootScope) {
  $rootScope.device = $rootScope.device || {};
  $rootScope.device.isMobile = isMobile;

  $rootScope.browser = $rootScope.browser || {};
  $rootScope.browser.isIE = isIE;
  $rootScope.browser.isEdge = isEdge;
  $rootScope.browser.isOpera = isOpera;
  $rootScope.browser.isChrome = isChrome;
  $rootScope.browser.isSafari = isSafari;
  $rootScope.browser.isFirefox = isFirefox;
  $rootScope.browser.ieVersion = getIEVersion();
}]);

/**
 * IE 8 & 9 don't have a console object when the dev tool is not opened.
 */
if (!window.console) {
  window.console = {log: function() {}, debug: function() {}, info: function() {}, warn: function() {}, error: function() {}};
} else if (typeof console.debug === 'undefined') {
  // IE doesn't support console.debug statements.
  console.debug = function() {};
}

if (isIE) {
  // Set CSS classes like lt-ie9 lt-ie10 lt-ie11 if IE is 8 (example)
  for (var i = getIEVersion(); i < 11; i ++) {
    angular.element(document.body).addClass('lt-ie' + (i + 1));
  }
}

var browserType = isOpera ? 'opera' : (isFirefox ? 'firefox' : (isSafari ? 'safari' : (isChrome ? 'chrome' :
  (isIE ? 'ie' : (isEdge ? 'edge' : 'other')))));

// Add type of browser to body class. Example: chrome-browser
angular.element(document.body).addClass('is-' + browserType);

// https://blog.mariusschulz.com/2015/04/08/detecting-minified-javascript-code
window.isUnminified = /param/.test(function(param) {});  // jshint ignore:line