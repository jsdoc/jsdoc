/* global document, window */
// Function to prevent the top navbar from obscuring the page content.
(function() {
    // timeout for scrolling the window
    const TIMEOUT = 5;
    // top navbar height
    const TOP_OFFSET = 50;

    function scrollTo(hash) {
        const element = document.getElementById(hash.replace(/^#/, ''));
        let elementOffset;
        let rect;

        if (element) {
            rect = element.getBoundingClientRect();
            elementOffset = rect.top + window.pageYOffset;

            setTimeout(function() {
                window.scrollTo(0, elementOffset - TOP_OFFSET);
            }, TIMEOUT);
        }
    }

    window.addEventListener('load', function() {
        const currentHash = window.location.hash;

        // if we're loading a URL with an anchor, scroll appropriately
        if (currentHash && currentHash !== '#') {
            scrollTo(currentHash);
        }

        // if the user clicks on an in-page anchor tag, scroll appropriately
        window.addEventListener('hashchange', function() {
            scrollTo(window.location.hash);
        });
    });
})();
