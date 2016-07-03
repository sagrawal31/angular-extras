# Angular Extras

A light weight library to provide some extensions to Angular without jQuery.

## Usage

### 1. Install via Bower

```shell
bower install angular-extras --save
```

### 2. Add the script to your main HTML file (like index.html)

Include each file based on your need. For example:

```html
<script src="bower_components/angular-extras/dist/angular-extras-dom.min.js"></script>
```

## Description

### DOM Extras

```html
<script src="bower_components/angular-extras/dist/angular-extras-dom.min.js"></script>
```

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

----------

### Form Directives

```html
<script src="bower_components/angular-extras/dist/angular-extras.min.js"></script>
<script src="bower_components/angular-extras/dist/angular-extras-form-directives.min.js"></script>
```

Include the module:

```javascript
angular.module('myApp', ['...', 'angular.extras.form.directives'])
```

#### 1. autofocus

The attribute `autofocus` of HTML5 only works when the page load but does not focus the input element when the
contents are loaded dynamically (like when views are loaded via route or `ng-include`).

```html
<input name="email" autofocus type="email" />
```

#### 2. focus-on

Focuses the DOM element based on the expression.

```html
<input type="text" focus-on="isFocus" />
```

----------

### Page Directives

```html
<script src="bower_components/angular-extras/dist/angular-extras.min.js"></script>
<script src="bower_components/angular-extras/dist/angular-extras-page-directives.min.js"></script>
```

Include the module:

```javascript
angular.module('myApp', ['...', 'angular.extras.page.directives']);
```

#### body-classes

Set classes on the `body` element from anywhere through your DOM element.

```html
<div body-classes="'new-class another-class' {{someScopeVariable}}"></div>
```

#### email

Converts plain HTML email text to a email link.

```html
<email>john@example.com</email>
<email>{{user.email}}</email>
```

#### page-title

Set the page's `<title>` value from any DOM element.

```html
<div page-title="Users page"></div>  <!-- Will set <title>Users page</title> -->
<div page-title>Friends page</div>  <!-- Will set <title>Friends page</title> -->
```

#### url

Converts plain HTML url text to the link.

```html
<url>https://google.com</url>
<url>{{user.linkedin}}</url>
```