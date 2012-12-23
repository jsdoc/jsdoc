/**
 * Partial Rhino implementation of Node.js' `os` module.
 * @module os
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @see http://nodejs.org/api/os.html
 */

exports.EOL = java.lang.System.getProperty('line.separator') + '';
