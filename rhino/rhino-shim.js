/*global env: true, Packages: true */
/**
 * @overview A minimal emulation of the standard features of Node.js necessary
 * to get JSDoc to run.
 */

/**
 * Emulate DOM timeout/interval functions.
 * @see https://developer.mozilla.org/en-US/docs/DOM/window#Methods
 */

setTimeout = null,
clearTimeout = null,
setInterval = null,
clearInterval = null;

(function() {
    // TODO: tune number of threads if necessary
    var timerPool = new java.util.concurrent.ScheduledThreadPoolExecutor(10);
    var timers = {};
    var timerCount = 1;
    var timerUnits = java.util.concurrent.TimeUnit.MILLISECONDS;

    function getCallback(fn) {
        return new java.lang.Runnable({
            run: Packages.org.mozilla.javascript.Context.call(fn)
        });
    }

    setTimeout = function(fn, delay) {
        var timerId = timerCount++;
        var callback = getCallback(fn);
        timers[timerId] = timerPool.schedule(callback, delay, timerUnits);
        return timerId;
    };

    clearTimeout = function(timerId) {
        if (timers[timerId]) {
            timerPool.remove(timers[timerId]);
            delete timers[timerId];
        }
    };

    setInterval = function(fn, delay) {
        var timerId = timerCount++;
        var callback = getCallback(fn);
        timers[timerId] = timerPool.scheduleAtFixedRate(callback, delay, delay, timerUnits);
        return timerId;
    };

    clearInterval = clearTimeout;
})();

/**
 * Emulate Node.js console functions.
 * @see http://nodejs.org/api/stdio.html
 */
console = {
    debug: function() {
        // TODO
    },
    error: function() {
        // TODO
    },
    log: function(/*...*/) {
        // TODO: make this consistent with Node.js
        var args = Array.prototype.slice.call(arguments, 0),
            dumper = dumper || require('jsdoc/util/dumper');

        for (var i = 0, len = args.length; i < len; i++) {
            if (typeof args[i] !== 'string') {
                args[i] = dumper.dump(args[i]);
            }
        }

        java.lang.System.out.println( args.join(' ') );
    },
    trace: function() {
        // TODO
    }
};

/**
 * Emulate Node.js process functions.
 * @see http://nodejs.org/api/process.html
 */
process = {
    argv: [__dirname + '/jsdoc.js'].concat(Array.prototype.slice.call(arguments, 0)),
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
    },
    nextTick: function(callback) {
        setTimeout(callback, 0);
    },
    stderr: {
        write: function(str) {
            java.lang.System.err.print(str);
        }
    },
    stdout: {
        write: function(str) {
            java.lang.System.out.print(str);
        }
    }
};
