/**
 * Strips the rails template tags from a `js.erb` file.
 *
 * @module plugins/railsTemplate
 */
exports.handlers = {
    /**
     * Remove rails tags from the source input (e.g. <% foo bar %>)
     *
     * @param {*} e - The event fired before parsing.
     * @param {string} e.filename - The name of the file about to be parsed.
     * @param {string} e.source - The contents of `e.filename`.
     */
    beforeParse(e) {
        if (e.filename.match(/\.erb$/)) {
            e.source = e.source.replace(/<%.*%>/g, '');
        }
    }
};
