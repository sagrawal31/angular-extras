# Angular Extras

A light weight library to provide some extensions to Angular without jQuery.

## Usage

### 1. Install via Bower

```shell
bower install angular-extras --save
```

### 2. Add the script to your main HTML file (like index.html)

(Include each file based on your need.)

```html
<script src="bower_components/angular-extras/dist/angular-extras-dom.min.js"></script>
```

## Description

### DOM Extras

This module provides some DOM related helper methods like jQuery but without using jQuery. All of the following
methods return the instance of jQLite.

#### 1. find(selector)

Get the descendant of element in the current set of matched elements, filtered by a selector.

```javascript
angular.find('div');        // Get the first DIV element in the body
someDomeElementInDirective.find('input');       // Find the first input element in the directive's element
```

#### 2. findAll(selector)

```javascript
angular.findAll('div');        // Get all the descendant DIV elements in the body
someDomeElementInDirective.findAll('input');       // Find all the descendant input elements in the directive's element
```

#### 3. parents(selector)

```javascript
someDomeElementInDirective.parents('div.foo');       // Find all the parent DIV elements with class "foo"
```

#### 4. closest(selector)

```javascript
someDomeElementInDirective.closest('div.foo');       // Find all the parent DIV elements including self with class "foo"
```