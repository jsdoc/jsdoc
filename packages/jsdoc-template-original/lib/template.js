/**
 * Wrapper for `_.template` to load templates from files.
 */
const _ = require('lodash');
const fs = require('jsdoc/fs');
const path = require('path');

/**
 * Template wrapper.
 */
class Template {
    /**
     * @param {string} filepath - The directory that contains `.tmpl` files.
     */
    constructor(filepath) {
        this.path = filepath;
        this.layout = null;
        this.cache = {};
    }

    /**
     * Load a template from a given file.
     *
     * @param {string} file - Template filename.
     * @returns {function} A template function.
     */
    load(file) {
        return _.template(fs.readFileSync(file, 'utf8'), null, this.settings);
    }

    /**
     * Render the given data with the specified template partial.
     *
     * @private
     * @param {string} file - Template filename.
     * @param {object} data - Template variables.
     * @return {string} Rendered data.
     */
    partial(file, data) {
        file = path.resolve(this.path, file);

        // load template into cache
        if (!(file in this.cache)) {
            this.cache[file] = this.load(file);
        }

        // keep template helper context
        return this.cache[file].call(this, data);
    }

    /**
     * Render the given data with the specified template.
     *
     * @param {string} file - Template filename.
     * @param {object} data - Template variables.
     * @return {string} Rendered data.
     */
    render(file, data) {
        // main content
        let content = this.partial(file, data);

        // apply layout
        if (this.layout) {
            data.content = content;
            content = this.partial(this.layout, data);
        }

        return content;
    }
}

module.exports = Template;
