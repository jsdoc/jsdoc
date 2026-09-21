/**
 * Remove everything in a file except JSDoc-style comments and remove the first character of every line except "/", "*", and " ".
 * By enabling this plugin, you can document source files of languages that do not allow multiline comments such as ASP Classic.
 * 
 * @module plugins/commentsSingleLine
 */
exports.handlers = {
    beforeParse(e) {
        // a JSDoc comment looks like: /**[one or more chars]*/
        const comments = e.source.match(/\/\*\*[\s\S]+?\*\//g);

        if (comments) {
            //remove first character of each line that isnt / * or space
            e.source = comments.join('\n\n').replace(/^[^\/\*\s]/gm,'');
        } else {
            e.source = ''; // If file has no comments, parser should still receive no code
        }
    }
};
