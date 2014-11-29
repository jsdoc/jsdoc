/*global env: true */
'use strict';

/**
 * @module jsdoc/util/templateRenderer
 */

var _ = require('underscore');
var helper = require('jsdoc/util/templateHelper');
var path = require('jsdoc/path');
var fs = require('jsdoc/fs');
var template = require('jsdoc/template');
var docletHelper = require('jsdoc/util/docletHelper');
var logger = require('jsdoc/util/logger');
var doop = require('jsdoc/util/doop');
var util = require('util');

var templateDefaultOptions = {
    layoutFile: 'layout.tmpl',
    staticFiles: false,
    navSections: ['index', 'modules', 'externals', 'classes', 'events', 'namespaces', 'mixins', 'tutorials', 'globals'],
    outputSourceFiles: true,
    homeTitle: 'Home'
};

function capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function shortenPaths(files, commonPrefix) {
    Object.keys(files).forEach(function(file) {
        files[file].shortened = files[file].resolved.replace(commonPrefix, '')
            // always use forward slashes
            .replace(/\\/g, '/');
    });

    return files;
}

/**
 * Create a templateRenderer instance
 * @param data
 * @param tutorials
 * @param {Object} options
 * @param {string} options.template
 * @param {string} options.readme
 * @param {string} options.mainpagetitle
 * @param {Object} [templateOptions]
 * @constructor
 */
var TemplateRenderer = function (data, tutorials, options, templateOptions) {
    this.options = options;

    var templateConfig = env.conf.templates || {};
    if (templateConfig.default) {
        templateDefaultOptions = _.extend({}, templateConfig.default , templateDefaultOptions);
    }
    this.templateOptions = _.defaults(templateOptions || {}, templateDefaultOptions);

    // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
    // doesn't try to hand them out later
    this.indexUrl = helper.getUniqueFilename('index');
    // don't call registerLink() on this one! 'index' is also a valid longname

    this.globalUrl = helper.getUniqueFilename('global');
    helper.registerLink('global', this.globalUrl);

    this.templatePath = path.normalize(options.template);
    this.view = new template.Template(path.join(this.templatePath, 'tmpl'));

    // set up templating
    this.view.layout = (this.templateOptions.layoutFile !== templateDefaultOptions.layoutFile) ?
        path.getResourcePath(path.dirname(this.templateOptions.layoutFile), path.basename(this.templateOptions.layoutFile)) :
        this.templateOptions.layoutFile;

    // sort data
    this.data = this.sortData(data);

    // set tutorials
    this.tutorials = this.setTutorials(tutorials);

    // set and create output dir
    this.setOutDir();

    // copy the template's static files to outdir
    this.copyTemplateStaticFiles();

    // copy user-specified static files to outdir
    this.copyStaticFiles();

    this.massageDoclets();
    this.collectSourceFiles();
    this.registerLinks();
    this.createDocletIds();
    this.addSignatures();

    // add template helpers
    this.view.find = this.find.bind(this);
    this.view.linkto = helper.linkto;
    this.view.resolveAuthorLinks = helper.resolveAuthorLinks;
    this.view.htmlsafe = helper.htmlsafe;
    this.view.outputSourceFiles = this.templateOptions.outputSourceFiles !== false;
    this.view.tutoriallink = this.tutoriallink;
    this.view.nav = this.buildNav();
    this.view.templateOptions = this.templateOptions;

    this.beforeGenerate.call(this);

    this.generateSourceFiles();
    this.generateGlobalPage();
    this.generateHomePage();
    this.generatePages();
    this.generateTutorials();

    this.afterGenerate.call(this);
};

TemplateRenderer.prototype.beforeGenerate = function () {};
TemplateRenderer.prototype.afterGenerate = function () {};

/**
 * Find helper
 * @param spec
 */
TemplateRenderer.prototype.find = function (spec) {
    return helper.find(this.data, spec);
};

/**
 * Get tutorial link helper
 * @param tutorial
 */
