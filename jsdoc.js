/*global __timerPool: true, app: true, args: true, env: true, Packages: true, publish: true */
/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */

// try: $ java -classpath build-files/java/classes/js.jar org.mozilla.javascript.tools.shell.Main main.js `pwd` script/to/parse.js

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

var hasOwnProp = Object.prototype.hasOwnProperty;

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
        The type of VM that is executing jsdoc.
        @type string
    */
    vm: '',

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
        @type string
    */
    dirname: '.',

    /**
        The command line arguments, parsed into a key/value hash.
        @type Object
        @example if (env.opts.help) { print 'Helpful message.'; }
    */
    opts: {}
};

args = Array.prototype.slice.call(arguments, 0);

// rhino has no native way to get the base dirname of the currently running script
// so this information must be manually passed in from the command line
for (var i = 0; i < args.length; i++) {
    if ( /^--dirname(?:=(.+?)(\/|\/\.)?)?$/i.test(args[i]) ) {
        if (RegExp.$1) {
            env.dirname = RegExp.$1; // last wins
            args.splice(i--, 1); // remove --dirname opt from arguments
        }
        else {
            env.dirname = args[i + 1];
            args.splice(i--, 2);
        }
    }
}

env.args = args;

load(env.dirname + '/lib/rhino-shim.js');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


/** @global
    @param {string} filepath The path to the script file to include (read and execute).
*/
function include(filepath) {
    try {
        filepath = include.resolve(filepath);
        load(filepath);
    }
    catch (e) {
        console.log('Cannot include "' + env.dirname + '/' + filepath + '": '+e);
    }
}
include.resolve = function(filepath) {
    if (filepath.indexOf('/') === 0) {
        return filepath;
    }
    
    return env.dirname + '/' + filepath;
};

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
    var doop = require('jsdoc/util/doop').doop;
    var _dump = require('jsdoc/util/dumper').dump;
    for (var i = 0, l = arguments.length; i < l; i++) {
        print( _dump(doop(arguments[i])) );
    }
}

function installPlugins(plugins, p) {
    var dictionary = require('jsdoc/tag/dictionary'),
        parser = p || app.jsdoc.parser;

    // allow user-defined plugins to...
    for (var i = 0, leni = plugins.length; i < leni; i++) {
        var plugin = require(plugins[i]);

        //...register event handlers
        if (plugin.handlers) {
            for (var eventName in plugin.handlers) {
                if ( hasOwnProp.call(plugin.handlers, eventName) ) {
                    parser.on(eventName, plugin.handlers[eventName]);
                }
            }
        }

        //...define tags
        if (plugin.defineTags) {
            plugin.defineTags(dictionary);
        }

        //...add a node visitor
        if (plugin.nodeVisitor) {
            parser.addNodeVisitor(plugin.nodeVisitor);
        }
    }
}

function indexAll(docs) {
    var lookupTable = {};

    docs.forEach(function(doc) {
        if ( !hasOwnProp.call(lookupTable, doc.longname) ) {
            lookupTable[doc.longname] = [];
        }
        lookupTable[doc.longname].push(doc);
    });
    docs.index = lookupTable;
}


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
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


/**
    Run the jsdoc application.
 */
