/**
    @module jsdoc/src/parser
    @requires module:common/events
    @requires module:jsdoc/doclet
 */

(function() {
    var Token  = Packages.org.mozilla.javascript.Token,
        Doclet = require('jsdoc/doclet').Doclet,
        currentParser = null,
        currentSourceName = '',
        seen = {},
        pragmas = {};
        
    /** 
        @constructor module:jsdoc/src/parser.Parser
        @mixesIn module:common/events.EventEmitter
     */
    var Parser = exports.Parser = function() {
        this._resultBuffer = [];
    }
    require('common/events').mixin(exports.Parser.prototype);
    
    /** Create a new Parser. */
    exports.parserFactory = function(opts) {
        return new Parser();
    }
    
})()