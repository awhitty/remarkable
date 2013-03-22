Remarkable.js
=============

Realtime inline commenting for thoughtful online content

## Installation and usage
### Dependencies
1. [Firebase](https://www.firebase.com)
2. [Zepto.js](http://zeptojs.com)
3. [Handlebars.js](http://handlebarsjs.com)
4. [Less](http://lesscss.org) (optional, for compiling CSS)
                           
### Backend
1. Set up a Firebase and prepare to use the URL for your data when setting up Remarkable.
                        
### Front-end
Just add the following imports to the `head` of your page:

```html
<!-- Firebase clients -->
<script src="https://cdn.firebase.com/v0/firebase.js"></script>

<!-- Zepto and Handlebars-->
<script src="path/to/zepto.js"></script>
<script src="path/to/handlebars.js"></script>

<!-- Remarkable styles, script, and templates -->
<link rel="stylesheet" href="path/to/remarkable.css">

<script src="path/to/remarkable.js"></script>
<script src="path/to/templates.js"></script>
```

And include the following somewhere that will run on `$(document).ready()`

```javascript
$('YOUR CONTENT WRAPPER').remarkable({
    selector: 'p',
    baseRef: 'YOUR FIREBASE URL',
})
```

## Customization and configuration</h3>
### Aesthetics
Remarkable.js styles are compiled using [LESS](http://lesscss.org) for easy customization. I encourage experimenting with different visual ideas when deploying Remarkable to establish a unique look and feel. Remarkable also uses [Handlebars.js](http://handlebarsjs.com) for templating, so feel free to experiment with the markup, but be sure to keep the general structure.

### Code
Especially in its infancy, I encourage you to make adjustments to Remarkable. I'm positive there are mistakes in the code right now, and I would love to learn how to make this project better, so please don't be afraid to contribute in any way.