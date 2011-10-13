/**
    @overview Escape HTML tags in descriptions.
    @module plugins/escapeHtml
    @author Michael Mathews <micmath@gmail.com>
 */

/**
    Translate HTML tags in descriptions into safe entities.
 */
exports.newDoclet = function(e) {
    if (e.doclet.description) {
        e.doclet.description = e.doclet.description
                               .replace(/&/g,'&amp;')
                               .replace(/</g,'&lt;')
                               .replace(/\n/g, '<br>');
    }
};
