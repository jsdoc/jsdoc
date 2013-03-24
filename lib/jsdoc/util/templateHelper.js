/*global env: true */
/**
 * @module jsdoc/util/templateHelper
 */

var dictionary = require('jsdoc/tag/dictionary');
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;

var files = {};

// each container gets its own html file
var containers = ['class', 'module', 'external', 'namespace', 'mixin'];

var tutorials;

/** Sets tutorials map.
    @param {jsdoc.tutorial.Tutorial} root - Root tutorial node.
 */
exports.setTutorials = function(root) {
    tutorials = root;
};

exports.globalName = 'global';
exports.fileExtension = '.html';
exports.scopeToPunc = { 'static': '.', 'inner': '~', 'instance': '#' };

function getNamespace(kind) {
    if (dictionary.isNamespace(kind)) {
        return kind + ':';
    }
    return '';
}

function makeFilenameUnique(filename, str) {
    var key = filename.toLowerCase();
    var nonUnique = true;

    // append enough underscores to make the filename unique
    while (nonUnique) {
        if ( files[key] && hasOwnProp.call(files, key) ) {
            filename += '_';
            key = filename.toLowerCase();
        } else {
            nonUnique = false;
        }
    }

    files[key] = str;
    return filename;
}

// compute it here just once
var nsprefix = /^(event|module|external):/;

/**
 * Convert a string to a unique filename, including an extension.
 *
 * Filenames are cached to ensure that they are used only once. For example, if the same string is
 * passed in twice, two different filenames will be returned.
 *
 * Also, filenames are not considered unique if they are capitalized differently but are otherwise
 * identical.
 * @param {string} str The string to convert.
 * @return {string} The filename to use for the string.
 */
var getUniqueFilename = exports.getUniqueFilename = function(str) {
    // allow for namespace prefix
    var basename = str.replace(nsprefix, '$1-')
        // and use - instead of ~ to denote 'inner'
        .replace(/~/g, '-');
    
    // if the basename includes characters that we can't use in a filepath, remove everything up to
    // and including the last bad character
    var regexp = /[^$a-z0-9._\-](?=[$a-z0-9._\-]*$)/i;
    var result = regexp.exec(basename);
    if (result && result.index) {
        basename = basename.substr(result.index + 1);
    }

    // make sure we don't create hidden files on POSIX systems
    basename = basename.replace(/^\./, '');
    // and in case we've now stripped the entire basename (uncommon, but possible):
    basename = basename.length ? basename : '_';

    return makeFilenameUnique(basename, str) + exports.fileExtension;
};

// two-way lookup
var linkMap = {
    longnameToUrl: {},
    urlToLongname: {}
};

var tutorialLinkMap = {
    nameToUrl: {},
    urlToName: {}
};

var longnameToUrl = exports.longnameToUrl = linkMap.longnameToUrl;

function parseType(longname) {
    var catharsis = require('catharsis');
    var err;

    try {
        return catharsis.parse(longname, {jsdoc: true});
    }
    catch (e) {
        err = new Error('unable to parse ' + longname + ': ' + e.message);
        require('jsdoc/util/error').handle(err);
        return longname;
    }
}

