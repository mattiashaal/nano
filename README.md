# Nano.js

Nano is a tiny JavaScript DOM manipulation library under 3KB. Nano using the prototype chaining method, just like jQuery. Nano has browser support for Internet Explorer 9+, Firefox 5+, Opera 10+, Chrome and Safari.

## Install with Bower
```
bower install nano.js
```

## Install manually

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

Use this library with `$()` or `nano()`. The `$` is just an alias to `nano`.

```js
// Select an element by selector
$('.class');
$('#id');
$('tag');

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

// Deal with animation and rendering with requestAnimationFram (rAF)
$('.element').rAF();

// Check if DOM is ready before executing code
$.ready(function() {
    console.log('DOM is ready!');
});
```
