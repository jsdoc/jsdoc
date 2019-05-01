/**
 * Make the contents of a README file available to include in the output.
 * @module jsdoc/readme
 */
const env = require('./env');
const fs = require('./fs');
const markdown = require('./util/markdown');

/**
 * Represents a README file.
 */
class ReadMe {
    /**
     * @param {string} path - The filepath to the README.
     */
    constructor(path) {
        const content = fs.readFileSync(path, env.opts.encoding);
        const parse = markdown.getParser();

        this.html = parse(content);
    }
}

module.exports = ReadMe;
