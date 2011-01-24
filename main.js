/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


/** The absolute path to the base directory of the jsdoc application.
    @type string
    @global
 */
const BASEDIR = arguments[0].replace(/([\/\\])main\.js$/, '$1'); // jsdoc.jar sets argument[0] to the abspath to main.js

/** Include a JavaScript module, defined in the CommonJS way.
    @param {string} id The identifier of the module you require.
    @returns {mixed} The module's "exports" value.
    @see <http://wiki.commonjs.org/wiki/Modules/1.1>
 */
function require(id) { // like commonjs
    var moduleContent = '',
        moduleUri;
    
    for (var i = 0, len = require.paths.length; i < len; i++) {
        moduleUri = require.paths[i] + '/' + id + '.js';
        moduleContent = '';
        
        var file = new java.io.File(moduleUri);
        if ( file.exists() && file.canRead() && !file.isDirectory() ) {
            try {    
                var scanner = new java.util.Scanner(file).useDelimiter("\\Z");
                moduleContent = String( scanner.next() );
            }
            catch(ignored) { }
            
            if (moduleContent) { break; }
        }
    }
    
    if (moduleContent) {
        try {
            var f = new Function('require', 'exports', 'module', moduleContent),
                exports = require.cache[moduleUri] || {},
                module = { id: id, uri: moduleUri };
    
            f.call({}, require, exports, module);
            
            exports = module.exports || exports;
            require.cache[id] = exports;
        }
        catch(e) {
            throw 'Unable to require source code from "' + moduleUri + '": ' + e.toSource();
        }
    }
    else {
        throw 'The requested module cannot be returned: no content for id: "' + id + '" in paths: ' + require.paths.join(', ');
    }
    
    return exports;
}
require.root = BASEDIR;
require.paths = [ require.root + 'modules', require.root + 'modules/common' ];
require.cache = {}; // cache module exports. Like: {id: exported}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

	
/** Data representing the environment in which this app is running.
    @namespace
*/
env = {
    /** Running start and finish times. */
    run: {
        start: new Date(),
        finish: null
    },
    
    /**
        The command line arguments passed into jsdoc.
        @type Array
    */
    args: Array.prototype.slice.call(arguments, 1), // jsdoc.jar adds argument[0], the abspath to main.js, user args follow
    
    
    /**
        The parsed JSON data from the configuration file.
        @type Object
    */
    conf: {},
    
    /**
        The command line arguments, parsed into a key/value hash.
        @type Object
        @example if (env.opts.help) { print 'Helpful message.'; }
    */
    opts: {}
};

/**
    Data that must be shared across the entire application.
    @namespace
*/
app = {
    jsdoc: {
        scanner: new (require('jsdoc/src/scanner').Scanner)(),
        parser: new (require('jsdoc/src/parser').Parser)(),
        name: require('jsdoc/name')
    }
}

try { main(); }
finally { env.run.finish = new Date(); }

/** Print string/s out to the console.
    @param {string} ... String/s to print out to console.
 */
function print() {
    for (var i = 0, leni = arguments.length; i < leni; i++) {
        java.lang.System.out.println('' + arguments[i]);
    }
}

/**
    Try to recursively print out all key/values in an object.
    @global
    @param {Object} ... Object/s to dump out to console.
 */
function dump() {
    for (var i = 0, leni = arguments.length; i < leni; i++) {
        print( require('common/dumper').dump(arguments[i]) );
    }
}

/** @global
    @param {string} filepath The path to the script file to include (read and execute).
*/
function include(filepath) {
    try {
        load(BASEDIR + filepath);
    }
    catch (e) {
        print('Cannot include "' + BASEDIR + filepath + '": '+e);
    }
}

/** 
    Cause the VM running jsdoc to exit running.
    @param {number} [n = 0] The exit status.
 */
function exit(n) {
    n = n || 0;
    java.lang.System.exit(n);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


/**
    Run the jsoc application.
 */
function main() {
    var sourceFiles,
        docs,
        jsdoc = {
            opts: {
                parser: require('jsdoc/opts/parser'),
            }
        };
    
    env.opts = jsdoc.opts.parser.parse(env.args);
    
    try {
        env.conf = JSON.parse(
            require('fs').read( env.opts.configure || BASEDIR+'conf.json' )
        );
    }
    catch (e) {
        throw('Configuration file cannot be evaluated. '+e);
    }
    
    if (env.opts.query) {
        env.opts.query = require('query').toObject(env.opts.query);
    }
    
    if (env.opts.help) {
        print( jsdoc.opts.parser.help() );
        exit(0);
    }
    else if (env.opts.test) {
        include('test/runner.js');
        exit(0);
    }
    
    // allow user-defined plugins to register listeners
    if (env.conf.plugins) {
        for (var i = 0, leni = env.conf.plugins.length; i < leni; i++) {
            include(env.conf.plugins[i]);
        }
    }
   
    if (env.opts._.length > 0) { // are there any files to scan and parse?
        
        // allow filtering of found source files
        if (env.conf.source && env.conf.source.includePattern) {
            var includeRegexp = new RegExp(env.conf.source.includePattern);
            app.jsdoc.scanner.on('sourceFileFound', function(e) {
                if ( !includeRegexp.test(e.fileName) ) {
                    return false;
                }
            });
        }
        
        sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined));
        
        require('jsdoc/src/handlers').attachTo(app.jsdoc.parser);
        
        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);
//dump(docs); exit(0);
        if (env.opts.expel) {
            dump(docs);
            exit(0);
        }

        env.opts.template = env.opts.template || 'default';
        
        // should define a global "publish" function
        include('templates/' + env.opts.template + '/publish.js');

        if (typeof publish === 'function') {
            publish(
                new (require('typicaljoe/taffy'))(docs),
                env.opts
            );
        }
        else { // TODO throw no publish warning?
        }
    }
}