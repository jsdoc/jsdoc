/*global env: true, Packages: true */
/**
 * @overview A minimal emulation of the standard features of Node.js necessary
 * to get JSDoc to run.
 */

// Set the JS version that the Rhino interpreter will use.
version(180);

/**
 * Emulate DOM timeout/interval functions.
 * @see https://developer.mozilla.org/en-US/docs/DOM/window#Methods
 */

global.setTimeout = null;
global.clearTimeout = null;
global.setInterval = null;
global.clearInterval = null;

(function() {
    'use strict';

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

    global.setTimeout = function(fn, delay) {
        var timerId = timerCount++;
        var callback = getCallback(fn);
        timers[timerId] = timerPool.schedule(callback, delay, timerUnits);
        return timerId;
    };

    global.clearTimeout = function(timerId) {
        if (timers[timerId]) {
            timerPool.remove(timers[timerId]);
            delete timers[timerId];
        }
    };

    global.setInterval = function(fn, delay) {
        var timerId = timerCount++;
        var callback = getCallback(fn);
        timers[timerId] = timerPool.scheduleAtFixedRate(callback, delay, delay, timerUnits);
        return timerId;
    };

    global.clearInterval = global.clearTimeout;
})();

/**
 * Emulate Node.js console functions.
 * @see http://nodejs.org/api/stdio.html
 */
global.console = (function() {
    function println(stream, args) {
        java.lang.System[stream].println( require('util').format.apply(this, args) );
    }

    return {
        error: function() {
            println('err', arguments);
        },
        info: function() {
            println('out', arguments);
        },
        log: function() {
            println('out', arguments);
        },
        trace: function(label) {
            // this puts some extra junk at the top of the stack trace, but it's close enough
            var e = new java.lang.Exception(label || 'Trace');
            e.printStackTrace();
        },
        warn: function() {
            println('err', arguments);
        }
    };
})();

/**
 * Emulate Node.js process functions.
 * @see http://nodejs.org/api/process.html
 */
global.process = {
    // not quite right, but close enough
    argv: ['java', env.dirname + '/jsdoc.js']
        .concat( Array.prototype.slice.call(arguments, 0) ),
    // this depends on a hack in our version of Rhino
    cwd: function() {
        var f = new java.io.File( java.lang.System.getProperty('user.dir') );
        return String( f.getAbsolutePath() );
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

/**
 * Emulate other Node.js globals.
 * @see http://nodejs.org/docs/latest/api/globals.html
 */
Object.defineProperties(global, {
    '__dirname': {
        get: function() {
            return global.process.cwd();
        },
        enumerable: true
    }
});
