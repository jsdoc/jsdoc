/* global document */
(function() {
    let counter = 0;
    let numbered;
    let source = document.getElementsByClassName('prettyprint');

    if (source && source[0]) {
        source = source[0].getElementsByTagName('code')[0];

        numbered = source.innerHTML.split('\n');
        numbered = numbered.map(function(item) {
            counter++;

            return '<span id="source-line-' + counter + '" class="line"></span>' + item;
        });

        source.innerHTML = numbered.join('\n');
    }
})();