function main() {
    var sourceFiles,
        packageJson,
        docs,
        jsdoc = {
            opts: {
                args: require('jsdoc/opts/args'),
            }
        },
        resolver,
        _ = require('underscore'),
        fs = require('fs'),
        path = require('path'),
        Config = require('jsdoc/config');

    /**
        Detect the type of VM running jsdoc.
        **Note**: Rhino is the only VM that is currently supported.
        @return {string} rhino|node
     */
    function detectVm() {
        if (typeof Packages === "object" &&
            Object.prototype.toString.call(Packages) === "[object JavaPackage]") {
            return "rhino";
        } else if ( require && require.main && module && (require.main === module) ) {
            return "node";
        } else {
            // unknown VM
            return;
        }
    }

    /**
     * If the current VM is Rhino, convert a path to a URI that meets the operating system's
     * requirements. Otherwise, return the original path.
     * @param {string} path The path to convert.
     * @return {string} A URI that meets the operating system's requirements, or the original path.
     */
    function pathToUri(_path) {
        var result = _path;

        if (env.vm === 'rhino') {
            result = new java.io.File(result).toURI() + '';
        }

        return result;
    }

    /**
     * If the current VM is Rhino, convert a URI to a path that meets the operating system's
     * requirements. Otherwise, assume the "URI" is really a path, and return the original path.
     * @param {string} uri The URI to convert.
     * @return {string} A path that meets the operating system's requirements.
     */
    function uriToPath(uri) {
        var result = uri;

        if (env.vm === 'rhino') {
            result = new java.io.File( new java.net.URI(result) ) + '';
        }

        return result;
    }

    /**
        Retrieve the fully resolved path to the requested template.

        @param {string} template - The path to the requested template. May be an absolute path;
        a path relative to the current working directory; or a path relative to the JSDoc directory.
        @return {string} The fully resolved path (or, on Rhino, a URI) to the requested template.
     */
    function getTemplatePath(template) {
        var result;
        template = template || 'templates/default';

        function pathExists(_path) {
            try {
                fs.readdirSync(_path);
            }
            catch(e) {
                return false;
            }

            return true;
        }

        // first, try resolving it relative to the current working directory (or just normalize it
        // if it's an absolute path)
        result = path.resolve(template);
        if ( !pathExists(result) ) {
            // next, try resolving it relative to the JSDoc directory
            result = path.resolve(env.dirname, template);
            if ( !pathExists(result) ) {
                result = null;
            }
        }

        // this only messes with the path on Rhino
        if (result) {
            result = pathToUri(result);
        }

        return result;
    }

    /**
     * Convert the doclets to the format that the template is expecting. The format is specified in
     * `env.conf.templates.docletFormat`. Supported formats are `taffydb` (a TaffyDB container) and
     * and `array` (the raw array of doclets). The default value is `taffydb`.
     * @param {Array.<Object>} doclets The array of doclets.
     * @return {TAFFY|Array.<Object>} The converted doclets.
     */
    function convertDoclets(doclets) {
        if (env.conf.templates && env.conf.templates.docletFormat &&
            env.conf.templates.docletFormat === 'array') {
            return doclets;
        } else {
            return require('taffydb').taffy(doclets);
        }
    }

    env.vm = detectVm();

    var defaultOpts = {
        destination: './out/'
    };

    env.opts = jsdoc.opts.args.parse(env.args);

    try {
        env.conf = new Config( fs.readFileSync( env.opts.configure || env.dirname + '/conf.json' ) ).get();
    }
    catch (e) {
        try {
            //Try to copy over the example conf
            var example = fs.readFileSync(env.dirname + '/conf.json.EXAMPLE', 'utf8');
            fs.writeFileSync(env.dirname + '/conf.json', example, 'utf8');
            env.conf = JSON.parse(example);
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
        console.log( jsdoc.opts.args.help() );
        process.exit(0);
    } else if (env.opts.test) {
        include('test/runner.js');
        process.exit(0);
    }

    if (env.conf.plugins) {
        installPlugins(env.conf.plugins);
    }

    // any source file named package.json or README.md is treated special
    for (var i = 0, l = env.opts._.length; i < l; i++ ) {
        if (/\bpackage\.json$/i.test(env.opts._[i])) {
            packageJson = require('fs').readFileSync( env.opts._[i] );
            env.opts._.splice(i--, 1);
        }
        
        if (/(\bREADME|\.md)$/i.test(env.opts._[i])) {
            var Readme = require('jsdoc/readme');
            env.opts.readme = new Readme(env.opts._[i]).html;
            env.opts._.splice(i--, 1);
        }
    }
    
    if (env.conf.source && env.conf.source.include) {
        env.opts._ = (env.opts._ || []).concat(env.conf.source.include);
    }
    
    if (env.conf.source && env.opts._.length > 0) { // are there any files to scan and parse?
        var filter = new (require('jsdoc/src/filter').Filter)(env.conf.source);

        sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined), filter);

        require('jsdoc/src/handlers').attachTo(app.jsdoc.parser);

        docs = app.jsdoc.parser.parse(sourceFiles, env.opts.encoding);

        //The files are ALWAYS useful for the templates to have
        //If there is no package.json, just create an empty package
        var packageDocs = new (require('jsdoc/package').Package)(packageJson);
        packageDocs.files = sourceFiles || [];
        docs.push(packageDocs);

        indexAll(docs);

        require('jsdoc/augment').addInherited(docs);
        require('jsdoc/borrow').resolveBorrows(docs);

        if (env.opts.explain) {
            console.log(docs);
            process.exit(0);
        }

        // load this module anyway to ensure root instance exists
        // it's not a problem since without tutorials root node will have empty children list
        resolver = require('jsdoc/tutorial/resolver');

        if (env.opts.tutorials) {
            resolver.load(env.opts.tutorials);
            resolver.resolve();
        }

        env.opts.template = getTemplatePath(env.opts.template) || env.opts.template;

        var template;
        try {
            template = require(env.opts.template + '/publish');
        }
        catch(e) {
            throw new Error("Unable to load template: " + e.message || e);
        }

        // templates should include a publish.js file that exports a "publish" function
        if (template.publish && typeof template.publish === 'function') {
            // convert this from a URI back to a path if necessary
            env.opts.template = uriToPath(env.opts.template);
            template.publish(
                convertDoclets(docs),
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
                env.opts.template = uriToPath(env.opts.template);
                publish(
                    convertDoclets(docs),
                    env.opts,
                    resolver.root
                );
            }
            else {
                throw new Error( env.opts.template + " does not export a 'publish' function." );
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
    } else {
        throw e;
    }
}
