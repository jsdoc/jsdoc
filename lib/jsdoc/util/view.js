var _ = require('underscore');
var helper = require('jsdoc/util/templateHelper');
var path = require('jsdoc/path');
var fs = require('jsdoc/fs');
var template = require('jsdoc/template');
var docletHelper = require('jsdoc/util/docletHelper');
var logger = require('jsdoc/util/logger');

var templateDefaultOptions = {
    layoutFile: 'layout.tmpl',
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

var View = function (data, options, templateOptions) {
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

    // add template helpers
    this.view.linkto = helper.linkto;
    this.view.resolveAuthorLinks = helper.resolveAuthorLinks;
    this.view.htmlsafe = helper.htmlsafe;
    this.view.outputSourceFiles = this.templateOptions.outputSourceFiles !== false;

    // sort data
    this.data = this.sortData(data);

    // set and create output dir
    this.setOutDir();

    // copy the template's static files to outdir
    this.copyTemplateStaticFiles();

    // copy user-specified static files to outdir
    this.copyStaticFiles();
};

View.prototype.sortData = function (data) {
    data = helper.prune(data);
    data.sort('longname, version, since');
    helper.addEventListeners(data);
    return data;
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

View.prototype.processSourceFilesStepOne = function () {
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

    this.sourceFiles = sourceFiles;

};

View.prototype.processSourceFilesStepTwo = function () {

    this.data().each(function(doclet) {

        // add a shortened version of the full path
        var docletPath;
        if (doclet.meta) {
            docletPath = docletHelper.getPathFromDoclet(doclet);
            docletPath = this.sourceFiles[docletPath].shortened;
            if (docletPath) {
                doclet.meta.shortpath = docletPath;
            }
        }
    }.bind(this));

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
    this.generate(title, [{kind: 'globalobj'}], this.globalUrl);
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