var _ = require('underscore');
var helper = require('jsdoc/util/templateHelper');
var path = require('jsdoc/path');
var fs = require('jsdoc/fs');
var template = require('jsdoc/template');
var docletHelper = require('jsdoc/util/docletHelper');
var logger = require('jsdoc/util/logger');
var doop = require('jsdoc/util/doop');

var templateDefaultOptions = {
    layoutFile: 'layout.tmpl',
    /**
     * @type {boolean|Object}
     */
    staticFiles: false,
    outputSourceFiles: true
};

function shortenPaths(files, commonPrefix) {
    Object.keys(files).forEach(function(file) {
        files[file].shortened = files[file].resolved.replace(commonPrefix, '')
            // always use forward slashes
            .replace(/\\/g, '/');
    });

    return files;
}

function tutoriallink(tutorial) {
    return helper.toTutorial(tutorial, null, { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
}

/**
 * Create a viewManager instance
 * @param data
 * @param tutorials
 * @param {Object} options
 * @param {string} options.template
 * @param {string} options.readme
 * @param {string}options.mainpagetitle
 * @param {Object} templateOptions
 * @param {string} templateOptions.layoutFile
 * @param {boolean} templateOptions.outputSourceFiles
 * @param {boolean|Object} templateOptions.staticFiles
 * @constructor
 */
var View = function (data, tutorials, options, templateOptions) {
    this.options = options;
    this.templateOptions = _.defaults(templateOptions, templateDefaultOptions);

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
    // @todo remove the find function from the html layout
    this.view.find = function (spec) {
        return helper.find(this.data, spec);
    }.bind(this);
    this.view.linkto = helper.linkto;
    this.view.resolveAuthorLinks = helper.resolveAuthorLinks;
    this.view.htmlsafe = helper.htmlsafe;
    this.view.outputSourceFiles = this.templateOptions.outputSourceFiles !== false;
    this.view.tutoriallink = tutoriallink;
    this.view.nav = this.buildNav();
};

View.prototype.setMembers = function () {
    var members = helper.getMembers(this.data);
    this.attachModuleSymbols(members.modules);
    members.tutorials = this.tutorials.children;
    return members;
};

View.prototype.getMembers = function () {
    return this.members || (this.members = this.setMembers());
};

View.prototype.sortData = function (data) {
    data = helper.prune(data);
    data.sort('longname, version, since');
    helper.addEventListeners(data);
    return data;
};

/**
 * Create the navigation sidebar.
 * @return {string} The HTML for the navigation sidebar.
 */
View.prototype.buildNav = function () {
    var linkto = helper.linkto;
    var hasOwnProp = Object.prototype.hasOwnProperty;
    var members = this.getMembers();

    var nav = '<h2><a href="index.html">Home</a></h2>',
        seen = {},
        classNav = '',
        globalNav = '';

    if (members.modules.length) {
        nav += '<h3>Modules</h3><ul>';
        members.modules.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>' + linkto(m.longname, m.name) + '</li>';
            }
            seen[m.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.externals.length) {
        nav += '<h3>Externals</h3><ul>';
        members.externals.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                nav += '<li>' + linkto( e.longname, e.name.replace(/(^"|"$)/g, '') ) + '</li>';
            }
            seen[e.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.classes.length) {
        members.classes.forEach(function(c) {
            if ( !hasOwnProp.call(seen, c.longname) ) {
                classNav += '<li>' + linkto(c.longname, c.name) + '</li>';
            }
            seen[c.longname] = true;
        });

        if (classNav !== '') {
            nav += '<h3>Classes</h3><ul>';
            nav += classNav;
            nav += '</ul>';
        }
    }

    if (members.events.length) {
        nav += '<h3>Events</h3><ul>';
        members.events.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                nav += '<li>' + linkto(e.longname, e.name) + '</li>';
            }
            seen[e.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.namespaces.length) {
        nav += '<h3>Namespaces</h3><ul>';
        members.namespaces.forEach(function(n) {
            if ( !hasOwnProp.call(seen, n.longname) ) {
                nav += '<li>' + linkto(n.longname, n.name) + '</li>';
            }
            seen[n.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.mixins.length) {
        nav += '<h3>Mixins</h3><ul>';
        members.mixins.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>' + linkto(m.longname, m.name) + '</li>';
            }
            seen[m.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.tutorials.length) {
        nav += '<h3>Tutorials</h3><ul>';
        members.tutorials.forEach(function(t) {
            nav += '<li>' + tutoriallink(t.name) + '</li>';
        });

        nav += '</ul>';
    }

    if (members.interfaces.length) {
        nav += '<h3>Interfaces</h3><ul>';
        members.interfaces.forEach(function(i) {
            nav += '<li>' + linkto(i.longname, i.name) + '</li>';
        });
        nav += '</ul>';
    }

    if (members.globals.length) {
        members.globals.forEach(function(g) {
            if ( g.kind !== 'typedef' && !hasOwnProp.call(seen, g.longname) ) {
                globalNav += '<li>' + linkto(g.longname, g.name) + '</li>';
            }
            seen[g.longname] = true;
        });

        if (!globalNav) {
            // turn the heading into a link so you can actually get to the global page
            nav += '<h3>' + linkto('global', 'Global') + '</h3>';
        }
        else {
            nav += '<h3>Global</h3><ul>' + globalNav + '</ul>';
        }
    }

    return nav;
};

View.prototype.setTutorials = function (tutorials) {
    // set up tutorials for helper
    helper.setTutorials(tutorials);
    return tutorials;
};

View.prototype.setOutDir = function () {
    var outdir = this.options.destination;

    // update outdir if necessary, then create outdir
    var packageInfo = ( helper.find(this.data, {kind: 'package'}) || [] ) [0];
    if (packageInfo && packageInfo.name) {
        outdir = path.join( outdir, packageInfo.name, (packageInfo.version || '') );
    }
    this.outdir = outdir;
    fs.mkPath(this.outdir);
};

View.prototype.copyTemplateStaticFiles = function () {
    var fromDir = path.join(this.templatePath, 'static');
    var staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(function(fileName) {
        var toDir = fs.toDir( fileName.replace(fromDir, this.outdir) );
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
    }, this);
};

View.prototype.copyStaticFiles = function () {
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

View.prototype.collectSourceFiles = function () {
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

View.prototype.massageDoclets = function () {

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
View.prototype.attachModuleSymbols = function (modules) {
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

View.prototype.addSignatures = function () {
    // do this after the urls have all been generated
    this.data().each(function(doclet) {

        if ( docletHelper.needsSignature(doclet) ) {
            docletHelper.addSignatureParams(doclet);
            docletHelper.addSignatureReturns(doclet);
            docletHelper.addAttribs(doclet);
        }

        doclet.ancestors = helper.getAncestorLinks(this.data, doclet);

        if (doclet.kind === 'member') {
            docletHelper.addSignatureTypes(doclet);
            docletHelper.addAttribs(doclet);
        }

        if (doclet.kind === 'constant') {
            docletHelper.addSignatureTypes(doclet);
            docletHelper.addAttribs(doclet);
            doclet.kind = 'member';
        }
    }.bind(this));
};

View.prototype.registerLinks = function () {
    this.data().each(function(doclet) {
        var url = helper.createLink(doclet);
        helper.registerLink(doclet.longname, url);
    });
};

View.prototype.createDocletIds = function () {
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

View.prototype.generateSourceFiles = function () {

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

View.prototype.generateGlobalPage = function (title) {
    var members = this.getMembers();
    if (members.globals.length) {
        this.generate(title, [{kind: 'globalobj'}], this.globalUrl);
    }
};

View.prototype.generateMainPage = function (title) {
    // index page displays information from package.json and lists files
    var files = helper.find(this.data, { kind: 'file' });
    var packages = helper.find(this.data, { kind: 'package' });

    this.generate(title,
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

View.prototype.generateTutorials = function (node) {
    if (typeof node === 'undefined') {
        node = this.tutorials;
    }
    // tutorials can have only one parent so there is no risk for loops
    node.children.forEach(function(child) {
        this.generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
        this.generateTutorials(child);
    }, this);
};

View.prototype.generateTutorial = function (title, tutorial, filename) {
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

View.prototype.generatePages = function () {
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

View.prototype.generate = function (title, docs, filename, resolveLinks) {
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

module.exports = View;