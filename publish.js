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
var taffy = require('taffydb').taffy;
var util = require('util');

var ENUMS = require('./lib/enums');
var CATEGORIES = ENUMS.CATEGORIES;
var CONFIG_KEY = ENUMS.CONFIG_KEY;
var JSDOC_MISSING_TRANSLATION = ENUMS.JSDOC_MISSING_TRANSLATION;
var KIND_TO_CATEGORY = ENUMS.KIND_TO_CATEGORY;
var OUTPUT_FILE_CATEGORIES = ENUMS.OUTPUT_FILE_CATEGORIES;

var hasOwnProp = Object.prototype.hasOwnProperty;

function loadJson(filepath) {
    var result;

    try {
        if (filepath) {
            result = JSON.parse(stripJsonComments(fs.readFileSync(filepath, 'utf8')));
        }
    }
    catch (e) {
        logger.fatal('Unable to load the file %s: %s', filepath, e);
    }

    return result;
}

// Tracks ALL doclets by category (similar, but not identical, to their "kind")
// TODO: could use another flavor of this that tracks by longname but not category
// TODO: export?
function SymbolTracker() {
    var category;

    var categories = Object.keys(CATEGORIES);

    for (var i = 0, l = categories.length; i < l; i++) {
        category = CATEGORIES[categories[i]];
        this[category] = [];
    }
}

SymbolTracker.prototype.add = function add(doclet, category) {
    if (hasOwnProp.call(this, category)) {
        this[category].push(doclet);
    }
};

SymbolTracker.prototype.remove = function remove(doclet, category) {
    var idx;

    if (hasOwnProp.call(this, category)) {
        idx = this[category].indexOf(doclet);
        if (idx !== -1) {
            this[category].splice(idx, 1);
        }
    }
};

SymbolTracker.prototype.get = function get(category) {
    var categories = category ? [category] : _.values(CATEGORIES);
    var current;
    var result = [];

    for (var i = 0, l = categories.length; i < l; i++) {
        current = categories[i];
        if (hasOwnProp.call(this, current) && this[current].length) {
            result = result.concat(this[current]);
        }
    }

    return result;
};

SymbolTracker.prototype.hasDoclets = function hasDoclets(category) {
    var current;

    var categories = category ? [category] : Object.keys(CATEGORIES);
    var result = false;

    for (var i = 0, l = categories.length; i < l; i++) {
        current = CATEGORIES[categories[i]];

        if (current && this[current].length) {
            result = true;
            break;
        }
    }

    return result;
};

var DocletHelper = exports.DocletHelper = function DocletHelper() {
    this.data = null;
    // Doclets tracked by longname
    this.longname = {};
    // Doclets tracked by memberof
    this.memberof = {};
    // Global doclets
    this.globals = new SymbolTracker();
    // Listeners tracked by event longname
    this.listeners = {};
    // Longnames of doclets that need their own output file
    this.needsFile = {};
    this.navTree = {};
    this.shortPaths = {};
    this.symbols = new SymbolTracker();

    this._sourcePaths = [];
};

// TODO: it would be nice if JSDoc added scope: "global" for all of these, so the template didn't
// have to infer this from the lack of a memberof...
// TODO: think carefully about whether these are the only symbols that should appear as global. For
// example, why not show a global class as such?
function isGlobal(doclet) {
    var globalKinds = ['member', 'function', 'constant', 'typedef'];

    // Doclets for `module.exports` are a little weird; they're neither global
    // nor a memberof anything
    if (!doclet.memberof && globalKinds.indexOf(doclet.kind) !== -1 &&
        doclet.longname.indexOf('module:') !== 0) {
        return true;
    }

    return false;
}

// TODO: rename?
DocletHelper.prototype._trackByCategory = function _trackByCategory(doclet, category) {
    var longname = doclet.longname;
    var self = this;

    if (isGlobal(doclet)) {
        // Only track the doclet as a global; we don't want it to appear elsewhere
        this.globals.add(doclet, category);
    }
    else if (longname) {
        // Track the doclet by its longname. Also, if the doclet is a member of something else,
        // track it by its memberof value, so we can easily retrieve all of the members later.
        ['longname', 'memberof'].forEach(function(prop) {
            var docletValue = doclet[prop];

            if (docletValue) {
                self[prop][docletValue] = self[prop][docletValue] || new SymbolTracker();
                self[prop][docletValue].add(doclet, category);
            }
        });

        // Keep track of longnames that require their own output file. By creating this list now,
        // we make it efficient to extract the correct doclets from this.longname later.
        if (longname && OUTPUT_FILE_CATEGORIES.indexOf(category) !== -1) {
            this.needsFile[longname] = true;
        }
    }

    return this;
};

