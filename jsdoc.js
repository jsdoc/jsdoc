/*global app: true, args: true, env: true, publish: true */
/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */

// try: $ java -classpath build-files/java/classes/js.jar org.mozilla.javascript.tools.shell.Main main.js `pwd` script/to/parse.js

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
 * Data representing the environment in which this app is running.
 *
 * @namespace
 * @name env
 */
require('jsdoc/util/global').env = {
    /**
     * Running start and finish times.
     * 
     * @memberof env
     */
    run: {
        start: new Date(),
        finish: null
    },

    /**
     * The command-line arguments passed into JSDoc.
     *
     * @type Array
     * @memberof env
     */
    args: [],

    /**
     * The parsed JSON data from the configuration file.
     * 
     * @type Object
     * @memberof env
     */
    conf: {},

    /**
     * The absolute path to the base directory of the JSDoc application.
     * 
     * @private
     * @type string
     * @memberof env
     */
    dirname: '.',

    /**
     * The command-line options, parsed into a key/value hash.
     * 
     * @type Object
     * @memberof env
     * @example if (env.opts.help) { console.log('Helpful message.'); }
    */
    opts: {},

    /**
     * The source files that JSDoc will parse.
     * @type Array
     * @memberof env
     */
    sourceFiles: [],
    
    /**
     * The JSDoc version number and revision date.
     * 
     * @type Object
     * @memberof env
     */
    version: {}
};

// initialize the environment for the current JavaScript VM
require('jsdoc/util/runtime').initialize( Array.prototype.slice.call(arguments, 0) );
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
 * Data that must be shared across the entire application.
 * @namespace
 * @name app
 */
