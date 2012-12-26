/*global env: true */
exports.rhino = function(args) {
    var myGlobal = require('jsdoc/util/global');

    // note: mutates args
    function getDirname() {
        var dirname;

        // Rhino has no native way to get the base dirname of the current script,
        // so this information must be manually passed in from the command line.
        for (var i = 0; i < args.length; i++) {
            if ( /^--dirname(?:=(.+?)(\/|\/\.)?)?$/i.test(args[i]) ) {
                if (RegExp.$1) {
                    dirname = RegExp.$1; // last wins
                    args.splice(i--, 1); // remove --dirname opt from arguments
                }
                else {
                    dirname = args[i + 1];
                    args.splice(i--, 2);
                }
            }
        }

        return dirname;
    }

    myGlobal.__dirname = env.dirname = getDirname();
    env.args = args;

    require('jsdoc/util/include')(__dirname + '/rhino/rhino-shim.js');
};

exports.nodejs = function(args) {
    throw new Error('Node.js is not currently supported!');
    /*
    env.dirname = __dirname;
    env.args = args;
    // TODO: add lib/ to the library paths
    */
};
