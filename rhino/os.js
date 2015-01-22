/**
 * Partial Rhino implementation of Node.js' `os` module.
 * @module os
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @see http://nodejs.org/api/os.html
 */
'use strict';

exports.EOL = String( java.lang.System.getProperty('line.separator') );

// clearly not accurate, but probably good enough
exports.platform = function() {
    return process.platform;
};
