/**
 * @overview A minimal emulation of the standard features of Node.js necessary
 * to get JSDoc to run.
 */

/**
 * Emulate Node.js globals, including timeout/interval functions.
 * @see http://nodejs.org/api/globals.html
 * @see http://stackoverflow.com/q/2261705
 */

__dirname = env.dirname;

setTimeout = null,
clearTimeout = null,
setInterval = null,
clearInterval = null;

(function() {
    var timer = new java.util.Timer();
    var counter = 1;
    var ids = {};

    setTimeout = function (fn, delay) {
        delay = delay || 0;
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask, {run: fn});
        timer.schedule(ids[id], delay);
        return id;
    };

    clearTimeout = function (id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    };

    setInterval = function (fn, delay) {
        delay = delay || 0;
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask, {run: fn});
        timer.schedule(ids[id], delay, delay);
        return id;
    };

    clearInterval = clearTimeout;
}());

/**
 * Emulate Node.js console functions.
 * @see http://nodejs.org/api/stdio.html
 */
console = {
    log: function(/*...*/) {
        var args = Array.prototype.slice.call(arguments, 0),
            dumper = dumper || require('jsdoc/util/dumper');

        for (var i = 0, len = args.length; i < len; i++) {
            if (typeof args[i] !== 'string') {
                args[i] = dumper.dump(args[i]);
            }
        }

        print( args.join(' ') );
    }
};

/**
 * Emulate Node.js process functions.
 * @see http://nodejs.org/api/process.html
 */
process = {
    argv: [env.dirname + '/jsdoc.js'].concat(Array.prototype.slice.call(arguments, 0)),
    cwd: function() {
        return new Packages.java.io.File('.').getCanonicalPath() + '';
    },
    env: (function() {
        var result = {};

        var env = java.lang.System.getenv();
        var keys = env.keySet().toArray();
        var key;
        for (var i = 0, l = keys.length; i < l; i++) {
            key = keys[i];
            result[key + ''] = env.get(key) + '';
        }

        return result;
    })(),
    exit: function(n) {
        n = n || 0;
        java.lang.System.exit(n);
    }
};
