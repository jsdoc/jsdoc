/**
 * Helper methods for running JSDoc on the command line.
 *
 * (This module should really export an instance of `JSDoc`, and `props` should be properties of a
 * `JSDoc` instance. However, Rhino interpreted `this` as a reference to `global` within the
 * prototype's methods, so we couldn't do that. Oh well.)
 * 
 * @private
 */
module.exports = (function() {

var props = {
    docs: [],
    packageJson: null
};

var JSDoc = {};

// TODO: docs
JSDoc.setVersionInfo = function() {
    var fs = require('jsdoc/fs');
    var path = require('jsdoc/path');

    var info = JSON.parse( fs.readFileSync(path.join(global.env.dirname, 'package.json'), 'utf8') );

    global.env.version = {
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

    global.env.opts = args.parse(global.env.args);

    confPath = global.env.opts.configure || path.join(global.env.dirname, 'conf.json');
    try {
        isFile = fs.statSync(confPath).isFile();
    }
    catch(e) {
        isFile = false;
    }

    if ( !isFile && !global.env.opts.configure ) {
        confPath = path.join(global.env.dirname, 'conf.json.EXAMPLE');
    }

    try {
        global.env.conf = new Config( fs.readFileSync(confPath, 'utf8') )
            .get();
    }
    catch (e) {
        throw new Error('Cannot parse the config file ' + confPath + ': ' + e);
    }

    // look for options on the command line, in the config file, and in the defaults, in that order
    global.env.opts = _.defaults(global.env.opts, global.env.conf.opts, defaultOpts);

    return JSDoc;
};

// TODO: docs
JSDoc.runCommand = function(cb) {
    var cmd;

    var opts = global.env.opts;

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

    var runner = require( path.join(global.env.dirname, 'test/runner') );

    console.log('Running tests...');
    runner(function(failCount) {
        cb(failCount);
    });
};

// TODO: docs
JSDoc.printVersion = function(cb) {
    console.log('JSDoc %s (%s)', global.env.version.number, global.env.version.revision);
    cb(0);
};

// TODO: docs
JSDoc.main = function(cb) {
    JSDoc.scanFiles();

    if (global.env.sourceFiles.length) {
        JSDoc.createParser()
            .parseFiles()
            .processParseResults();
    }

    global.env.run.finish = new Date();
    cb(0);
};

JSDoc.scanFiles = function() {
    var Filter = require('jsdoc/src/filter').Filter;
    var fs = require('jsdoc/fs');
    var Readme = require('jsdoc/readme');

    var filter;
    var opt;

    if (global.env.conf.source && global.env.conf.source.include) {
        global.env.opts._ = (global.env.opts._ || []).concat(global.env.conf.source.include);
    }

    // source files named `package.json` or `README.md` get special treatment
    for (var i = 0, l = global.env.opts._.length; i < l; i++) {
        opt = global.env.opts._[i];

        if ( /\bpackage\.json$/i.test(opt) ) {
            props.packageJson = fs.readFileSync(opt, 'utf8');
            global.env.opts._.splice(i--, 1);
        }
        
        if ( /(\bREADME|\.md)$/i.test(opt) ) {
            global.env.opts.readme = new Readme(opt).html;
            global.env.opts._.splice(i--, 1);
        }
    }

    // are there any files to scan and parse?
    if (global.env.conf.source && global.env.opts._.length) {
        filter = new Filter(global.env.conf.source);

        global.env.sourceFiles = global.app.jsdoc.scanner.scan(global.env.opts._, (global.env.opts.recurse? 10 : undefined),
            filter);
    }

    return JSDoc;
};

JSDoc.createParser = function() {
    var handlers = require('jsdoc/src/handlers');
    var parser = require('jsdoc/src/parser');
    var plugins = require('jsdoc/plugins');

    global.app.jsdoc.parser = parser.createParser(global.env.conf.parser);

    if (global.env.conf.plugins) {
        plugins.installPlugins(global.env.conf.plugins, global.app.jsdoc.parser);
    }

    handlers.attachTo(global.app.jsdoc.parser);

    return JSDoc;
};

JSDoc.parseFiles = function() {
    var augment = require('jsdoc/augment');
    var borrow = require('jsdoc/borrow');
    var Package = require('jsdoc/package').Package;

    var docs;
    var packageDocs;

    props.docs = docs = global.app.jsdoc.parser.parse(global.env.sourceFiles,
        global.env.opts.encoding);

    // If there is no package.json, just create an empty package
    packageDocs = new Package(props.packageJson);
    packageDocs.files = global.env.sourceFiles || [];
    docs.push(packageDocs);

    borrow.indexAll(docs);

    augment.addInherited(docs);
    borrow.resolveBorrows(docs);

    global.app.jsdoc.parser.fireProcessingComplete(docs);

    return JSDoc;
};

JSDoc.processParseResults = function() {
    if (global.env.opts.explain) {
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

    if (global.env.opts.tutorials) {
        resolver.load(global.env.opts.tutorials);
        resolver.resolve();
    }
};

JSDoc.generateDocs = function() {
    var path = require('jsdoc/path');
    var resolver = require('jsdoc/tutorial/resolver');
    var taffy = require('taffydb').taffy;

    var template;

    global.env.opts.template = (function() {
        var publish = global.env.opts.template || 'templates/default';
        // if we don't find it, keep the user-specified value so the error message is useful
        return path.getResourcePath(publish) || global.env.opts.template;
    })();

    try {
        template = require(global.env.opts.template + '/publish');
    }
    catch(e) {
        throw new Error('Unable to load template: ' + e.message || e);
    }

    // templates should include a publish.js file that exports a "publish" function
    if (template.publish && typeof template.publish === 'function') {
        // convert this from a URI back to a path if necessary
        global.env.opts.template = path._uriToPath(global.env.opts.template);
        template.publish(
            taffy(props.docs),
            global.env.opts,
            resolver.root
        );
    }
    else {
        throw new Error(global.env.opts.template + ' does not export a "publish" function. Global ' +
            '"publish" functions are no longer supported.');
    }

};

return JSDoc;

})();