DocletHelper.prototype._trackListeners = function _trackListeners(doclet) {
    // TODO: shouldn't JSDoc do this? does it already?
    var listens = doclet.listens || [];
    var self = this;

    listens.forEach(function(longname) {
        self.listeners[longname] = self.listeners[longname] || new SymbolTracker();
        self.listeners[longname].add(doclet, CATEGORIES.LISTENERS);
    });
};


// TODO: rename
// TODO: can we move the doclet-munging elsewhere?
DocletHelper.prototype._categorize = function _categorize(doclet) {
    var category;

    // Do some minor pre-processing
    switch (doclet.kind) {
        case 'constant':
            doclet.kind = 'member';
            break;

        case 'external':
            // strip quotes from externals, since we allow quoted names that would normally indicate
            // a namespace hierarchy (as in `@external "jquery.fn"`)
            // TODO: we should probably be doing this for other types of symbols, here or elsewhere;
            // see jsdoc3/jsdoc#396
            doclet.name = doclet.name.replace(/^"([\s\S]+)"$/g, '$1');
            break;

        default:
            // ignore
            break;
    }

    category = KIND_TO_CATEGORY[doclet.kind];

    if (!category) {
        logger.debug('Not tracking doclet with unknown kind %s. Name: %s, longname: %s',
            doclet.kind, doclet.name, doclet.longname);
    }

    if (category) {
        this.symbols.add(doclet, category);
        this._trackByCategory(doclet, category);
    }

    this._trackListeners(doclet);

    return this;
};

DocletHelper.prototype.addDoclets = function addDoclets(taffyData) {
    var doclet;
    var doclets;
    var i;
    var l;

    // TODO: make these steps configurable (especially sorting!)
    // TODO: try to avoid storing the TaffyDB data
    this.data = helper.prune(taffyData);
    this.data.sort('longname, version, since');

    doclets = this.data().get();

    for (i = 0, l = doclets.length; i < l; i++) {
        this.addDoclet(doclets[i]);
    }

    this.findShortPaths()
        .resolveModuleExports()
        .addListeners();
    // TODO: consider moving this if we're not going to attach the doclets
    this.navTree = helper.longnamesToTree(this.getOutputLongnames());

    for (i = 0, l = doclets.length; i < l; i++) {
        doclet = doclets[i];

        this.registerLink(doclet)
            .addShortPath(doclet)
            .addId(doclet);
    }

    return this;
};

DocletHelper.prototype.addDoclet = function addDoclet(doclet) {
    this._categorize(doclet)
        .processExamples(doclet)
        .processSee(doclet)
        .addSourcePath(doclet)
        .addAncestors(doclet);

    return this;
};

DocletHelper.prototype.hasGlobals = function hasGlobals() {
    return this.globals.hasDoclets();
};

DocletHelper.prototype.registerLink = function registerLink(doclet) {
    var url = helper.createLink(doclet);
    helper.registerLink(doclet.longname, url);

    return this;
};

DocletHelper.prototype.processExamples = function processExamples(doclet) {
    if (doclet.examples) {
        doclet.examples = doclet.examples.map(function(example) {
            var caption, code;

            // TODO: ought to happen in JSDoc proper
            if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(?:\s*[\n\r])([\s\S]+)$/i)) {
                caption = RegExp.$1;
                code = RegExp.$2;
            }

            return {
                caption: caption || '',
                code: code || example
            };
        });
    }

    return this;
};

