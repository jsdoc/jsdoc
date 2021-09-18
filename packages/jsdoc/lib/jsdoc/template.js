/**
 * Wrapper for Lodash's template utility to allow loading templates from files.
 * @module jsdoc/template
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const env = require('jsdoc/env');

const config = (env.conf.templates && env.conf.templates.overwrite) || false;

/**
 * Template helper.
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

        if (typeof config === 'string') {
            try {
                this.overwrite = require(config).bind(this)
            } catch (err) {
                err.message = 'Config `conf.templates.overwrite` is not a valid module name/filepath. '+ err.message;
                throw err
            }
        } else if (typeof config === 'object' && config !== null) {
            this.overwrite = function (path) {
                return (config[path]) ? config[path] : path;
            }
        } else {
            this.overwrite = function (path) {
                return path;
            }
        }
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
     * @param {string} file - Template file.
     * @param {object} data - Template variables (doesn't have to be object, but passing variables dictionary is best way and most common use).
     * @return {string} Rendered template.
     */
    partial(file, data) {
        file = path.resolve(this.path, file);
        const stdPath = standardize(file);
        const filepath = this.overwrite(stdPath, data)

        // load template into cache
        if (!(filepath in this.cache)) {
            if (config) {
                console.log('load', filepath, (stdPath !== filepath) ? 'instead ' + stdPath : '');
            }
            this.cache[filepath] = this.load(filepath);
        }

        // keep template helper context
        return this.cache[filepath].call(this, data);
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


/**
 * Private function standardize path
 * @private true
 * @param {string} path - Filepath.
 * @return {function} Returns Standardized filepath.
 */
function standardize(filepath) {
    filepath = path.relative(process.cwd(), filepath);
    return filepath.replace(/\\/g, '/') // windows support
}
