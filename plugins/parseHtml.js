/**
    @overview Extracts javascript source and comments from HTML files
    @module plugins/parseHtml
    @author Aleksandar Rodic <aleksandar.xyz@gmail.com>
 */
'use strict';

exports.handlers = {
    /**
     * Extracts HTML and javascript comments from html files
     * HTML comments are converted into javascript comments
     * @param e
     * @param e.filename
     * @param e.source
     */
    beforeParse: function(e) {

        var jsSource = '';

        // matches text between /** and */ inclusive and <!-- and --> inclusive
        var docCommentRegex = new RegExp('<!--([\\s\\S]*?)-->', 'g');

        // acquire all script doc comments
        var docComments = e.source.match(docCommentRegex) || [];

        // each match represents a single block of doc comments
        docComments.forEach(function(m) {
            // unify line ends, remove all comment characters, split into individual lines
            var lines = m.replace(/\r\n/g, '\n').replace(/^\s*\/\*\*|^\s*\*\/|^\s*\* ?|^\s+|^\s*\<\!-\-\s*|\s*\-\-\>/gm, '').split('\n');
            jsSource += '/**\n';
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] !== '') {
                    jsSource += '* ' + lines[i] + '\n';
                }
            }
            jsSource += '*/\n\n';

        });

        // matches text between <script> and </script>
        var scriptRegex = new RegExp('<script[\\s\\S]*?\>([\\s\\S]*?)\<\\/script\>', 'g');

        // acquire all script doc comments
        var scriptText = e.source.match(scriptRegex) || [];

        scriptText.forEach(function(m) {
            // remove script tags, split into individual lines
            var lines = m.replace(/\r\n/g, '\n').replace(/<script[\s\S]*?>|<\/script>/gmi, '').split('\n');
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] !== '') {
                    jsSource += lines[i] + '\n';
                }
            }
        });

        e.source = jsSource;

    }
};
