const _ = require('lodash');
const env = require('jsdoc/env');
const fs = require('jsdoc/fs');
const helper = require('jsdoc/util/templateHelper');
const logger = require('jsdoc/util/logger');
const path = require('jsdoc/path');
const { taffy } = require('taffydb');
const template = require('jsdoc/template');

const htmlsafe = helper.htmlsafe;
const linkto = helper.linkto;
const resolveAuthorLinks = helper.resolveAuthorLinks;
const hasOwnProp = Object.prototype.hasOwnProperty;

const FONT_NAMES = [
    'OpenSans-Bold',
    'OpenSans-BoldItalic',
    'OpenSans-Italic',
    'OpenSans-Light',
    'OpenSans-LightItalic',
    'OpenSans-Regular'
];
const PRETTIFIER_CSS_FILES = [
    'tomorrow.min.css'
];
const PRETTIFIER_SCRIPT_FILES = [
    'lang-css.js',
    'prettify.js'
];

let data;
let view;

let outdir = path.normalize(env.opts.destination);

/**
 * @param {*} spec - FIXME
 * @returns {*} FIXME
 */
function find(spec) {
    return helper.find(data, spec);
}

/**
 * @param {module:jsdoc/tutorial.Tutorial} tutorial - FIXME
 * @returns {*} FIXME
 */
function tutoriallink(tutorial) {
    return helper.toTutorial(tutorial, null, {
        tag: 'em',
        classname: 'disabled',
        prefix: 'Tutorial: '
    });
}

/**
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to get ancestor links for.
 * @returns {*} FIXME
 */
function getAncestorLinks(doclet) {
    return helper.getAncestorLinks(data, doclet);
}

/**
 * @param {module:jsdoc/doclet.Doclet} doclet - FIXME
 * @param {object} hash - FIXME
 * @returns {string} An HTML string for a link.
 */
