/**
 * Adds a verbose output to the console, so that you can see what's happening in your process.
 * @module plugins/verboseOutput
 * @author Rob Taylor <manix84@gmail.com> - The basic idea
 * @author Michael Mathews <micmath@gmail.com> - Wrote the first itteration with me :)
 */


var _config = {
    prefix: {
        fileBegin: "    > ",
        newDoclet: "    > "
    },
    suffix: {
        fileBegin: "",
        newDoclet: ""
    },
    enable: {
        fileBegin: true,
        newDoclet: false
    }
};

/**
 * Logging the file name to the console
 */
exports.fileBegin = function (event) {
    if (_config.enable.fileBegin) {
        console.log(_config.prefix.fileBegin, event.filename, _config.suffix.fileBegin);
    }
};

/**
 * Logging the doclet object to the console.  This will print out a lot of info,
 * so I suggest only using it for debugging.
 */
exports.newDoclet = function (event) {
    if (_config.enable.newDoclet) {
        console.log(_config.prefix.newDoclet, event, _config.suffix.newDoclet);
    }
};
