/**
 * Helper methods for running JSDoc on the command line.
 *
 * A few critical notes for anyone who works on this module:
 * 
 * + The module should really export an instance of `JSDoc`, and `props` should be properties of a
 * `JSDoc` instance. However, Rhino interpreted `this` as a reference to `global` within the
 * prototype's methods, so we couldn't do that.
 * + Use the `fs` and `path` modules rather than `jsdoc/fs` and `jsdoc/path`, which are not
 * initialized correctly when they're loaded this early.
 * 
 * @private
 */
module.exports = (function() {
'use strict';

var props = {
    docs: [],
    packageJson: null
};

var app = global.app;
var env = global.env;

var JSDoc = {};

// TODO: docs
JSDoc.setVersionInfo = function() {
    var fs = require('fs');
    var path = require('path');

    var info = JSON.parse( fs.readFileSync(path.join(env.dirname, 'package.json'), 'utf8') );

    env.version = {
        number: info.version,
        revision: new Date( parseInt(info.revision, 10) ).toUTCString()
    };

    return JSDoc;
};

// TODO: docs
JSDoc.loadConfig = function() {
    var _ = require('underscore');
    var args = require('jsdoc/opts/args');
    var Config = require('jsdoc/config');
    var fs = require('jsdoc/fs');
    var path = require('jsdoc/path');

    var confPath;
    var isFile;

    var defaultOpts = {
        destination: './out/',
        encoding: 'utf8'
    };

    env.opts = args.parse(env.args);

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
        env.conf = new Config( fs.readFileSync(confPath, 'utf8') )
            .get();
    }
    catch (e) {
        throw new Error('Cannot parse the config file ' + confPath + ': ' + e);
    }

    // look for options on the command line, in the config file, and in the defaults, in that order
    env.opts = _.defaults(env.opts, env.conf.opts, defaultOpts);

    return JSDoc;
};

// TODO: docs
JSDoc.runCommand = function(cb) {
    var cmd;

    var opts = env.opts;

    if (opts.help) {
        cmd = JSDoc.printHelp;
    }
    else if (opts.test) {
        cmd = JSDoc.runTests;
    }
    else if (opts.version) {
        cmd = JSDoc.printVersion;
    }
    else {
        cmd = JSDoc.main;
    }

    cmd(cb);
};

// TODO: docs
JSDoc.printHelp = function(cb) {
    console.log( require('jsdoc/opts/args').help() );
    cb(0);
};

// TODO: docs
JSDoc.runTests = function(cb) {
    var path = require('jsdoc/path');

    var runner = require( path.join(env.dirname, 'test/runner') );

    console.log('Running tests...');
    runner(function(failCount) {
        cb(failCount);
    });
};

// TODO: docs
JSDoc.printVersion = function(cb) {
    console.log('JSDoc %s (%s)', env.version.number, env.version.revision);
    cb(0);
};

// TODO: docs
JSDoc.main = function(cb) {
    JSDoc.scanFiles();

    if (env.sourceFiles.length) {
        JSDoc.createParser()
            .parseFiles()
            .processParseResults();
    }

    env.run.finish = new Date();
    cb(0);
};

JSDoc.scanFiles = function() {
    var Filter = require('jsdoc/src/filter').Filter;
    var fs = require('jsdoc/fs');
    var Readme = require('jsdoc/readme');

    var filter;
    var opt;

    if (env.conf.source && env.conf.source.include) {
        env.opts._ = (env.opts._ || []).concat(env.conf.source.include);
    }

    // source files named `package.json` or `README.md` get special treatment
    for (var i = 0, l = env.opts._.length; i < l; i++) {
        opt = env.opts._[i];

        if ( /\bpackage\.json$/i.test(opt) ) {
            props.packageJson = fs.readFileSync(opt, 'utf8');
            env.opts._.splice(i--, 1);
        }
        
        if ( /(\bREADME|\.md)$/i.test(opt) ) {
            env.opts.readme = new Readme(opt).html;
            env.opts._.splice(i--, 1);
        }
    }

    // are there any files to scan and parse?
    if (env.conf.source && env.opts._.length) {
        filter = new Filter(env.conf.source);

        env.sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse? 10 : undefined),
            filter);
    }

    return JSDoc;
};

JSDoc.createParser = function() {
    var handlers = require('jsdoc/src/handlers');
    var parser = require('jsdoc/src/parser');
    var plugins = require('jsdoc/plugins');

    app.jsdoc.parser = parser.createParser(env.conf.parser);

    if (env.conf.plugins) {
        plugins.installPlugins(env.conf.plugins, app.jsdoc.parser);
    }

    handlers.attachTo(app.jsdoc.parser);

    return JSDoc;
};

JSDoc.parseFiles = function() {
    var augment = require('jsdoc/augment');
    var borrow = require('jsdoc/borrow');
    var Package = require('jsdoc/package').Package;

    var docs;
    var packageDocs;

    props.docs = docs = app.jsdoc.parser.parse(env.sourceFiles,
        env.opts.encoding);

    // If there is no package.json, just create an empty package
    packageDocs = new Package(props.packageJson);
    packageDocs.files = env.sourceFiles || [];
    docs.push(packageDocs);

    borrow.indexAll(docs);

    augment.addInherited(docs);
    borrow.resolveBorrows(docs);

    app.jsdoc.parser.fireProcessingComplete(docs);

    return JSDoc;
};

JSDoc.processParseResults = function() {
    if (env.opts.explain) {
        JSDoc.dumpParseResults();
    }
    else {
        JSDoc.resolveTutorials();
        JSDoc.generateDocs();
    }
};

JSDoc.dumpParseResults = function() {
    global.dump(props.docs);
};

JSDoc.resolveTutorials = function() {
    var resolver = require('jsdoc/tutorial/resolver');

    if (env.opts.tutorials) {
        resolver.load(env.opts.tutorials);
        resolver.resolve();
    }
};

JSDoc.generateDocs = function() {
    var path = require('jsdoc/path');
    var resolver = require('jsdoc/tutorial/resolver');
    var taffy = require('taffydb').taffy;

    var template;

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
            taffy(props.docs),
            env.opts,
            resolver.root
        );
    }
    else {
        throw new Error(env.opts.template + ' does not export a "publish" function. Global ' +
            '"publish" functions are no longer supported.');
    }

};

return JSDoc;

})();
