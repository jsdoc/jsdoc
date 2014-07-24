/*
    Copyright 2014 Google Inc. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
'use strict';

// TODO: cull
var _ = require('underscore-contrib');
var beautify = require('js-beautify').html;
var DocletHelper = require('./lib/doclethelper');
var doop = require('jsdoc/util/doop');
var Filter = require('jsdoc/src/filter').Filter;
var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');
var logger = require('jsdoc/util/logger');
var moment = require('moment');
var name = require('jsdoc/name');
var path = require('jsdoc/path');
var Polyglot = require('node-polyglot');
var Scanner = require('jsdoc/src/scanner').Scanner;
var stripJsonComments = require('strip-json-comments');
var Swig = require('swig').Swig;
var SymbolTracker = require('./lib/symboltracker');
var taffy = require('taffydb').taffy;
var Template = require('./lib/template');
var util = require('util');

var ENUMS = require('./lib/enums');
var CATEGORIES = ENUMS.CATEGORIES;
var CONFIG_KEY = ENUMS.CONFIG_KEY;
var JSDOC_MISSING_TRANSLATION = ENUMS.JSDOC_MISSING_TRANSLATION;
var KIND_TO_CATEGORY = ENUMS.KIND_TO_CATEGORY;
var OUTPUT_FILE_CATEGORIES = ENUMS.OUTPUT_FILE_CATEGORIES;

var hasOwnProp = Object.prototype.hasOwnProperty;

var PublishJob = exports.PublishJob = function PublishJob(template, options) {
    this.config = global.env.conf.templates || {};
    this.templateConfig = this.config[CONFIG_KEY] || {};

    this.options = options;
    this.destination = this.options.destination;
    this.package = null;
    this.template = template;
    this.renderOptions = {
        beautify: this.templateConfig.beautify
    };

    // TODO: does JSDoc set this automatically? if not, it should...
    this.options.encoding = this.options.encoding || 'utf8';

    // claim some special filenames in advance
    // don't register `index` as a link; it's also a valid longname
    // TODO: clarify that comment. also, should we stop registering `global`, too?
    this.indexUrl = helper.getUniqueFilename('index');
    this.globalUrl = helper.getUniqueFilename('global');
    helper.registerLink('global', this.globalUrl);
};

PublishJob.prototype.setPackage = function setPackage(packageDoclet) {
    this.package = packageDoclet;

    return this;
};

PublishJob.prototype.copyStaticFiles = function copyStaticFiles() {
    var staticFiles;
    var staticFilter;
    var staticPaths;
    var staticScanner;

    var destination = this.destination;
    var RECURSE_DEPTH = 10;
    var self = this;
    var staticPath = path.join(this.template.path, 'static');

    function copyStaticFile(filepath) {
        var fromDir = fs.toDir(filepath);
        var toDir = fs.toDir(filepath.replace(staticPath + path.sep, destination));

        fs.mkPath(toDir);
        logger.debug('Copying static file %s to %s', path.relative(self.template.path, filepath),
            toDir);
        fs.copyFileSync(filepath, toDir);
    }

    // copy the template's static files
    fs.ls(staticPath, RECURSE_DEPTH).forEach(copyStaticFile);

    // copy user-specified static files
    if (this.templateConfig.staticFiles) {
        staticPaths = this.templateConfig.staticFiles.paths || [];
        staticFilter = new Filter(this.templateConfig.staticFiles);
        staticScanner = new Scanner();

        staticPaths.forEach(function(filepath) {
            var extraFiles = staticScanner.scan([filepath], RECURSE_DEPTH, staticFilter);

            extraFiles.forEach(copyStaticFile);
        });
    }

    return this;
};

PublishJob.prototype.createOutputDirectory = function createOutputDirectory() {
    logger.debug('Creating the output directory %s', this.destination);
    fs.mkPath(this.destination);

    return this;
};

PublishJob.prototype.render = function render(viewName, data, options) {
    var opts = _.defaults(options, this.renderOptions);

    return this.template.render(viewName, data, opts);
};

// options: resolveLinks, url
// data: whatever the template expects
PublishJob.prototype.generate = function generate(viewName, data, url, options) {
    var output;
    var outputPath = path.join(this.destination, url);

    data.package = data.package || this.package;

    options = options ? _.clone(options) : {};
    // don't try to beautify non-HTML files
    if (path.extname(url) !== '.html') {
        options.beautify = false;
    }

    logger.debug('Rendering template output for %s with view %s', url, viewName);
    output = this.render(viewName, data, options);

    // TODO: we should be doing this where necessary within the templates
    if (options.resolveLinks) {
        output = helper.resolveLinks(output);
    }

    try {
        fs.writeFileSync(outputPath, output, 'utf8');
    }
    catch (e) {
        logger.error('Unable to save the output file %s: %s', outputPath, e.message);
    }

    return this;
};

function removeLeadingNamespace(name) {
    return name.replace(/^[a-zA-Z]+:/, '');
}

PublishJob.prototype.generateTocData = function generateTocData(navTree, options) {
    var targets = [];
    var tocData = [];

    options = options || {};

    function TocItem(item, children) {
        this.label = helper.linkto(item.longname, removeLeadingNamespace(item.name));
        this.id = item.longname;
        this.children = children || [];
    }

    function addItems(data) {
        Object.keys(data).sort().forEach(function(key) {
            var item = data[key];
            var tocEntry = new TocItem(item);

            if (!targets.length) {
                tocData.push(tocEntry);
            } else {
                targets[targets.length - 1].children.push(tocEntry);
            }

            targets.push(tocEntry);
            addItems(item.children);
            targets.pop();
        });
    }

    logger.debug('Generating the JS file for the table of contents');

    // If there are globals, force their TOC item to come first
    if (options.hasGlobals) {
        addItems({
            'global': {
                name: 'Globals',
                longname: 'global',
                children: []
            }
        });
    }
    addItems(navTree);

    // TODO: generate() should handle this automatically
    fs.mkPath(path.join(this.destination, 'scripts'));
    return this.generate('toc', { tocData: tocData }, 'scripts/jsdoc-toc.js');
};

PublishJob.prototype.generateTutorials = function generateTutorials(tutorials) {
    var children = [];
    var self = this;

    while (tutorials.children.length) {
        children = children.concat(tutorials.children);
        tutorials = tutorials.children;
    }

    children.forEach(function(child) {
        var title = removeLeadingNamespace(child.title);
        var tutorialData = {
            pageCategory: CATEGORIES.TUTORIALS,
            pageTitle: title,
            header: title,
            content: child.parse(),
            children: child.children
        };
        var url = helper.tutorialToUrl(child.title);

        self.generate('tutorial', tutorialData, url, { resolveLinks: true });
    });

    return this;
};

PublishJob.prototype.generateSourceFiles = function generateSourceFiles(pathMap) {
    var encoding = this.options.encoding;
    var options = {
        resolveLinks: false
    };
    var self = this;
    var url;

    if (this.templateConfig.outputSourceFiles !== false) {
        Object.keys(pathMap).forEach(function(file) {
            var data = {
                docs: null,
                pageCategory: CATEGORIES.SOURCES,
                pageTitle: pathMap[file]
            };

            // links are keyed to the shortened path
            url = helper.getUniqueFilename(pathMap[file]);
            helper.registerLink(pathMap[file], url);

            try {
                logger.debug('Generating pretty-printed source for %s', pathMap[file]);
                data.docs = helper.htmlsafe(fs.readFileSync(file, encoding));
            }
            catch (e) {
                logger.error('Unable to generate output for source file %s: %s', file, e.message);
                return;
            }

            self.generate('source', data, url, options);
        });
    } else {
        logger.debug('Pretty-printed source files are disabled; not generating them');
    }

    return this;
};

PublishJob.prototype.generateGlobals = function generateGlobals(doclets) {
    var data;
    var options;

    if (doclets && doclets.hasDoclets()) {
        logger.debug('Generating globals page as %s', this.globalUrl);
        data = {
            members: doclets
        };
        options = {
            resolveLinks: true
        };

        this.generate('globals', data, this.globalUrl, options);
    } else {
        logger.debug('Not generating a globals page because no globals were found');
    }

    return this;
};

// TODO: this is not at all what we want to put in the index...
PublishJob.prototype.generateIndex = function generateIndex(packages, readme) {
    var data;

    packages = packages || [];
    data = (readme ? packages.concat({readme: readme}) : packages.slice(0));

    logger.debug('Generating index page as %s', this.indexUrl);
    this.generate('index', data, this.indexUrl);

    return this;
};

// TODO: redo to use longname/memberof lookup tables!
PublishJob.prototype.generateByLongname = function generateByLongname(longname, doclets, members) {
    var category;
    var self = this;

    doclets = doclets || {};

    // don't generate pages for package info
    // TODO: improve upon this hack
    if (longname.indexOf('package:') === 0) {
        return this;
    }

    Object.keys(doclets).forEach(function(category) {
        var data;
        var url;

        // Don't generate output if there are no doclets, or if the current category is not one that
        // gets its own output page
        if (!doclets[category].length || OUTPUT_FILE_CATEGORIES.indexOf(category) === -1) {
            return;
        }

        url = helper.longnameToUrl[longname];

        data = {
            docs: doclets[category],
            members: members || {},
            pageCategory: category,
            pageTitle: removeLeadingNamespace(name.shorten(longname).name)
        };

        self.generate('symbol', data, url, { resolveLinks: true });
    });

    return this;
};

/**
    @param {TAFFY} data See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(data, opts, tutorials) {
    var docletHelper = new DocletHelper();
    var template = new Template(opts.template, global.env.conf.templates.baseline);
    var job = new PublishJob(template, opts);

    // set up tutorials
    // TODO: why does templateHelper need to be involved?
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(data);

    job.setPackage(docletHelper.getPackage());

    // create the output directory so we can start generating files
    job.createOutputDirectory()
        // then generate the source files so we can link to them
        .generateSourceFiles(docletHelper.shortPaths);

    // generate globals page if necessary
    job.generateGlobals(docletHelper.globals);

    // generate index page
    // TODO: method params will need to change
    job.generateIndex(docletHelper.symbols.get(CATEGORIES.PACKAGES), opts.readme);

    // generate the rest of the output files (excluding tutorials)
    docletHelper.getOutputLongnames().forEach(function(longname) {
        job.generateByLongname(longname, docletHelper.longname[longname],
            docletHelper.memberof[longname]);
    });

    // finally, generate the TOC data and tutorials, and copy static files to the output directory
    job.generateTutorials(tutorials)
        .generateTocData(docletHelper.navTree, { hasGlobals: docletHelper.hasGlobals() })
        .copyStaticFiles();
};
