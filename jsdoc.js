/*global app: true, args: true, env: true, publish: true */
/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */

// try: $ java -classpath build-files/java/classes/js.jar org.mozilla.javascript.tools.shell.Main main.js `pwd` script/to/parse.js

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
    args: [],

    /**
        The parsed JSON data from the configuration file.
        @type Object
    */
    conf: {},

    /**
        The absolute path to the base directory of the jsdoc application.
        @private
        @deprecated Use `__dirname` instead.
        @type string
    */
    dirname: '.',

    /**
        The command line arguments, parsed into a key/value hash.
        @type Object
        @example if (env.opts.help) { console.log('Helpful message.'); }
    */
    opts: {},

    /**
        The jsdoc version number and revision date.
        @type Object
    */
    version: {}
};

// initialize the environment for the current JavaScript VM
(function(args) {
    var vm = require('jsdoc/util/vm').vm;
    // TODO: may need to move this file to support Node.js
    require('initialize')[vm](args);
})( Array.prototype.slice.call(arguments, 0) );

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
 * Data that must be shared across the entire application.
 * @namespace
 */
app = {
    jsdoc: {
        scanner: new (require('jsdoc/src/scanner').Scanner)(),
        parser: new (require('jsdoc/src/parser').Parser)(),
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
    var args = require('jsdoc/opts/args');
    var augment = require('jsdoc/augment');
    var borrow = require('jsdoc/borrow');
    var Config = require('jsdoc/config');
    var Filter = require('jsdoc/src/filter').Filter;
    var fs = require('jsdoc/fs');
    var handlers = require('jsdoc/src/handlers');
    var include = require('jsdoc/util/include');
    var Package = require('jsdoc/package').Package;
    var path = require('jsdoc/path');
    var plugins = require('jsdoc/plugins');
    var Readme = require('jsdoc/readme');
    var resolver = require('jsdoc/tutorial/resolver');
    var taffy = require('taffydb').taffy;
    var vm = require('jsdoc/util/vm');

    var defaultOpts;
    var docs;
    var exampleConf;
    var filter;
    var i;
    var info;
    var l;
    var packageDocs;
    var packageJson;
    var sourceFiles;
    var template;


    defaultOpts = {
        destination: './out/',
        encoding: 'utf8'
    };

    // get JSDoc version number
    info = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    env.version = {
        number: info.version,
        revision: new Date(parseInt(info.revision, 10)).toUTCString()
    };

    env.opts = args.parse(env.args);

    try {
        env.conf = new Config(
            fs.readFileSync( env.opts.configure || path.join(__dirname, 'conf.json'), 'utf8' )
        ).get();
    }
    catch (e) {
        try {
            // Use the example file if possible
            exampleConf = fs.readFileSync(path.join(__dirname, 'conf.json.EXAMPLE'), 'utf8');
            env.conf = JSON.parse(exampleConf);
        }
        catch(e) {
            throw('Configuration file cannot be evaluated. ' + e);
        }
    }

    // look for options on the command line, in the config file, and in the defaults, in that order
    env.opts = _.defaults(env.opts, env.conf.opts, defaultOpts);

    // which version of javascript will be supported? (rhino only)
    if (typeof version === 'function') {
        version(env.conf.jsVersion || 180);
    }

    if (env.opts.help) {
        console.log( args.help() );
        process.exit(0);
    } else if (env.opts.test) {
        include('test/runner.js');
        process.exit(0);
    } else if (env.opts.version) {
        console.log('JSDoc ' + env.version.number + ' (' + env.version.revision + ')');
        process.exit(0);
    }

    if (env.conf.plugins) {
        plugins.installPlugins(env.conf.plugins, app.jsdoc.parser);
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
            env.opts.readme = new Readme(env.opts._[i]).html;
            env.opts._.splice(i--, 1);
        }
    }
    
    if (env.conf.source && env.opts._.length > 0) { // are there any files to scan and parse?
        filter = new Filter(env.conf.source);

        sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined), filter);

        handlers.attachTo(app.jsdoc.parser);

        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);

        //The files are ALWAYS useful for the templates to have
        //If there is no package.json, just create an empty package
        packageDocs = new Package(packageJson);
        packageDocs.files = sourceFiles || [];
        docs.push(packageDocs);

        borrow.indexAll(docs);

        augment.addInherited(docs);
        borrow.resolveBorrows(docs);

        if (env.opts.explain) {
            console.log(docs);
            process.exit(0);
        }

        if (env.opts.tutorials) {
            resolver.load(env.opts.tutorials);
            resolver.resolve();
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
                resolver.root
            );
        }
        else {
            // old templates define a global "publish" function, which is deprecated
            include(env.opts.template + '/publish.js');
            if (publish && typeof publish === 'function') {
                console.log( env.opts.template + ' uses a global "publish" function, which is ' +
                    'deprecated and may not be supported in future versions. ' +
                    'Please update the template to use "exports.publish" instead.' );
                // convert this from a URI back to a path if necessary
                env.opts.template = path._uriToPath(env.opts.template);
                publish(
                    taffy(docs),
                    env.opts,
                    resolver.root
                );
            }
            else {
                throw new Error( env.opts.template + ' does not export a "publish" function.' );
            }
        }
    }
}

try {
    main();
    env.run.finish = new Date();
    process.exit(0);
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
