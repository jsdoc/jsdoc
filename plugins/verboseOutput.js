/**
 * Adds a verbose output to the console, so that you can see what's happening in your process.
 * @module plugins/verboseOutput
 * @author Rob Taylor <manix84@gmail.com> - The basic idea
 * @author Michael Mathews <micmath@gmail.com> - Wrote the first itteration with me :)
 */

exports.handlers = {
    /**
     * Logging the file name to the console.
     */
    fileBegin: function (data) {
        console.log(data.filename);
    }
};