DocletHelper.prototype.processSee = function processSee(doclet) {
    var url;

    if (doclet.see) {
        // support `@see #methodName` as a link to methodName within the current file
        doclet.see = doclet.see.map(function(see) {
            if (/^#\S+/.test(see)) {
                see = helper.linkto(doclet.longname, null, null, see.replace(/^#/, ''));
            }

            return see;
        });
    }

    return this;
};

DocletHelper.prototype.addAncestors = function addAncestors(doclet) {
    // TODO: this appears to be the only place where we use this.data; can we get rid of it?
    doclet.ancestors = helper.getAncestors(this.data, doclet);
};

DocletHelper.prototype.addId = function addId(doclet) {
    var id;

    var url = helper.longnameToUrl[doclet.longname];

    if (url.indexOf('#') !== -1) {
        id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
    }
    else {
        id = doclet.name;
    }

    if (id) {
        doclet.id = helper.getUniqueId(url, id);
    }

    return this;
};

function getPathFromMeta(meta) {
    // TODO: why 'null' as a string?
    return meta.path && meta.path !== 'null' ?
        path.join(meta.path, meta.filename) :
        meta.filename;
}

DocletHelper.prototype.addSourcePath = function addSourcePath(doclet) {
    var sourcePath;

    if (doclet.meta) {
        sourcePath = getPathFromMeta(doclet.meta);
        this.shortPaths[sourcePath] = null;

        if (this._sourcePaths.indexOf(sourcePath) === -1) {
            this._sourcePaths.push(sourcePath);
        }
    }

    return this;
};

function lacksProperty(obj, key, targetValue) {
    return !hasOwnProp.call(obj, key) && targetValue !== undefined;
}

function sortModuleDoclets(moduleDoclet, exportsDoclets, docletsByLongname) {
    var result = {
        primary: moduleDoclet || null,
        secondary: []
    };

    if (exportsDoclets) {
        exportsDoclets.forEach(function(doclet) {
            // Don't add module doclets as secondary doclets
            if (doclet.kind === 'module') {
                return;
            }

            // TODO: get rid of this, or make it configurable and move to template file
            doclet = doop(doclet);
            doclet.name = doclet.name
                .replace('module:', 'require("') + '")';
            if (doclet.kind === 'class' || doclet.kind === 'function') {
                doclet.name = '(' + doclet.name + ')';
            }

            docletsByLongname[doclet.longname].remove(doclet, KIND_TO_CATEGORY[doclet.kind]);

            result.secondary.push(doclet);
        });
    }

    return result;
}

/**
 * For classes or functions with the same name as modules (which indicates that the module exports
 * only that class or function), attach the classes or functions to the `exports` property of the
 * appropriate module doclets. The name of each class or function is also updated for display
 * purposes. This function mutates the original arrays.
 *
 * @private
 * @returns {this}
 */
DocletHelper.prototype.resolveModuleExports = function resolveModuleExports() {
    var exportsDoclets;
    var modules = this.symbols.get(CATEGORIES.MODULES);
    var newModules = new SymbolTracker();
    var self = this;
    var sorted;

    if (modules && modules.length) {
        modules.forEach(function(moduleDoclet) {
            exportsDoclets = self.longname[moduleDoclet.longname].get();
            sorted = sortModuleDoclets(moduleDoclet, exportsDoclets, self.longname);

            if (sorted.secondary.length) {
                moduleDoclet.exports = sorted.secondary;
            }
            // Add the primary module doclet to the new list of module doclets.
            newModules.add(sorted.primary, CATEGORIES.MODULES);
        });
    }

    this.symbols[CATEGORIES.MODULES] = newModules;

    return this;
};

DocletHelper.prototype.addListeners = function addListeners() {
    var events = this.symbols.get(CATEGORIES.EVENTS);
    var self = this;

    events.forEach(function(eventDoclet) {
        var listenerDoclets;

        var listeners = self.listeners[eventDoclet.longname];
        if (listeners) {
            listenerDoclets = listeners.get(CATEGORIES.LISTENERS);
            if (listenerDoclets && listenerDoclets.length) {
                eventDoclet.listeners = eventDoclet.listeners || [];
                listenerDoclets.forEach(function(listenerDoclet) {
                    eventDoclet.listeners.push(listenerDoclet.longname);
                });
            }
        }
    });

    return this;
};

DocletHelper.prototype.findShortPaths = function findShortPaths() {
    var commonPrefix;

    var self = this;

    if (this._sourcePaths.length) {
        commonPrefix = path.commonPrefix(this._sourcePaths);
        this._sourcePaths.forEach(function(filepath) {
            self.shortPaths[filepath] = filepath.replace(commonPrefix, '')
                // always use forward slashes
                .replace(/\\/g, '/');
        });
    }

    return this;
};

DocletHelper.prototype.addShortPath = function addShortPath(doclet) {
    var filepath;

    if (doclet.meta) {
        filepath = getPathFromMeta(doclet.meta);
        if (filepath && hasOwnProp.call(this.shortPaths, filepath)) {
            doclet.meta.shortpath = this.shortPaths[filepath];
        }
    }

    return this;
};

DocletHelper.prototype.getOutputLongnames = function getOutputLongnames() {
    return Object.keys(this.needsFile);
};

DocletHelper.prototype.getPackage = function getPackage() {
    return this.symbols.get(CATEGORIES.PACKAGES)[0];
};

// TODO: move?
var defaultConfig = exports.defaultConfig = {
    dateFormat: 'LL',
    locale: 'en',
    outputSourceFiles: true,
    resourcePath: './lang'
};

function loadConfig(filepath, templatePath) {
    var config = _.defaults(loadJson(filepath) || {}, defaultConfig);

    config.resourceFile = config.resourceFile || path.join(templatePath, config.resourcePath,
        config.locale + '.json');

    return config;
}

var Template = exports.Template = function Template(templatePath, optionsFile) {
    this.config = loadConfig(optionsFile, templatePath);
    this.l10n = new Polyglot({ locale: this.config.locale });
    this.path = templatePath;
    this.swig = null;
    this.views = {};

    this.init();

    logger.debug('Initialized the template in %s with config: %j', this.path, this.config);
};

/**
 * Initialize the template engine with required configuration values.
 *
 * @returns {this}
 */
Template.prototype.init = function init() {
    var self = this;
    // TODO: allow users to add helpers/filters/tags
    var swigHelpers = require(path.join(this.path, 'helpers'));
    var swigFilters = require(path.join(this.path, 'filters'));
    var swigLoader = require(path.join(this.path, 'loader'));
    var swigTags = require(path.join(this.path, 'tags'));
    var locals;

    // load the string resources
    this.l10n.extend(loadJson(this.config.resourceFile));
    // set locale for localized dates
    moment().lang(this.config.locale);
    // TODO: allow user-specified Moment.js config
    moment.lang('en', {
        longDateFormat: {
            LL: 'MMMM D, YYYY'
        }
    });

    // define local functions that templates can use, and create a Swig instance with those locals
    // TODO: move to helpers.js; turn helpers.js into an instantiable class that takes a Template
    locals = {
        CATEGORIES: CATEGORIES,
        config: function config(key) {
            return _.getPath(self.options, key);
        },
        hasOwnProp: function hasOwnProp() {
            var args = Array.prototype.slice.call(arguments, 0);
            var localSelf = args.shift();

            return Object.prototype.hasOwnProperty.apply(localSelf, args);
        },
        linkto: helper.linkto,
        localizedDate: function localizedDate(formatString) {
            return moment().format(formatString || self.config.dateFormat);
        },
        log: logger.debug,
        outputSourceFiles: this.config.outputSourceFiles,
        translate: function(key, opts) {
            var options;
            var result;

            if (typeof opts === 'number') {
                options = { smart_count: opts };
            }
            else {
                options = opts || {};
            }

            options = _.defaults(options, {
                _: JSDOC_MISSING_TRANSLATION,
                smart_count: 1
            });
            result = self.l10n.t(key, options);

            if (result === JSDOC_MISSING_TRANSLATION) {
                logger.warn('Unable to find a localized string for the key %s', key);
            }

            return result;
        }
    };

    Object.keys(swigHelpers).forEach(function(helperMethod) {
        locals[helperMethod] = swigHelpers[helperMethod];
    });

    this.swig = new Swig({
        locals: locals,
        loader: swigLoader()
    });

    // define the filters that templates can use
    Object.keys(swigFilters).forEach(function(filter) {
        self.swig.setFilter(filter, swigFilters[filter]);
    });

    // define the extra tags that templates can use
    Object.keys(swigTags).forEach(function(tag) {
        self.swig.setTag(tag, swigTags[tag].parse, swigTags[tag].compile, swigTags[tag].ends,
            swigTags[tag].blockLevel);
    });

    // load the base views
    this.addViews(fs.ls(path.join(this.path, 'views'), 0));

    return this;
};

/**
 * Add one or more views to the template.
 *
 * @param {Array.<string>} views - The paths to the views.
 * @returns {this}
 */
Template.prototype.addViews = function addViews(views) {
    var self = this;

    views.forEach(function(view) {
        logger.debug('Loading the view %s', path.relative(self.path, view));
        var basename = path.basename(view);
        var name = basename.replace(path.extname(basename), '');

        self.views[name] = self.swig.compileFile(view);
    });

    return this;
};

Template.prototype.render = function render(viewName, data, options) {
    var beautifyOptions;
    var rendered;

    if (!hasOwnProp.call(this.views, viewName)) {
        logger.fatal('Cannot render output with unknown view %s', viewName);
        return '';
    }

    options = options || {};
    rendered = this.views[viewName](data);

    // TODO: also need to normalize whitespace in tags where that's okay
    if (options.beautify !== false) {
        /*eslint camelcase:0 */
        beautifyOptions = {
            indent_size: 2,
            // js-beautify ignores the value 0 because it's falsy
            max_preserve_newlines: 0.1
        };
        rendered = beautify(rendered, beautifyOptions);
    }

    return rendered;
};

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
