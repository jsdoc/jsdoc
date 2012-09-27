/**
 * Emulate the Node.js `os` module.
 * @see http://nodejs.org/api/os.html
 */
exports.platform = function() {
    var osname = java.lang.System.getProperty("os.name").toLowerCase() + '';

    // obviously this isn't right, but we probably just need to distinguish between Windows/Cygwin/
    // MinGW and everything else
    if ( osname.indexOf('windows') !== -1 ) {
        return 'win32';
    } else {
        return 'linux';
    }
};
