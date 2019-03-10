/**
 * Wrapper for underscore's template utility to allow loading templates from files.
 * @module jsdoc/template
 */
const _ = require('underscore');
const fs = require('jsdoc/fs');
const path = require('path');

/**
 * Underscore template helper.
 */
class Template {
    /**
     * @param {string} filepath - Templates directory.
     */
    constructor(filepath) {
        this.path = filepath;
        this.layout = null;
        this.cache = {};
        // override default template tag settings
        this.settings = {
            evaluate: /<\?js([\s\S]+?)\?>/g,
            interpolate: /<\?js=([\s\S]+?)\?>/g,
            escape: /<\?js~([\s\S]+?)\?>/g
        };
    }

    /**
     * Loads template from given file.
     * @param {string} file - Template filename.
     * @return {function} Returns template closure.
     */
    load(file) {
        return _.template(fs.readFileSync(file, 'utf8'), null, this.settings);
    }

    /**
     * Renders template using given data.
     *
     * This is low-level function, for rendering full templates use {@link Template.render()}.
     *
     * @param {string} file - Template filename.
     * @param {object} data - Template variables (doesn't have to be object, but passing variables dictionary is best way and most common use).
     * @return {string} Rendered template.
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
     * Renders template with given data.
     *
     * This method automaticaly applies layout if set.
     *
     * @param {string} file - Template filename.
     * @param {object} data - Template variables (doesn't have to be object, but passing variables dictionary is best way and most common use).
     * @return {string} Rendered template.
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
exports.Template = Template;