function hasUrlPrefix(text) {
    return (/^(http|ftp)s?:\/\//).test(text);
}

/**
 * Retrieve an HTML link to the member with the specified longname. If the longname is not
 * associated with a URL, this method returns the link text, if provided, or the longname.
 *
 * This method supports type applications that can contain one or more types, such as
 * `Array.<MyClass>` or `Array.<(MyClass|YourClass)>`. In these examples, the method attempts to
 * replace `Array`, `MyClass`, and `YourClass` with links to the appropriate types. The link text
 * is ignored for type applications.
 *
 * @param {string} longname - The longname that is the target of the link.
 * @param {string=} linktext - The text to display for the link, or `longname` if no text is
 * provided.
 * @param {string=} cssClass - The CSS class (or classes) to include in the link's `<a>` tag.
 * @return {string} The HTML link, or a plain-text string if the link is not available.
 */
var linkto = exports.linkto = function(longname, linktext, cssClass) {
    var catharsis = require('catharsis');

    var classString = cssClass ? util.format(' class="%s"', cssClass) : '';
    var text = linktext || longname;
    var url = hasOwnProp.call(longnameToUrl, longname) && longnameToUrl[longname];
    var parsedType;

    // handle cases like:
    // @see <http://example.org>
    // @see http://example.org
    var stripped = longname && longname.replace(/^<|>$/g, '');
    if ( hasUrlPrefix(stripped) ) {
        url = stripped;
        // remove the angle brackets from the link text if necessary
        if (longname === text) {
            text = stripped;
        }
    }
    // handle complex type expressions that may require multiple links
    else if (longname && longname.search(/[<{(]/) !== -1) {
        parsedType = parseType(longname);
        return catharsis.stringify(parsedType, {
            cssClass: cssClass,
            htmlSafe: true,
            links: longnameToUrl
        });
    }

    if (!url) {
        return text;
    }
    else {
        return util.format('<a href="%s"%s>%s</a>', url, classString, text);
    }
};

var htmlsafe = exports.htmlsafe = function(str) {
    return str.replace(/</g, '&lt;');
};

/**
 * Find items in a TaffyDB database that match the specified key-value pairs.
 * @param {TAFFY} data The TaffyDB database to search.
 * @param {object|function} spec Key-value pairs to match against (for example,
 * `{ longname: 'foo' }`), or a function that returns `true` if a value matches or `false` if it
 * does not match.
 * @return {array<object>} The matching items.
 */
var find = exports.find = function(data, spec) {
    return data(spec).get();
};

/**
 * Retrieve all of the following types of members from a set of doclets:
 *
 * + Classes
 * + Externals
 * + Globals
 * + Mixins
 * + Modules
 * + Namespaces
 * + Events
 * @param {TAFFY} data The TaffyDB database to search.
 * @return {object} An object with `classes`, `externals`, `globals`, `mixins`, `modules`,
 * `events`, and `namespaces` properties. Each property contains an array of objects.
 */
exports.getMembers = function(data) {
    return {
        classes: find( data, {kind: 'class'} ),
        externals: find( data, {kind: 'external'} ),
        events: find( data, {kind: 'event'} ),
        globals: find(data, {
            kind: ['member', 'function', 'constant', 'typedef'],
            memberof: { isUndefined: true }
        }),
        mixins: find( data, {kind: 'mixin'} ),
        modules: find( data, {kind: 'module'} ),
        namespaces: find( data, {kind: 'namespace'} )
    };
};

/**
 * Retrieve the member attributes for a doclet (for example, `virtual`, `static`, and
 * `readonly`).
 * @param {object} d The doclet whose attributes will be retrieved.
 * @return {array<string>} The member attributes for the doclet.
 */
exports.getAttribs = function(d) {
    var attribs = [];
    
    if (d.virtual) {
        attribs.push('virtual');
    }
    
    if (d.access && d.access !== 'public') {
        attribs.push(d.access);
    }
    
    if (d.scope && d.scope !== 'instance' && d.scope !== 'global') {
        if (d.kind == 'function' || d.kind == 'member' || d.kind == 'constant') {
            attribs.push(d.scope);
        }
    }
    
    if (d.readonly === true) {
        if (d.kind == 'member') {
            attribs.push('readonly');
        }
    }
    
    if (d.kind === 'constant') {
        attribs.push('constant');
    }

    return attribs;
};

/**
 * Retrieve links to allowed types for the member.
 *
 * @param {Object} d - The doclet whose types will be retrieved.
 * @param {string} [cssClass] - The CSS class to include in the `class` attribute for each link.
 * @return {Array.<string>} HTML links to allowed types for the member.
 */
exports.getSignatureTypes = function(d, cssClass) {
    var types = [];
    
    if (d.type && d.type.names) {
        types = d.type.names;
    }
    
    if (types && types.length) {
        types = types.map(function(t) {
            return linkto(t, htmlsafe(t), cssClass);
        });
    }

    return types;
};

/**
 * Retrieve names of the parameters that the member accepts. If a value is provided for `optClass`,
 * the names of optional parameters will be wrapped in a `<span>` tag with that class.
 * @param {object} d The doclet whose parameter names will be retrieved.
 * @param {string} [optClass] The class to assign to the `<span>` tag that is wrapped around the
 * names of optional parameters. If a value is not provided, optional parameter names will not be
 * wrapped with a `<span>` tag. Must be a legal value for a CSS class name.
 * @return {array<string>} An array of parameter names, with or without `<span>` tags wrapping the
 * names of optional parameters.
 */
exports.getSignatureParams = function(d, optClass) {
    var pnames = [];

    if (d.params) {
        d.params.forEach(function(p) {
            if (p.name && p.name.indexOf('.') === -1) {
                if (p.optional && optClass) {
                    pnames.push('<span class="' + optClass + '">' + p.name + '</span>');
                }
                else {
                    pnames.push(p.name);
                }
            }
        });
    }

    return pnames;
};

/**
 * Retrieve links to types that the member can return.
 *
 * @param {Object} d - The doclet whose types will be retrieved.
 * @param {string} [cssClass] - The CSS class to include in the `class` attribute for each link.
 * @return {Array.<string>} HTML links to types that the member can return.
 */
exports.getSignatureReturns = function(d, cssClass) {
    var returnTypes = [];
    
    if (d.returns) {
        d.returns.forEach(function(r) {
            if (r.type && r.type.names) {
                if (!returnTypes.length) {
                    returnTypes = r.type.names;
                }
            }
        });
    }
    
    if (returnTypes && returnTypes.length) {
        returnTypes = returnTypes.map(function(r) {
            return linkto(r, htmlsafe(r), cssClass);
        });
    }

    return returnTypes;
};

/**
 * Retrieve links to a member's ancestors.
 *
 * @param {TAFFY} data - The TaffyDB database to search.
 * @param {Object} doclet - The doclet whose ancestors will be retrieved.
 * @param {string} [cssClass] - The CSS class to include in the `class` attribute for each link.
 * @return {Array.<string>} HTML links to a member's ancestors.
 */
exports.getAncestorLinks = function(data, doclet, cssClass) {
    var ancestors = [],
        doc = doclet.memberof;

    while (doc) {
        doc = find( data, {longname: doc}, false );
        if (doc) { doc = doc[0]; }
        if (!doc) { break; }
        ancestors.unshift( linkto(doc.longname, (exports.scopeToPunc[doc.scope] || '') + doc.name,
            cssClass) );
        doc = doc.memberof;
    }
    if (ancestors.length) {
        ancestors[ancestors.length - 1] += (exports.scopeToPunc[doclet.scope] || '');
    }
    return ancestors;
};

/**
 * Remove members that will not be included in the output, including:
 *
 * + Undocumented members.
 * + Members tagged `@ignore`.
 * + Members of anonymous classes.
 * + Members tagged `@private`, unless the `private` option is enabled.
 * @param {TAFFY} data The TaffyDB database to prune.
 * @return {TAFFY} The pruned database.
 */
exports.prune = function(data) {
    data({undocumented: true}).remove();
    data({ignore: true}).remove();
    if (!env.opts.private) { data({access: 'private'}).remove(); }
    data({memberof: '<anonymous>'}).remove();

    return data;
};

var registerLink = exports.registerLink = function(longname, url) {
    linkMap.longnameToUrl[longname] = url;
    linkMap.urlToLongname[url] = longname;
};

function toLink(longname, content, monospace) {
    if (!longname) {
        // if this happens, there's something wrong with the caller itself; the user can't fix this
        throw new Error('Missing required parameter: url');
    }
    var monospaceLinks = env.conf.templates.monospaceLinks;
    var cleverLinks = env.conf.templates.cleverLinks;
  
    // Split into URL and content.
    // Has link text been specified {@link link|content}, e.g.
    // {@link http://github.com|Github} or {@link MyNamespace.method|Method}
    // Note: only do if `content` has not been supplied, i.e. in the case of
    // [content]{@link ...} we use `content`.
    //
    // If pipe is not present we use the first space.
    var split = longname.indexOf('|');
    if (split === -1) {
       split = longname.indexOf(' ');
    }
    if (split !== -1 && !content) {
        content = longname.substr(split + 1);
        longname = longname.substr(0, split);
    }

    var url;
    var isURL = false;
    // Has link been specified manually?
    if ( hasUrlPrefix(longname) ) {
        isURL = true;
        url = longname;
    }
    else {
        // the actual longname is stored in `url` if there was a delimiter.
        url = hasOwnProp.call(linkMap.longnameToUrl, longname) && linkMap.longnameToUrl[longname];
    }

    content = content || longname;
    
    if (!url) {
        return content;
    }
    else {
        if (monospace === undefined) {
            // cleverLinks takes precedence. if cleverLinks is true
            // we ignore monospaceLinks.
            // If it's a symbol we use monospace font.
            // Otherwise if cleverLinks is `false` we use monospaceLinks.
            if (cleverLinks) {
                monospace = !isURL;
            } else {
                monospace = monospaceLinks;
            }
        }
        if (monospace) {
            content = '<code>' + content + '</code>';
        }
        return '<a href="'+url+'">'+content+'</a>';
    }
}

var tutorialToUrl = exports.tutorialToUrl = function(tutorial) {
    var node = tutorials.getByName(tutorial);
    // no such tutorial
    if (!node) {
        require('jsdoc/util/error').handle( new Error('No such tutorial: '+tutorial) );
        return;
    }

    var url;
    // define the URL if necessary
    if (!hasOwnProp.call(tutorialLinkMap.nameToUrl, node.name)) {
        url = 'tutorial-' + getUniqueFilename(node.name);
        tutorialLinkMap.nameToUrl[node.name] = url;
        tutorialLinkMap.urlToName[url] = node.name;
    }

    return tutorialLinkMap.nameToUrl[node.name];
};

/**
 * Retrieve a link to a tutorial, or the name of the tutorial if the tutorial is missing. If the
 * `missingOpts` parameter is supplied, the names of missing tutorials will be prefixed by the
 * specified text and wrapped in the specified HTML tag and CSS class.
 * @param {string} tutorial The name of the tutorial.
 * @param {string} content The link text to use.
 * @param {object} [missingOpts] Options for displaying the name of a missing tutorial.
 * @param {string} missingOpts.classname The CSS class to wrap around the tutorial name.
 * @param {string} missingOpts.prefix The prefix to add to the tutorial name.
 * @param {string} missingOpts.tag The tag to wrap around the tutorial name.
 * @return {string} An HTML link to the tutorial, or the name of the tutorial with the specified
 * options.
 */
var toTutorial = exports.toTutorial = function(tutorial, content, missingOpts) {
    if (!tutorial) {
        require('jsdoc/util/error').handle( new Error('Missing required parameter: tutorial') );
        return;
    }

    var node = tutorials.getByName(tutorial);
    // no such tutorial
    if (!node) {
        missingOpts = missingOpts || {};
        var tag = missingOpts.tag;
        var classname = missingOpts.classname;
        
        var link = tutorial;
        if (missingOpts.prefix) {
            link = missingOpts.prefix + link;
        }
        if (tag) {
            link = '<' + tag + (classname ? (' class="' + classname + '">') : '>') + link;
            link += '</' + tag + '>';
        }
        return link;
    }

    content = content || node.title;

    return '<a href="' + tutorialToUrl(tutorial) + '">' + content + '</a>';
};

/** Find symbol {@link ...} and {@tutorial ...} strings in text and turn into html links */
exports.resolveLinks = function(str) {
    str = str.replace(/(?:\[(.+?)\])?\{@link(plain|code)?\s+(.+?)\}/gi,
        function(match, content, monospace, longname) {
            if (monospace === 'plain') {
                monospace = false;
            } else if (monospace === 'code') {
                monospace = true;
            } else {
                monospace = undefined;
            }
            return toLink(longname, content, monospace);
        }
    );

    str = str.replace(/(?:\[(.+?)\])?\{@tutorial +(.+?)\}/gi,
        function(match, content, tutorial) {
            return toTutorial(tutorial, content);
        }
    );

    return str;
};

/** Convert tag text like "Jane Doe <jdoe@example.org>" into a mailto link */
exports.resolveAuthorLinks = function(str) {
    var author;
    var matches = str.match(/^\s?([\s\S]+)\b\s+<(\S+@\S+)>\s?$/);
    if (matches && matches.length === 3) {
        author = '<a href="mailto:' + matches[2] + '">' + htmlsafe(matches[1]) + '</a>';
    }
    else {
        author = htmlsafe(str);
    }

    return author;
};

/**
 * Get a longname's filename if one has been registered; otherwise, generate a unique filename, then
 * register the filename.
 * @private
 */
function getFilename(longname) {
    var url;

    if ( longnameToUrl[longname] && hasOwnProp.call(longnameToUrl, longname) ) {
        url = longnameToUrl[longname];
    } else {
        url = getUniqueFilename(longname);
        registerLink(longname, url);
    }

    return url;
}

/** Turn a doclet into a URL. */
exports.createLink = function(doclet) {
    var url = '';
    var longname;
    var filename;
    
    if (containers.indexOf(doclet.kind) < 0) {
        longname = doclet.longname;
        filename = getFilename(doclet.memberof || exports.globalName);
        
        url = filename + '#' + getNamespace(doclet.kind) + doclet.name;
    }
    else {
        longname = doclet.longname;
        url = getFilename(longname);
    }
    
    return url;
};