function hashToLink(doclet, hash) {
    let url;

    if ( !/^(#.+)/.test(hash) ) {
        return hash;
    }

    url = helper.createLink(doclet);
    url = url.replace(/(#.+|$)/, hash);

    return `<a href="${url}">${hash}</a>`;
}

/**
 * @param {object} hash - FIXME
 * @param {string} hash.kind - FIXME
 * @param {object} hash.type - FIXME
 * @param {object} hash.meta - FIXME
 * @returns {boolean} Whether `hash` needs a signature.
 */
function needsSignature({kind, type, meta}) {
    let needsSig = false;

    // function and class definitions always get a signature
    if (kind === 'function' || kind === 'class') {
        needsSig = true;
    }
    // typedefs that contain functions get a signature, too
    else if (kind === 'typedef' && type && type.names &&
        type.names.length) {
        for (let i = 0, l = type.names.length; i < l; i++) {
            if (type.names[i].toLowerCase() === 'function') {
                needsSig = true;
                break;
            }
        }
    }
    // and namespaces that are functions get a signature (but finding them is a
    // bit messy)
    else if (kind === 'namespace' && meta && meta.code &&
        meta.code.type && meta.code.type.match(/[Ff]unction/)) {
        needsSig = true;
    }

    return needsSig;
}

/**
 * @param {object} hash - FIXME
 * @param {boolean} hash.optional - FIXME
 * @param {boolean} hash.nullable - FIXME
 * @returns {Array} A list of signature attributes.
 */
function getSignatureAttributes({optional, nullable}) {
    const attributes = [];

    if (optional) {
        attributes.push('opt');
    }

    if (nullable === true) {
        attributes.push('nullable');
    }
    else if (nullable === false) {
        attributes.push('non-null');
    }

    return attributes;
}

/**
 * @param {object} item - FIXME
 * @returns {string} An HTML string.
 */
function updateItemName(item) {
    const attributes = getSignatureAttributes(item);
    let itemName = item.name || '';

    if (item.variable) {
        itemName = `&hellip;${itemName}`;
    }

    if (attributes && attributes.length) {
        itemName = `${itemName}<span class="signature-attributes">${attributes.join(', ')}</span>`;
    }

    return itemName;
}

/**
 * @param {Array} params - A list of params to update.
 * @returns {Array.<string>} An array of HTML strings.
 */
function addParamAttributes(params) {
    return params.filter(({name}) => name && !name.includes('.')).map(updateItemName);
}

/**
 * @param {object} item - FIXME
 * @returns {Array} FIXME
 */
function buildItemTypeStrings(item) {
    const types = [];

    if (item && item.type && item.type.names) {
        item.type.names.forEach(name => {
            types.push( linkto(name, htmlsafe(name)) );
        });
    }

    return types;
}

/**
 * @param {*} attribs - FIXME
 * @returns {string} An `htmlsafe()` filtered string of the joined attributes (or an empty
 * string if `attribs` was an empty array).
 */
function buildAttribsString(attribs) {
    let attribsString = '';

    if (attribs && attribs.length) {
        htmlsafe(`(${attribs.join(', ')}) `);
    }

    return attribsString;
}

/**
 * @param {Array} items - FIXME
 * @returns {Array} FIXME
 */
function addNonParamAttributes(items) {
    let types = [];

    items.forEach(item => {
        types = types.concat( buildItemTypeStrings(item) );
    });

    return types;
}

/**
 * @param {object} f - FIXME
 */
function addSignatureParams(f) {
    const params = f.params ? addParamAttributes(f.params) : [];

    f.signature = `${f.signature || ''}(${params.join(', ')})`;
}

/**
 * @param {object} f - FIXME
 */
function addSignatureReturns(f) {
    const attribs = [];
    let attribsString = '';
    let returnTypes = [];
    let returnTypesString = '';
    const source = f.yields || f.returns;

    // jam all the return-type attributes into an array. this could create odd results (for example,
    // if there are both nullable and non-nullable return types), but let's assume that most people
    // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
    if (source) {
        source.forEach(item => {
            helper.getAttribs(item).forEach(attrib => {
                if (!attribs.includes(attrib)) {
                    attribs.push(attrib);
                }
            });
        });

        attribsString = buildAttribsString(attribs);
    }

    if (source) {
        returnTypes = addNonParamAttributes(source);
    }
    if (returnTypes.length) {
        returnTypesString = ` &rarr; ${attribsString}{${returnTypes.join('|')}}`;
    }

    f.signature = `<span class="signature">${f.signature || ''}</span>` +
        `<span class="type-signature">${returnTypesString}</span>`;
}

/**
 * @param {object} f - FIXME
 */
function addSignatureTypes(f) {
    const types = f.type ? buildItemTypeStrings(f) : [];

    f.signature = `${f.signature || ''}<span class="type-signature">` +
        `${types.length ? ` :${types.join('|')}` : ''}</span>`;
}

/**
 * @param {object} f - FIXME
 */
function addAttribs(f) {
    const attribs = helper.getAttribs(f);
    const attribsString = buildAttribsString(attribs);

    f.attribs = `<span class="type-signature">${attribsString}</span>`;
}

/**
 * @param {object.<string, object>} files - A hash filenames and their properties.
 * @param {string} commonPrefix - A string to remove from all `files[file].resolved` values.
 * @returns {object} A modified `files` object with shorter `resolved` path values.
 */
function shortenPaths(files, commonPrefix) {
    Object.keys(files).forEach(file => {
        files[file].shortened = files[file].resolved.replace(commonPrefix, '')
            // always use forward slashes
            .replace(/\\/g, '/');
    });

    return files;
}

/**
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to extract the `meta` path from.
 * @param {*} doclet.meta - The object to resolve from a path and filename into a string.
 * @returns {?string} The resolved filename, or `null` if the doclet had no `meta` property.
 */
function getPathFromDoclet({meta}) {
    if (!meta) {
        return null;
    }

    return meta.path && meta.path !== 'null' ?
        path.join(meta.path, meta.filename) :
        meta.filename;
}

/**
 * @param {string} title - The title to generate.
 * @param {*} docs - FIXME
 * @param {string} filename - The filename to write to.
 * @param {boolean} resolveLinks - Whether to turn `{@link …}` tags into HTML links.
 */
function generate(title, docs, filename, resolveLinks) {
    let docData;
    let html;
    let outpath;

    resolveLinks = resolveLinks !== false;

    docData = {
        env: env,
        title: title,
        docs: docs
    };

    outpath = path.join(outdir, filename);
    html = view.render('container.tmpl', docData);

    if (resolveLinks) {
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
    }

    fs.writeFileSync(outpath, html, 'utf8');
}

/**
 * @param {object.<string, object>} sourceFiles - A hash of (source) files and their properties.
 * @param {string} [encoding=utf8] - The encoding to use for the genreated files.
 */
function generateSourceFiles(sourceFiles, encoding = 'utf8') {
    Object.keys(sourceFiles).forEach(file => {
        let source;
        // links are keyed to the shortened path in each doclet's `meta.shortpath` property
        const sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);

        helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

        try {
            source = {
                kind: 'source',
                code: helper.htmlsafe( fs.readFileSync(sourceFiles[file].resolved, encoding) )
            };
        }
        catch (e) {
            logger.error('Error while generating source file %s: %s', file, e.message);
        }

        generate(`Source: ${sourceFiles[file].shortened}`, [source], sourceOutfile,
            false);
    });
}

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
function attachModuleSymbols(doclets, modules) {
    const symbols = {};

    // build a lookup table
    doclets.forEach(symbol => {
        symbols[symbol.longname] = symbols[symbol.longname] || [];
        symbols[symbol.longname].push(symbol);
    });

    modules.forEach(module => {
        if (symbols[module.longname]) {
            module.modules = symbols[module.longname]
                // Only show symbols that have a description. Make an exception for classes, because
                // we want to show the constructor-signature heading no matter what.
                .filter(({description, kind}) => description || kind === 'class')
                .map(symbol => {
                    symbol = _.cloneDeep(symbol);

                    if (symbol.kind === 'class' || symbol.kind === 'function') {
                        symbol.name = `${symbol.name.replace('module:', '(require("')}"))`;
                    }

                    return symbol;
                });
        }
    });
}

/**
 * @param {Array} items - FIXME
 * @param {string} itemHeading - The text to use for the HTML heading element.
 * @param {object.<string, boolean>} itemsSeen - A hash of items already visited.
 * @param {Function} linktoFn - The function to generate an HTML link element.
 * @returns {string} An HTML string for navigation.
 */
function buildMemberNav(items, itemHeading, itemsSeen, linktoFn) {
    let nav = '';

    if (items.length) {
        let itemsNav = '';

        items.forEach(item => {
            let displayName;

            if ( !hasOwnProp.call(item, 'longname') ) {
                itemsNav += `<li>${linktoFn('', item.name)}</li>`;
            }
            else if ( !hasOwnProp.call(itemsSeen, item.longname) ) {
                if (env.conf.templates.default.useLongnameInNav) {
                    displayName = item.longname;
                } else {
                    displayName = item.name;
                }
                itemsNav += `<li>${linktoFn(item.longname, displayName.replace(/\b(module|event):/g, ''))}</li>`;

                itemsSeen[item.longname] = true;
            }
        });

        if (itemsNav !== '') {
            nav += `<h3>${itemHeading}</h3><ul>${itemsNav}</ul>`;
        }
    }

    return nav;
}

/**
 * @param {string} longName - FIXME
 * @param {string} name - FIXME
 * @returns {string} An HTML link.
 */
function linktoTutorial(longName, name) {
    return tutoriallink(name);
}

/**
 * @param {string} longName - FIXME
 * @param {string} name - FIXME
 * @returns {string} An HTML link.
 */
function linktoExternal(longName, name) {
    return linkto(longName, name.replace(/(^"|"$)/g, ''));
}

/**
 * Create the navigation sidebar.
 *
 * @param {object} members The members that will be used to create the sidebar.
 * @param {Array<object>} members.classes    - FIXME
 * @param {Array<object>} members.externals  - FIXME
 * @param {Array<object>} members.globals    - FIXME
 * @param {Array<object>} members.mixins     - FIXME
 * @param {Array<object>} members.modules    - FIXME
 * @param {Array<object>} members.namespaces - FIXME
 * @param {Array<object>} members.tutorials  - FIXME
 * @param {Array<object>} members.events     - FIXME
 * @param {Array<object>} members.interfaces - FIXME
 * @returns {string} The HTML for the navigation sidebar.
 */
function buildNav(members) {
    let globalNav;
    let nav = '<h2><a href="index.html">Home</a></h2>';
    const seen = {};
    const seenTutorials = {};

    nav += buildMemberNav(members.modules, 'Modules', {}, linkto);
    nav += buildMemberNav(members.externals, 'Externals', seen, linktoExternal);
    nav += buildMemberNav(members.namespaces, 'Namespaces', seen, linkto);
    nav += buildMemberNav(members.classes, 'Classes', seen, linkto);
    nav += buildMemberNav(members.interfaces, 'Interfaces', seen, linkto);
    nav += buildMemberNav(members.events, 'Events', seen, linkto);
    nav += buildMemberNav(members.mixins, 'Mixins', seen, linkto);
    nav += buildMemberNav(members.tutorials, 'Tutorials', seenTutorials, linktoTutorial);

    if (members.globals.length) {
        globalNav = '';

        members.globals.forEach(({kind, longname, name}) => {
            if ( kind !== 'typedef' && !hasOwnProp.call(seen, longname) ) {
                globalNav += `<li>${linkto(longname, name)}</li>`;
            }
            seen[longname] = true;
        });

        if (!globalNav) {
            // turn the heading into a link so you can actually get to the global page
            nav += `<h3>${linkto('global', 'Global')}</h3>`;
        }
        else {
            nav += `<h3>Global</h3><ul>${globalNav}</ul>`;
        }
    }

    return nav;
}

/**
    @param {module:taffydb.taffy} taffyData See <http://taffydb.com>.
    @param {object} opts - FIXME
    @param {Array.<module:jsdoc/tutorial.Tutorial>} tutorials - FIXME
 */
exports.publish = (taffyData, opts, tutorials) => {
    let classes;
    let conf;
    let externals;
    let files;
    let fromDir;
    let globalUrl;
    let indexUrl;
    let interfaces;
    let members;
    let mixins;
    let modules;
    let namespaces;
    let outputSourceFiles;
    let packageInfo;
    let packages;
    const sourceFilePaths = [];
    let sourceFiles = {};
    let staticFileFilter;
    let staticFilePaths;
    let staticFiles;
    let staticFileScanner;
    let templatePath;

    data = taffyData;

    conf = env.conf.templates || {};
    conf.default = conf.default || {};

    templatePath = path.normalize(opts.template);
    view = new template.Template( path.join(templatePath, 'tmpl') );

    // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
    // doesn't try to hand them out later
    indexUrl = helper.getUniqueFilename('index');
    // don't call registerLink() on this one! 'index' is also a valid longname

    globalUrl = helper.getUniqueFilename('global');
    helper.registerLink('global', globalUrl);

    // set up templating
    view.layout = conf.default.layoutFile ?
        path.getResourcePath(path.dirname(conf.default.layoutFile),
            path.basename(conf.default.layoutFile) ) :
        'layout.tmpl';

    // set up tutorials for helper
    helper.setTutorials(tutorials);

    data = helper.prune(data);
    data.sort('longname, version, since');
    helper.addEventListeners(data);

    data().each(doclet => {
        let sourcePath;

        doclet.attribs = '';

        if (doclet.examples) {
            doclet.examples = doclet.examples.map(example => {
                let caption;
                let code;

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
            doclet.see.forEach((seeItem, i) => {
                doclet.see[i] = hashToLink(doclet, seeItem);
            });
        }

        // build a list of source files
        if (doclet.meta) {
            sourcePath = getPathFromDoclet(doclet);
            sourceFiles[sourcePath] = {
                resolved: sourcePath,
                shortened: null
            };
            if (!sourceFilePaths.includes(sourcePath)) {
                sourceFilePaths.push(sourcePath);
            }
        }
    });

    // update outdir if necessary, then create outdir
    packageInfo = ( find({kind: 'package'}) || [] )[0];
    if (packageInfo && packageInfo.name) {
        outdir = path.join( outdir, packageInfo.name, (packageInfo.version || '') );
    }
    fs.mkPath(outdir);

    // copy the template's static files to outdir
    fromDir = path.join(templatePath, 'static');
    staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(fileName => {
        const toDir = fs.toDir( fileName.replace(fromDir, outdir) );

        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
    });

    // copy the fonts used by the template to outdir
    staticFiles = fs.ls(path.join(require.resolve('open-sans-fonts'), '..', 'open-sans'), 3);

    staticFiles.forEach(fileName => {
        const toDir = path.join(outdir, 'fonts');

        if (FONT_NAMES.includes(path.parse(fileName).name)) {
            fs.mkPath(toDir);
            fs.copyFileSync(fileName, toDir);
        }
    });

    // copy the prettify script to outdir
    PRETTIFIER_SCRIPT_FILES.forEach(fileName => {
        const toDir = path.join(outdir, 'scripts');

        fs.copyFileSync(
            path.join(require.resolve('code-prettify'), '..', fileName),
            toDir
        );
    });

    // copy the prettify CSS to outdir
    PRETTIFIER_CSS_FILES.forEach(fileName => {
        const toDir = path.join(outdir, 'styles');

        fs.copyFileSync(
            // `require.resolve()` has trouble with this package, so we use an extra-hacky way to
            // get the filepath.
            path.join(
                templatePath,
                '..',
                '..',
                'node_modules',
                'color-themes-for-google-code-prettify',
                'dist',
                'themes',
                fileName
            ),
            toDir
        );
    });

    // copy user-specified static files to outdir
    if (conf.default.staticFiles) {
        // The canonical property name is `include`. We accept `paths` for backwards compatibility
        // with a bug in JSDoc 3.2.x.
        staticFilePaths = conf.default.staticFiles.include ||
            conf.default.staticFiles.paths ||
            [];
        staticFileFilter = new (require('jsdoc/src/filter').Filter)(conf.default.staticFiles);
        staticFileScanner = new (require('jsdoc/src/scanner').Scanner)();

        staticFilePaths.forEach(filePath => {
            let extraStaticFiles;

            filePath = path.resolve(env.pwd, filePath);
            extraStaticFiles = staticFileScanner.scan([filePath], 10, staticFileFilter);

            extraStaticFiles.forEach(fileName => {
                const sourcePath = fs.toDir(filePath);
                const toDir = fs.toDir( fileName.replace(sourcePath, outdir) );

                fs.mkPath(toDir);
                fs.copyFileSync(fileName, toDir);
            });
        });
    }

    if (sourceFilePaths.length) {
        sourceFiles = shortenPaths( sourceFiles, path.commonPrefix(sourceFilePaths) );
    }
    data().each(doclet => {
        let docletPath;
        const url = helper.createLink(doclet);

        helper.registerLink(doclet.longname, url);

        // add a shortened version of the full path
        if (doclet.meta) {
            docletPath = getPathFromDoclet(doclet);
            docletPath = sourceFiles[docletPath].shortened;
            if (docletPath) {
                doclet.meta.shortpath = docletPath;
            }
        }
    });

    data().each(doclet => {
        const url = helper.longnameToUrl[doclet.longname];

        if (url.includes('#')) {
            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
        }
        else {
            doclet.id = doclet.name;
        }

        if ( needsSignature(doclet) ) {
            addSignatureParams(doclet);
            addSignatureReturns(doclet);
            addAttribs(doclet);
        }
    });

    // do this after the URLs have all been generated
    data().each(doclet => {
        doclet.ancestors = getAncestorLinks(doclet);

        if (doclet.kind === 'member') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
        }

        if (doclet.kind === 'constant') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
            doclet.kind = 'member';
        }
    });

    members = helper.getMembers(data);
    members.tutorials = tutorials.children;

    // output pretty-printed source files by default
    outputSourceFiles = conf.default && conf.default.outputSourceFiles !== false;

    // add template helpers
    view.find = find;
    view.linkto = linkto;
    view.resolveAuthorLinks = resolveAuthorLinks;
    view.tutoriallink = tutoriallink;
    view.htmlsafe = htmlsafe;
    view.outputSourceFiles = outputSourceFiles;

    // once for all
    view.nav = buildNav(members);
    attachModuleSymbols( find({ longname: {left: 'module:'} }), members.modules );

    // generate the pretty-printed source files first so other pages can link to them
    if (outputSourceFiles) {
        generateSourceFiles(sourceFiles, opts.encoding);
    }

    if (members.globals.length) { generate('Global', [{kind: 'globalobj'}], globalUrl); }

    // index page displays information from package.json and lists files
    files = find({kind: 'file'});
    packages = find({kind: 'package'});

    generate('Home',
        packages.concat(
            [{
                kind: 'mainpage',
                readme: opts.readme,
                longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page'
            }]
        ).concat(files), indexUrl);

    // set up the lists that we'll use to generate pages
    classes = taffy(members.classes);
    modules = taffy(members.modules);
    namespaces = taffy(members.namespaces);
    mixins = taffy(members.mixins);
    externals = taffy(members.externals);
    interfaces = taffy(members.interfaces);

    Object.keys(helper.longnameToUrl).forEach(longname => {
        const myClasses = helper.find(classes, {longname: longname});
        const myExternals = helper.find(externals, {longname: longname});
        const myInterfaces = helper.find(interfaces, {longname: longname});
        const myMixins = helper.find(mixins, {longname: longname});
        const myModules = helper.find(modules, {longname: longname});
        const myNamespaces = helper.find(namespaces, {longname: longname});

        if (myModules.length) {
            generate(`Module: ${myModules[0].name}`, myModules, helper.longnameToUrl[longname]);
        }

        if (myClasses.length) {
            generate(`Class: ${myClasses[0].name}`, myClasses, helper.longnameToUrl[longname]);
        }

        if (myNamespaces.length) {
            generate(`Namespace: ${myNamespaces[0].name}`, myNamespaces, helper.longnameToUrl[longname]);
        }

        if (myMixins.length) {
            generate(`Mixin: ${myMixins[0].name}`, myMixins, helper.longnameToUrl[longname]);
        }

        if (myExternals.length) {
            generate(`External: ${myExternals[0].name}`, myExternals, helper.longnameToUrl[longname]);
        }

        if (myInterfaces.length) {
            generate(`Interface: ${myInterfaces[0].name}`, myInterfaces, helper.longnameToUrl[longname]);
        }
    });

    /**
     * @todo Move the tutorial functions to templateHelper.js
     *
     * @param {object} title - FIXME
     * @param {object} tutorial - FIXME
     * @param {string} filename - FIXME
     */
    function generateTutorial(title, tutorial, filename) {
        const tutorialData = {
            title: title,
            header: tutorial.title,
            content: tutorial.parse(),
            children: tutorial.children
        };
        const tutorialPath = path.join(outdir, filename);
        let html = view.render('tutorial.tmpl', tutorialData);

        // yes, you can use {@link} in tutorials too!
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

        fs.writeFileSync(tutorialPath, html, 'utf8');
    }

    // tutorials can have only one parent so there is no risk for loops
    /**
     * @param  {object} fixMyName - FIXME
     */
    function saveChildren({children}) {
        children.forEach(child => {
            generateTutorial(`Tutorial: ${child.title}`, child, helper.tutorialToUrl(child.name));
            saveChildren(child);
        });
    }

    saveChildren(tutorials);
};