TemplateRenderer.prototype.tutoriallink = function (tutorial) {
    return helper.toTutorial(tutorial, null, { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
};

/**
 * Set the members
 * @returns {Object}
 */
TemplateRenderer.prototype.setMembers = function () {
    var members = helper.getMembers(this.data);
    this.attachModuleSymbols(members.modules);
    members.tutorials = this.tutorials.children;
    return members;
};

/**
 * Get the members
 * @returns {Object|*}
 */
TemplateRenderer.prototype.getMembers = function () {
    return this.members || (this.members = this.setMembers());
};

/**
 * Sort taffy data
 * @param data
 * @returns {TAFFY}
 */
TemplateRenderer.prototype.sortData = function (data) {
    data = helper.prune(data);
    data.sort('longname, version, since');
    helper.addEventListeners(data);
    return data;
};

/**
 * Get the navigation data used by buildNav
 * @returns {{}|*} returns this.navigationData
 */
TemplateRenderer.prototype.getNavigationData = function () {
    if (typeof this.navigationData !== 'object') {
        var navData = {};
        this.templateOptions.navSections.forEach(function (section) {
            navData[section] = {
                members: []
            };

            if (section === 'index') {
                navData[section].title = this.templateOptions.homeTitle;
                navData[section].link = this.indexUrl;
            } else if (section === 'globals') {
                navData[section].title = 'Global';
                navData[section].link = this.globalUrl;
            } else {
                navData[section].title = capitalizeFirstLetter(section);
            }
        }, this);
        this.navigationData = navData;
    }
    return this.navigationData;
};

/**
 * Create a nav object that will be passed to the views to generate the navigation
 * @returns {{}}
 */
TemplateRenderer.prototype.buildNav = function () {
    var navigationData = this.getNavigationData();
    var members = this.getMembers();

    var seen = {};
    var linkto = helper.linkto;
    var tutoriallink = this.tutoriallink;
    var neverSeen = function (item) {
        return !Object.prototype.hasOwnProperty.call(seen, item.longname);
    };

    var nav = {};
    Object.keys(navigationData).forEach(function (navigationSection) {
        var items = [];
        if (! members.hasOwnProperty(navigationSection)) {
            nav[navigationSection] = navigationData[navigationSection];
        } else {
            members[navigationSection].forEach(function(m) {
                if (_.contains(['modules', 'classes', 'events', 'namespaces', 'mixins', 'interfaces'], navigationSection)) {
                    if ( neverSeen(m) ) {
                        items.push({
                            url: linkto(m.longname, m.name)
                        });
                    }
                } else if (navigationSection === 'externals') {
                    if ( neverSeen(m) ) {
                        items.push({
                            url: linkto( m.longname, m.name.replace(/(^"|"$)/g, '') )
                        });
                    }
                } else if (navigationSection === 'tutorials') {
                    if ( neverSeen(m) ) {
                        items.push({
                            url: tutoriallink(m.name)
                        });
                    }
                } else if (navigationSection === 'globals') {
                    if ( m.kind !== 'typedef' && neverSeen(m) ) {
                        if ( neverSeen(m) ) {
                            items.push({
                                url: linkto(m.longname, m.name)
                            });
                        }
                    }
                }
                seen[m.longname] = true;
            });

            if (items.length) {
                if (navigationSection === 'globals') {
                    delete navigationData[navigationSection].link;
                }
                navigationData[navigationSection].members = items;
                nav[navigationSection] = navigationData[navigationSection];
            }
        }
    });

    return nav;
};

/**
 * @private
 * @param tutorials
 */
TemplateRenderer.prototype.setTutorials = function (tutorials) {
    // set up tutorials for helper
    helper.setTutorials(tutorials);
    return tutorials;
};

/**
 * Create the output directory
 */
TemplateRenderer.prototype.setOutDir = function () {
    var outdir = this.options.destination;

    // update outdir if necessary, then create outdir
    var packageInfo = ( helper.find(this.data, {kind: 'package'}) || [] ) [0];
    if (packageInfo && packageInfo.name) {
        outdir = path.join( outdir, packageInfo.name, (packageInfo.version || '') );
    }
    this.outdir = outdir;
    fs.mkPath(this.outdir);
};

TemplateRenderer.prototype.copyTemplateStaticFiles = function () {
    var fromDir = path.join(this.templatePath, 'static');
    var staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(function(fileName) {
        var toDir = fs.toDir( fileName.replace(fromDir, this.outdir) );
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
    }, this);
};

TemplateRenderer.prototype.copyStaticFiles = function () {
    var staticFiles = this.templateOptions.staticFiles;
    var staticFilePaths;
    var staticFileFilter;
    var staticFileScanner;

    if (staticFiles) {
        // The canonical property name is `include`. We accept `paths` for backwards compatibility
        // with a bug in JSDoc 3.2.x.
        staticFilePaths = staticFiles.include || staticFiles.paths || [];
        staticFileFilter = new (require('jsdoc/src/filter')).Filter(staticFiles);
        staticFileScanner = new (require('jsdoc/src/scanner')).Scanner();

        staticFilePaths.forEach(function(filePath) {
            var extraStaticFiles = staticFileScanner.scan([filePath], 10, staticFileFilter);

            extraStaticFiles.forEach(function(fileName) {
                var sourcePath = fs.toDir(filePath);
                var toDir = fs.toDir( fileName.replace(sourcePath, this.outdir) );
                fs.mkPath(toDir);
                fs.copyFileSync(fileName, toDir);
            }, this);
        }, this);
    }
};

/**
 * Collect Source Files and Massage doclet.meta
 */
TemplateRenderer.prototype.collectSourceFiles = function () {
    var sourceFiles = {};
    var sourceFilePaths = [];
    this.data().each(function(doclet) {
        // build a list of source files
        var sourcePath;
        if (doclet.meta) {
            sourcePath = docletHelper.getPathFromDoclet(doclet);
            sourceFiles[sourcePath] = {
                resolved: sourcePath,
                shortened: null
            };
            if (sourceFilePaths.indexOf(sourcePath) === -1) {
                sourceFilePaths.push(sourcePath);
            }
        }
    });

    if (sourceFilePaths.length) {
        sourceFiles = shortenPaths( sourceFiles, path.commonPrefix(sourceFilePaths) );
    }

    this.data().each(function(doclet) {
        // add a shortened version of the full path
        var docletPath;
        if (doclet.meta) {
            docletPath = docletHelper.getPathFromDoclet(doclet);
            docletPath = sourceFiles[docletPath].shortened;
            if (docletPath) {
                doclet.meta.shortpath = docletPath;
            }
        }
    });

    this.sourceFiles = sourceFiles;
};

/**
 * Massage doclets
 */
TemplateRenderer.prototype.massageDoclets = function () {
    this.data().each(function(doclet) {
        doclet.attribs = '';

        if (doclet.examples) {
            doclet.examples = doclet.examples.map(function(example) {
                var caption, code;

                if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
                    caption = RegExp.$1;
                    code = RegExp.$3;
                }

                return {
                    caption: caption || '',
                    code: code || example
                };
            });
        }
        if (doclet.see) {
            doclet.see.forEach(function(seeItem, i) {
                doclet.see[i] = docletHelper.hashToLink(doclet, seeItem);
            });
        }
    });
};

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
TemplateRenderer.prototype.attachModuleSymbols = function (modules) {
    var doclets = helper.find(this.data, { longname: {left: 'module:'} });
    var symbols = {};


    // build a lookup table
    doclets.forEach(function(symbol) {
        symbols[symbol.longname] = symbols[symbol.longname] || [];
        symbols[symbol.longname].push(symbol);
    });

    return modules.map(function(module) {
        if (symbols[module.longname]) {
            module.modules = symbols[module.longname].map(function(symbol) {
                symbol = doop(symbol);

                if (symbol.kind === 'class' || symbol.kind === 'function') {
                    symbol.name = symbol.name.replace('module:', '(require("') + '"))';
                }

                return symbol;
            });
        }
    });
};

TemplateRenderer.prototype.addSignatureParams = function (doclet) {
    var params = doclet.params ? this.addParamAttributes(doclet.params) : [];
    doclet.signature = util.format( '%s(%s)', (doclet.signature || ''), params.join(', ') );
};

TemplateRenderer.prototype.addSignatureTypes = function (doclet) {
    var types = docletHelper.getSignatureTypes(doclet);
    doclet.signature = (doclet.signature || '') +
        '<span class="type-signature">' +
        (types.length ? ' :' + types.join('|') : '') +
        '</span>';
};

TemplateRenderer.prototype.addAttribs = function (doclet) {
    var attribs = helper.getAttribs(doclet);
    var attribsString = this.buildAttribsString(attribs);
    doclet.attribs = util.format('<span class="type-signature">%s</span>', attribsString);
};

TemplateRenderer.prototype.addSignatureReturns = function (doclet) {
    var returnTypesString = '';
    var ret = docletHelper.getSignatureReturns(doclet);
    var attribsString = this.buildAttribsString(ret.attribsString);
    var returnTypes = ret.returnTypes;
    if (returnTypes.length) {
        returnTypesString = util.format( ' &rarr; %s{%s}', attribsString, returnTypes.join('|') );
    }
    doclet.signature = '<span class="signature">' + (doclet.signature || '') + '</span>' +
        '<span class="type-signature">' + returnTypesString + '</span>';
};

TemplateRenderer.prototype.buildAttribsString = function (attribs) {
    var attribsString = '';

    if (attribs && attribs.length) {
        attribsString = helper.htmlsafe( util.format('(%s) ', attribs.join(', ')) );
    }

    return attribsString;
};

TemplateRenderer.prototype.addParamAttributes = function (params) {
    return params.filter(function (param) {
        return param.name && param.name.indexOf('.') === -1;
    }).map(this.updateItemName.bind(this));
};

TemplateRenderer.prototype.updateItemName = function (param) {
    var attributes = this.getSignatureAttributes(param);
    var itemName = param.name || '';

    if (param.variable) {
        itemName = '&hellip;' + itemName;
    }

    if (attributes.length) {
        itemName = util.format(
            '%s<span class="signature-attributes">%s</span>',
            itemName,
            attributes.join(', ')
        );
    }

    return itemName;
};

TemplateRenderer.prototype.getSignatureAttributes = function (item) {
    var attributes = [];

    if (item.optional) {
        attributes.push('opt');
    }

    if (item.nullable === true) {
        attributes.push('nullable');
    }
    else if (item.nullable === false) {
        attributes.push('non-null');
    }

    return attributes;
};

TemplateRenderer.prototype.addSignatures = function () {
    // do this after the urls have all been generated
    this.data().each(function(doclet) {
        // only function, class and typedefs that contain functions get a signature
        if ( docletHelper.needsSignature(doclet) ) {
            this.addSignatureParams(doclet);
            this.addSignatureReturns(doclet);
            this.addAttribs(doclet);
        }

        doclet.ancestors = helper.getAncestorLinks(this.data, doclet);

        if (doclet.kind === 'member') {
            this.addSignatureTypes(doclet);
            this.addAttribs(doclet);
        }

        if (doclet.kind === 'constant') {
            this.addSignatureTypes(doclet);
            this.addAttribs(doclet);
            doclet.kind = 'member';
        }
    }.bind(this));
};

/**
 * Register links for all the doclets
 */
TemplateRenderer.prototype.registerLinks = function () {
    this.data().each(function(doclet) {
        var url = helper.createLink(doclet);
        helper.registerLink(doclet.longname, url);
    });
};

/**
 * Attach ids to doclets
 */
TemplateRenderer.prototype.createDocletIds = function () {
    this.data().each(function(doclet) {
        var url = helper.longnameToUrl[doclet.longname];

        if (url.indexOf('#') > -1) {
            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
        }
        else {
            doclet.id = doclet.name;
        }
    });
};

/**
 * Generate the pretty-printed source files first so other pages can link to them
 */
TemplateRenderer.prototype.generateSourceFiles = function () {
    if (this.view.outputSourceFiles) {
        var encoding = this.options.encoding || 'utf8';
        Object.keys(this.sourceFiles).forEach(function(file) {
            var source;
            // links are keyed to the shortened path in each doclet's `meta.shortpath` property
            var sourceOutfile = helper.getUniqueFilename(this.sourceFiles[file].shortened);
            helper.registerLink(this.sourceFiles[file].shortened, sourceOutfile);

            try {
                source = {
                    kind: 'source',
                    code: helper.htmlsafe( fs.readFileSync(this.sourceFiles[file].resolved, encoding) )
                };
            }
            catch(e) {
                logger.error('Error while generating source file %s: %s', file, e.message);
            }

            this.generate('Source: ' + this.sourceFiles[file].shortened, [source], sourceOutfile,
                false);
        }, this);
    }
};

/**
 * Generate the Global Page
 */
TemplateRenderer.prototype.generateGlobalPage = function () {
    var members = this.getMembers();
    if (members.globals.length) {
        this.generate('Global', [{ kind: 'globalobj' }], this.globalUrl);
    }
};

/**
 * Generate the Home Page (or index page)
 */
TemplateRenderer.prototype.generateHomePage = function () {
    // index page displays information from package.json and lists files
    var files = helper.find(this.data, { kind: 'file' });
    var packages = helper.find(this.data, { kind: 'package' });

    this.generate(
        this.templateOptions.homeTitle,
        packages.concat(
            [
                {
                    kind: 'mainpage',
                    readme: this.options.readme,
                    longname: (this.options.mainpagetitle) ? this.options.mainpagetitle : 'Main Page'
                }
            ]
        ).concat(files),
        this.indexUrl);
};

/**
 * Generate tutorials
 * @param [node]
 */
TemplateRenderer.prototype.generateTutorials = function (node) {
    if (typeof node === 'undefined') {
        node = this.tutorials;
    }
    // tutorials can have only one parent so there is no risk for loops
    node.children.forEach(function(child) {
        this.generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
        this.generateTutorials(child);
    }, this);
};

/**
 * Generate a Tutorial Page
 * @param {string} title
 * @param tutorial
 * @param {string} filename
 */
TemplateRenderer.prototype.generateTutorial = function (title, tutorial, filename) {
    var tutorialData = {
        title: title,
        header: tutorial.title,
        content: tutorial.parse(),
        children: tutorial.children
    };

    var tutorialPath = path.join(this.outdir, filename),
        html = this.view.render('tutorial.tmpl', tutorialData);

    // yes, you can use {@link} in tutorials too!
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

    fs.writeFileSync(tutorialPath, html, 'utf8');
};

/**
 * Generate pages for classes, moduels, namespaces, mixins, externals and interfaces
 */
TemplateRenderer.prototype.generatePages = function () {
    var members = this.getMembers();
    Object.keys(helper.longnameToUrl).forEach(function(longname) {
        var myClasses = _.where(members.classes, {longname: longname});
        if (myClasses.length) {
            this.generate('Class: ' + myClasses[0].name, myClasses, helper.longnameToUrl[longname]);
        }

        var myModules = _.where(members.modules, {longname: longname});
        if (myModules.length) {
            this.generate('Module: ' + myModules[0].name, myModules, helper.longnameToUrl[longname]);
        }

        var myNamespaces = _.where(members.namespaces, {longname: longname});
        if (myNamespaces.length) {
            this.generate('Namespace: ' + myNamespaces[0].name, myNamespaces, helper.longnameToUrl[longname]);
        }

        var myMixins = _.where(members.mixins, {longname: longname});
        if (myMixins.length) {
            this.generate('Mixin: ' + myMixins[0].name, myMixins, helper.longnameToUrl[longname]);
        }

        var myExternals = _.where(members.externals, {longname: longname});
        if (myExternals.length) {
            this.generate('External: ' + myExternals[0].name, myExternals, helper.longnameToUrl[longname]);
        }

        var myInterfaces = _.where(members.interfaces, {longname: longname});
        if (myInterfaces.length) {
            this.generate('Interface: ' + myInterfaces[0].name, myInterfaces, helper.longnameToUrl[longname]);
        }
    }, this);
};

/**
 * Generic generate function
 * @param title
 * @param docs
 * @param filename
 * @param {boolean} [resolveLinks]
 */
TemplateRenderer.prototype.generate = function (title, docs, filename, resolveLinks) {
    resolveLinks = resolveLinks !== false;

    var docData = {
        title: title,
        docs: docs
    };

    var outpath = path.join(this.outdir, filename),
        html = this.view.render('container.tmpl', docData);

    if (resolveLinks) {
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
    }

    fs.writeFileSync(outpath, html, 'utf8');
};

module.exports = TemplateRenderer;
