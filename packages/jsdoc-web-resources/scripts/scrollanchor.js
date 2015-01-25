/*global document, window */

// Function to prevent the top navbar from obscuring the page content.
(function() {
    'use strict';

    // timeout for scrolling the window
    var TIMEOUT = 5;
    // top navbar height
    var TOP_OFFSET = 50;

    var currentHash = window.location.hash;

    function scrollTo(hash) {
        var element = document.getElementById(hash.replace(/^#/, ''));
        var elementOffset;
        var rect;

        if (element) {
            rect = element.getBoundingClientRect();
            elementOffset = rect.top + window.pageYOffset;

            setTimeout(function() {
                window.scrollTo(0, elementOffset - TOP_OFFSET);
            }, TIMEOUT);
        }
    }

    // if we're loading a URL with an anchor, scroll appropriately
    if (currentHash && currentHash !== '#') {
        scrollTo(currentHash);
    }

    // if the user clicks on an in-page anchor tag, scroll appropriately
    window.addEventListener('hashchange', function() {
        scrollTo(window.location.hash);
    });
})();
