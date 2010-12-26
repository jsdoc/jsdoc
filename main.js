/**
 *	@project JSDoc
 *	@copyright 2010 (c) Michael Mathews <micmath@gmail.com>
 *	@license See LICENSE.md file included in this distribution.
 */

//// bootstrap

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
		    print(e);
		}
		
		try {
			var f = new Function('require', 'exports', 'module', fileContent),
				exports = require.cache[path] || {},
				module = { id: id, uri: path };
				
			require.cache[id] = exports;
			f.call({}, require, exports, module);
		}
		catch(e) {
			print('Unable to require source code from "' + path + '": ' + e);
		}
		return exports;
	}
	require.base = BASEDIR + '/modules/'; // assume all module paths are relative to here
	require.cache = {}; // cache module exports. Like: {id: exported}
	
////

//// main
    
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
	
	function main() {
	    var sourceFiles,
	        docs,
	        jsdoc = {
	            opts: {
	                parser: require('jsdoc/opts/parser')
	            },
	            src: {
	                scanner: require('jsdoc/src/scanner'),
	                parser: require('jsdoc/src/parser')
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
			print( jsdoc.optParser.help() );
			exit(0);
		}
 		else if (env.opts.test) {
 			include('test/runall.js');
 			exit(0);
 		}
 		
 		if (env.opts._.length > 0) { // are there any source files to scan?
 			sourceFiles = jsdoc.src.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined));
//dump('sourceFiles...', sourceFiles); 	
 			docs = jsdoc.src.parser.parse(sourceFiles, env.opts.encoding);
//dump('jsdoc.docs...', docs);
            if (env.opts.template) {
                include('templates/'+env.opts.template+'/publish.js');
                if (typeof publish === 'function') {
                    publish(docs, {});
                }
            }
// 			
// 			if (env.opts.validate) {
// 				var jsonSchema  = require('sitepen/jsonSchema');
// 				var jsdocSchema = require('jsdoc/schema').jsdocSchema;
// 				var validation = jsonSchema.validate(jsdoc.srcParser.result.toObject(), jsdocSchema);
// 				print('Validation: ' + validation.toSource());
// 			}
// 			
// 			if (!env.opts.destination || env.opts.destination.indexOf('stdout') === 0) {
// 				print( jsdoc.srcParser.result.toString(env.opts.destination) );
// 			}
// 			else if (env.opts.template) {
// 				try {
// 					load(BASEDIR+'/templates/'+env.opts.template+'/publish.js');
// 				}
// 				catch (e) {
// 					print('Cannot load the specified template: templates/'+env.opts.template+'/publish.js: '+e);
// 				}
// 				
// 				publish(jsdoc.srcParser.result.toObject(), {});
// 			}
 		}
	}
	
////