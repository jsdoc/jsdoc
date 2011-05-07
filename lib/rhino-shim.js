global = this;

load('lib/Rhino-Require/src/require.js');

(function(rhinoArgs) {
    var dumper;
    global.console = {
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
    
    global.process = {
        exit: function(n) {
            n = n || 0;
            java.lang.System.exit(n);
        },
        argv: [null, null].concat( Array.prototype.slice.call(rhinoArgs, 0) )
    };

    if (typeof JSON === 'undefined') { // JSON is defined in Rhino 1.7+
        load('lib/json.js');
        global.JSON = {
            parse: function(raw) {
                return jsonParse(raw);
            },
            stringify: function(o) {
                return ''+ o;
            }
        }
    }

    (function () {
        var counter = 1; 
        var timeoutIds = {};
    
        global.setTimeout = function(fn, delay) {
            var id = counter++,
                timer = new java.util.Timer();
                
            timeoutIds[id] = [
                new JavaAdapter(java.util.TimerTask,{run: function(){fn(); timer.purge(); timer.cancel();}}),
                timer
            ];
            
            timer.schedule(timeoutIds[id][0], delay);
            return id;
        }
    
        global.clearTimeout = function(id) {
            if (typeof timeoutIds[id] !== 'undefined') {
                timeoutIds[id][0].cancel();
                timeoutIds[id][1].purge();
                timeoutIds[id][1].cancel();
                delete timeoutIds[id];
            }
        }
     })();
     
})(arguments);