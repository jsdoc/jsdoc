/**
 * @overview JSDoc/main.js
 * @copyright 2010, 2011 (c) Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


/** @global */
const BASEDIR = arguments[0].replace(/([\/\\])main\.js$/, '$1'); // jsdoc.jar sets argument[0] to the abspath to main.js

/** @global */
function require(id) { // like commonjs
    var path = require.base + id + '.js',
        fileContent = '';
        
    try {
        var file = new java.io.File(path),
            scanner = new java.util.Scanner(file).useDelimiter("\\Z"),
            fileContent = String( scanner.next() );
    }
    catch(e) {
        print('Unable to read source code from "' + path + '": ' + e);
    }
    
    try {
        var f = new Function('require', 'exports', 'module', fileContent),
            exports = require.cache[path] || {},
            module = { id: id, uri: path };
            
        require.cache[id] = exports;
        f.call({}, require, exports, module);
    }
    catch(e) {
        print('Unable to require source code from "' + path + '": ' + e.toSource());
    }
    return exports;
}
require.base = BASEDIR + '/modules/'; // assume all module paths are relative to here
require.cache = {}; // cache module exports. Like: {id: exported}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

	
/** @global */
env = {
    run: {
        start: new Date(),
        finish: null
    },
    args: arguments.slice(1), // jsdoc.jar sets argument[0] to the abspath to main.js, user args follow
    conf: {}, // TODO: populate from file BASEDIR+'/conf.json'
    opts: {}
};

/** @global */
app = {
    jsdoc: {
        scanner: new (require('jsdoc/src/scanner').Scanner)(),
        parser: new (require('jsdoc/src/parser').Parser)()
    }
}

try { main(); }
finally { env.run.finish = new Date(); }

/** @global */
function print(/*...*/) {
    for (var i = 0, leni = arguments.length; i < leni; i++) {
        java.lang.System.out.println('' + arguments[i]);
    }
}

/** @global */
function dump(/*...*/) {
    for (var i = 0, leni = arguments.length; i < leni; i++) {
        print( require('common/dumper').dump(arguments[i]) );
    }
}

/** @global */
function include(filepath) {
    try {
        load(BASEDIR + filepath);
    }
    catch (e) {
        print('Cannot include "' + BASEDIR + filepath + '": '+e);
    }
}

/** @global */
function exit(v) {
    java.lang.System.exit(v);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


/** @global */
function main() {
    var sourceFiles,
        docs,
        jsdoc = {
            opts: {
                parser: require('jsdoc/opts/parser')
            }
        };
    
    try {
        env.conf = JSON.parse( require('common/fs').read(BASEDIR+'conf.json') );
    }
    catch (e) {
        throw('Configuration file cannot be evaluated. '+e);
    }
    
    env.opts = jsdoc.opts.parser.parse(env.args);
    
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
        
        require('jsdoc/src/handlers');
        
        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);
//print('dumping docs...');
//dump(docs); exit(0);


        env.opts.template = env.opts.template || 'default';
        
        // should define a global "publish" function
        include('templates/' + env.opts.template + '/publish.js');

        if (typeof publish === 'function') {
            publish(
                docs,
                { destination: env.opts.destination }
            );
        }
    }
}