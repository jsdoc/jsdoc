/*jslint  indent: 4, maxerr: 50, rhino: true, node: true, sloppy: true, white: true, stupid: true, plusplus: true */
/*global env: true */
/**
 * @file controllers used in generating docs from JSDoc 3 internals
 * @exports plugins/JSDocSpy/controllers
 */

/** @namespace */
exports.controls = {
    /** @namespace */
    describeTags : {}
};



/** @function */
exports.controls.describeTags.viewer = function() {
    var os, dictionary, JSDocSpy, outputFormat, out;
    os = require('os');
    dictionary = require('jsdoc/tag/dictionary');
    JSDocSpy = require('plugins/JSDocSpy/views');
    outputFormat = env.opts.describeTags;
    out = dictionary.describeTags();
    switch (outputFormat) {
        case 'html':
            out = JSDocSpy.views.tagDictionary.toHtml(out);
            break;
        case 'markdown':
            out = JSDocSpy.views.tagDictionary.toMarkdown(out, false);
            out = out.join(os.EOL + os.EOL);
            break;
        case 'markdownFiles':
            out = JSDocSpy.views.tagDictionary.toMarkdown(out, true);
            break;
        case 'console':
            out = JSDocSpy.views.tagDictionary.toConsole(out);
            break;
        case 'raw':
            break;
        default:
            break;
    }
    // if outputting to files, don't send output to the console
    if(outputFormat.indexOf('Files') === -1) {
        console.log(out);
    }
};