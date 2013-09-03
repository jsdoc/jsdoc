/**
    @overview This plugin creates a summary tag, if missing, from the first sentence in the description tag.
    @module plugins/autosummary
    @author Mads Bondo Dydensborg <mbd@dbc.dk>
 */

exports.handlers = {
    /**
        Auto generate summaries, if missing, from description, if present.
     */
    newDoclet: function(e) {
        // If the summary is missing, grab the first sentence from the description
        // and use that.
        if (typeof e.doclet.summary === 'undefined' || e.doclet.summary === '') {
            if (typeof e.doclet.description === 'string') {
                // We may end with a ".space", or with a ".<" HTML tag.
                e.doclet.summary = e.doclet.description.split(/\.\s|\.</)[0];
                // Append . as it was removed in both cases, or is possibly missing.
                e.doclet.summary += ".";
                // This is an excerpt of something that is possibly HTML. 
                // Balance it using a stack. Assume it was initially balanced.
                var tags = e.doclet.summary.match(/<[^>]+>/g);
                var stack = new Array();
                for (tag in tags) {
                    if (tags[tag].search("/") <= 0) {
                        // start tag -- push onto the stack
                        stack.push(tags[tag]);
                    } else if (tags[tag].search("/") == 1) {
                        // end tag -- pop off of the stack
                        stack.pop();
                    } else {
                        // self-closing tag -- do nothing
                    }
                }
                // stack should now contain only the start tags of the broken elements,
                // the most deeply-nested start tag at the top
                while (stack.length > 0) {
                    // pop the unmatched tag off the stack
                    var endTag = stack.pop();
                    // get just the tag name
                    endTag = endTag.substring(1,endTag.search(/[ >]/));
                    // append the end tag
                    e.doclet.summary += "</" + endTag + ">";
                }
                // And, finally, if the summary starts and ends with a P tag, remove it, as summaries are not in P tags.
                e.doclet.summary = e.doclet.summary.replace(/^<p>(.*)<\/p>$/i, "$1");
            }
        }
    }
};