require('jsdoc/util/global').app = {
    jsdoc: {
        scanner: new (require('jsdoc/src/scanner').Scanner)(),
        parser: null,
        name: require('jsdoc/name')
    }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
    Try to recursively print out all key/values in an object.
    @global
    @private
    @param {Object} ... Object/s to dump out to console.
 */
function dump() {
    var doop = require('jsdoc/util/doop').doop;
    var _dump = require('jsdoc/util/dumper').dump;
    for (var i = 0, l = arguments.length; i < l; i++) {
        console.log( _dump(doop(arguments[i])) );
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
 * Run the jsdoc application.
 * @todo Refactor function (and require statements) into smaller functions
 */
function main() {
    var _ = require('underscore');
    var fs = require('jsdoc/fs');
    var path = require('jsdoc/path');
    var taffy = require('taffydb').taffy;

    var jsdoc = {
        augment: require('jsdoc/augment'),
        borrow: require('jsdoc/borrow'),
        Config: require('jsdoc/config'),
        opts: {
            args: require('jsdoc/opts/args')
        },
        'package': require('jsdoc/package'),
        plugins: require('jsdoc/plugins'),
        Readme: require('jsdoc/readme'),
        src: {
            filter: require('jsdoc/src/filter'),
            handlers: require('jsdoc/src/handlers'),
            parser: require('jsdoc/src/parser')
        },
        tutorial: {
            resolver: require('jsdoc/tutorial/resolver')
        }
    };

    var confPath;
    var defaultOpts;
    var docs;
    var filter;
    var i;
    var info;
    var isFile;
    var failCount;
    var l;
    var packageDocs;
    var packageJson;
    var runner;
    var sourceFiles;
    var template;


    defaultOpts = {
        destination: './out/',
        encoding: 'utf8'
    };

    // get JSDoc version number
    info = JSON.parse(fs.readFileSync(path.join(env.dirname, 'package.json'), 'utf8'));
    env.version = {
        number: info.version,
        revision: new Date(parseInt(info.revision, 10)).toUTCString()
    };

    env.opts = jsdoc.opts.args.parse(env.args);

    confPath = env.opts.configure || path.join(env.dirname, 'conf.json');
    try {
        isFile = fs.statSync(confPath).isFile();
    }
    catch(e) {
        isFile = false;
    }

    if ( !isFile && !env.opts.configure ) {
        confPath = path.join(env.dirname, 'conf.json.EXAMPLE');
    }

    try {
        env.conf = new jsdoc.Config( fs.readFileSync(confPath, 'utf8') )
            .get();
    }
    catch (e) {
        throw new Error('Cannot parse the config file ' + confPath + ': ' + e);
    }

    // look for options on the command line, in the config file, and in the defaults, in that order
    env.opts = _.defaults(env.opts, env.conf.opts, defaultOpts);

    if (env.opts.help) {
        console.log( jsdoc.opts.args.help() );
        process.exit(0);
    } else if (env.opts.test) {
        runner = require( path.join(env.dirname, 'test/runner') );
        runner(function(failCount) {
            process.exit(failCount);
        });
    } else if (env.opts.version) {
        console.log('JSDoc ' + env.version.number + ' (' + env.version.revision + ')');
        process.exit(0);
    }

    if (env.conf.source && env.conf.source.include) {
        env.opts._ = (env.opts._ || []).concat(env.conf.source.include);
    }

    // any source file named package.json or README.md is treated special
    for (i = 0, l = env.opts._.length; i < l; i++ ) {
        if (/\bpackage\.json$/i.test(env.opts._[i])) {
            packageJson = fs.readFileSync( env.opts._[i], 'utf8' );
            env.opts._.splice(i--, 1);
        }
        
        if (/(\bREADME|\.md)$/i.test(env.opts._[i])) {
            env.opts.readme = new jsdoc.Readme(env.opts._[i]).html;
            env.opts._.splice(i--, 1);
        }
    }
    
    if (env.conf.source && env.opts._.length) { // are there any files to scan and parse?
        filter = new jsdoc.src.filter.Filter(env.conf.source);

        env.sourceFiles = sourceFiles = app.jsdoc.scanner.scan(env.opts._,
            (env.opts.recurse? 10 : undefined), filter);

        app.jsdoc.parser = jsdoc.src.parser.createParser(env.conf.parser);
        if (env.conf.plugins) {
            jsdoc.plugins.installPlugins(env.conf.plugins, app.jsdoc.parser);
        }    
        jsdoc.src.handlers.attachTo(app.jsdoc.parser);

        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);

        //The files are ALWAYS useful for the templates to have
        //If there is no package.json, just create an empty package
        packageDocs = new jsdoc.package.Package(packageJson);
        packageDocs.files = sourceFiles || [];
        docs.push(packageDocs);

        jsdoc.borrow.indexAll(docs);

        jsdoc.augment.addInherited(docs);
        jsdoc.borrow.resolveBorrows(docs);

        app.jsdoc.parser.fireProcessingComplete(docs);

        if (env.opts.explain) {
            dump(docs);
            process.exit(0);
        }

        if (env.opts.tutorials) {
            jsdoc.tutorial.resolver.load(env.opts.tutorials);
            jsdoc.tutorial.resolver.resolve();
        }

        env.opts.template = (function() {
            var publish = env.opts.template || 'templates/default';
            // if we don't find it, keep the user-specified value so the error message is useful
            return path.getResourcePath(publish) || env.opts.template;
        })();

        try {
            template = require(env.opts.template + '/publish');
        }
        catch(e) {
            throw new Error('Unable to load template: ' + e.message || e);
        }

        // templates should include a publish.js file that exports a "publish" function
        if (template.publish && typeof template.publish === 'function') {
            // convert this from a URI back to a path if necessary
            env.opts.template = path._uriToPath(env.opts.template);
            template.publish(
                taffy(docs),
                env.opts,
                jsdoc.tutorial.resolver.root
            );
        }
        else {
            throw new Error(env.opts.template + ' does not export a "publish" function. Global ' +
                '"publish" functions are no longer supported.');
        }

        process.exit(0);
    }
}

try {
    main();
    env.run.finish = new Date();
}
catch(e) {
    env.run.finish = new Date();
    if (e.rhinoException != null) {
        e.rhinoException.printStackTrace();
        process.exit(1);
    } else {
        throw e;
    }
}
