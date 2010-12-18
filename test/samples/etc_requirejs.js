/**
 * @module ./webui/utils.strings
 */
define('./webui/utils.strings',
    function() {
        var strings = {};
        
        /** @method module:"./webui/utils.strings".twiddle */
        strings.twiddle = function() {
        }
        
        return strings;
    }
);

/**
 * Interactive graphical user elements.
 * @module ui/widget
 * @requires module:"./webui/utils.strings"
 */
define('ui/widget',
    ['./webui/utils.strings'],
    function(strings) {
        return {
            /**
             * Initialise the widget.
             * @method module:ui/widget.init
             */
            init: function() {
            }
        };
    }
);

/**
 * Interactive graphical user elements.
 * @module ui/Kaleidoscope
 * @requires module:ui/widget
 * @requires module:"./webui/utils.strings"
 */
define('ui/Kaleidoscope',
    ['ui/widget', './webui/utils.strings'],
    function(w, s) {
        return {
            /**
             * @memberof module:ui/Kaleidoscope
             */
            twirl: function() {
            }
        };
    }
);
