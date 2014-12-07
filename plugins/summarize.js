/**
 * @overview This plugin creates a summary tag, if missing, from the first sentence in the
 * description.
 * @module plugins/summarize
 * @author Mads Bondo Dydensborg <mbd@dbc.dk>
 */
'use strict';

exports.handlers = {
    /**
     * Autogenerate summaries, if missing, from the description, if present.
     */
    newDoclet: function(e) {
        var endTag;
        var tags;
        var stack;

        // If the summary is missing, grab the first sentence from the description
        // and use that.
        if (e.doclet && !e.doclet.summary && e.doclet.description) {
            // The summary may end with `.$`, `. `, or `.<` (a period followed by an HTML tag).
            e.doclet.summary = e.doclet.description.split(/\.$|\.\s|\.</)[0];
            // Append `.` as it was removed in both cases, or is possibly missing.
            e.doclet.summary += '.';

            // This is an excerpt of something that is possibly HTML.
            // Balance it using a stack. Assume it was initially balanced.
            tags = e.doclet.summary.match(/<[^>]+>/g) || [];
            stack = [];

            tags.forEach(function(tag) {
                var idx = tag.indexOf('/');

                if (idx === -1) {
                    // start tag -- push onto the stack
                    stack.push(tag);
                } else if (idx === 1) {
                    // end tag -- pop off of the stack
                    stack.pop();
                }

                // otherwise, it's a self-closing tag; don't modify the stack
            });

            // stack should now contain only the start tags that lack end tags,
            // with the most deeply nested start tag at the top
            while (stack.length > 0) {
                // pop the unmatched tag off the stack
                endTag = stack.pop();
                // get just the tag name
                endTag = endTag.substring(1, endTag.search(/[ >]/));
                // append the end tag
                e.doclet.summary += '</' + endTag + '>';
            }

            // and, finally, if the summary starts and ends with a <p> tag, remove it; let the
            // template decide whether to wrap the summary in a <p> tag
            e.doclet.summary = e.doclet.summary.replace(/^<p>(.*)<\/p>$/i, '$1');
        }
    }
};
