# Nano.js

Nano is a tiny JavaScript DOM manipulation library under 3KB. Nano using the same prototype chaining method as jQuery and has browser support for Internet Explorer 8+, Firefox 5+, Opera 10+, Chrome and Safari.

## Install

Use the compiled file in the `dist` folder. Ensure you place the script file
before the closing `</body>` tag.

```html
<html>
    <head>
        <title>Nano</title>
    </head>
    <body>
        <!-- html code -->
        <script src="dist/nano.min.js"></script>
    </body>
</html>
```

## Use

Use this library with `$()` or `nano()`, The `$` is just an alias to `nano`.

```js
// Select an element by selector
$('.element');

// Return first element in array
$('.element').first();

// Return last element in array
$('.element').last();

// Check if element has class
$('.element').hasClass('className');

// Add class to element
$('.element').addClass('className');

// Remove class from element
$('.element').removeClass('className');

// Toggle class on element
$('.element').toggleClass('className');

// Add event
$('.element').on('click', function () {});

// Remove event
$('.element').off('click', function () {});

// Determine if an element is in viewport
$('.element').inview();
```
