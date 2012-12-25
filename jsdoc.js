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
     * The type of VM that is executing jsdoc:
     *
     * + {@link modules:jsdoc/util/vm.RHINO}: Mozilla Rhino.
     * + {@link modules:jsdoc/util/vm.NODEJS}: Node.js.
     *
     * **Note**: Rhino is the only VM that is currently supported.
     * @type string
     */
    vm: require('jsdoc/util/vm').vm,

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
        @deprecated Use `__dirname` instead.
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

var args = Array.prototype.slice.call(arguments, 0);
env.dirname = (function() {
    var dirname;

    if ( require('jsdoc/util/vm').isRhino() ) {
        // Rhino has no native way to get the base dirname of the current script,
        // so this information must be manually passed in from the command line.
        for (var i = 0; i < args.length; i++) {
            if ( /^--dirname(?:=(.+?)(\/|\/\.)?)?$/i.test(args[i]) ) {
                if (RegExp.$1) {
                    dirname = RegExp.$1; // last wins
                    args.splice(i--, 1); // remove --dirname opt from arguments
                }
                else {
                    dirname = args[i + 1];
                    args.splice(i--, 2);
                }
            }
        }
    } else {
        // TODO: can't assign to __dirname here because on Rhino, it's not defined yet
        // dirname = __dirname;
    }

    return dirname;
})();
// must be assigned after env.dirname, which modifies args
env.args = args;
args = undefined;

// TODO: consider always including an initializer for the current VM
if ( require('jsdoc/util/vm').isRhino() ) {
    require('jsdoc/util/include')(env.dirname + '/rhino/rhino-shim.js');
}

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
    var fs = require('fs');
    var handlers = require('jsdoc/src/handlers');
    var include = require('jsdoc/util/include');
    var Package = require('jsdoc/package').Package;
    var path = require('path');
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
    var l;
    var packageDocs;
    var packageJson;
    var sourceFiles;
    var template;


    /**
     * If the current VM is Rhino, convert a path to a URI that meets the operating system's
     * requirements. Otherwise, return the original path.
     * @param {string} path The path to convert.
     * @return {string} A URI that meets the operating system's requirements, or the original path.
     */
    function pathToUri(_path) {
        var result = _path;

        if ( vm.isRhino() ) {
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

        if ( vm.isRhino() ) {
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
            result = path.resolve(__dirname, template);
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

    defaultOpts = {
        destination: './out/'
    };

    env.opts = args.parse(env.args);

    try {
        env.conf = new Config( fs.readFileSync( env.opts.configure || path.join(__dirname, 'conf.json') ) ).get();
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
    }

    if (env.conf.plugins) {
        plugins.installPlugins(env.conf.plugins, app.jsdoc.parser);
    }

    // any source file named package.json or README.md is treated special
    for (i = 0, l = env.opts._.length; i < l; i++ ) {
        if (/\bpackage\.json$/i.test(env.opts._[i])) {
            packageJson = require('fs').readFileSync( env.opts._[i] );
            env.opts._.splice(i--, 1);
        }
        
        if (/(\bREADME|\.md)$/i.test(env.opts._[i])) {
            env.opts.readme = new Readme(env.opts._[i]).html;
            env.opts._.splice(i--, 1);
        }
    }
    
    if (env.conf.source && env.conf.source.include) {
        env.opts._ = (env.opts._ || []).concat(env.conf.source.include);
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

        env.opts.template = getTemplatePath(env.opts.template) || env.opts.template;

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
                env.opts.template = uriToPath(env.opts.template);
                publish(
                    taffy(docs),
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
