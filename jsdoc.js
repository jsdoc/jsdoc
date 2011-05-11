/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */

// try: $ java -classpath build-files/java/classes/js.jar org.mozilla.javascript.tools.shell.Main main.js `pwd` script/to/parse.js

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** The absolute path to the base directory of the jsdoc application.
    @type string
    @global
 */
const BASEDIR = './';

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
            }
            catch(e) {
                throw 'Unable to require source code from "' + moduleUri + '": ' + e.toSource();
            }
            
            exports = module.exports || exports;
            require.cache[id] = exports;
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
    args: Array.prototype.slice.call(arguments, 0),
    
    
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
catch(e) { 
     if (e.rhinoException != null) { 
         e.rhinoException.printStackTrace();
     }
     else throw e;
} 
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
        packageJson,
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
    
    // any source file named package.json is treated special
    for (var i = 0, l = env.opts._.length; i < l; i++ ) {
        if (/\bpackage\.json$/i.test(env.opts._[i])) {
            packageJson = require('fs').read( env.opts._[i] );
            env.opts._.splice(i--, 1);
        }
    }

    if (env.opts._.length > 0) { // are there any files to scan and parse?
        
        var includeMatch = (env.conf.source && env.conf.source.includePattern)? new RegExp(env.conf.source.includePattern) : null,
            excludeMatch = (env.conf.source && env.conf.source.excludePattern)? new RegExp(env.conf.source.excludePattern) : null;
        
        sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined), includeMatch, excludeMatch);
        
        require('jsdoc/src/handlers').attachTo(app.jsdoc.parser);
        
        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);
        
        if (packageJson) {
            var packageDocs = new (require('jsdoc/package').Package)(packageJson);
            packageDocs.files = sourceFiles || [];
            docs.push(packageDocs);
        }
        
        function indexAll(docs) {
            var lookupTable = {};
            
            docs.forEach(function(doc) {
                if ( !lookupTable.hasOwnProperty(doc.longname) ) {
                    lookupTable[doc.longname] = [];
                }
                lookupTable[doc.longname].push(doc);
            });
            docs.index = lookupTable;
        }
        
        indexAll(docs);
        
        require('jsdoc/borrow').resolveBorrows(docs);
        
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