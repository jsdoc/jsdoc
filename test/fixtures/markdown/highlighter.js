'use strict';

exports.highlight = function(code, language) {
    return '<pre><code>' + code + ' in this language: ' + language + '</code></pre>';
};
