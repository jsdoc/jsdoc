/*global env: true */
/**
 * @module jsdoc/util/templateHelper
 */

var crypto = require('crypto');
var dictionary = require('jsdoc/tag/dictionary');
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;

var files = {};

// each container gets its own html file
var containers = ['class', 'module', 'external', 'namespace', 'mixin'];

/** @external {jsdoc.tutorial.Tutorial} */
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
    var result;

    // allow for namespace prefix
    var basename = str.replace(nsprefix, '$1-');
    
    if ( /[^$a-z0-9._\-]/i.test(basename) ) {
        result = crypto.createHash('sha1').update(str).digest('hex').substr(0, 10);
    } else {
        result = makeFilenameUnique(basename, str);
    }

    return result + exports.fileExtension;
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

var linkto = exports.linkto = function(longname, linktext) {
    var url = longnameToUrl[longname];
    return url ? '<a href="' + url + '">' + (linktext || longname) + '</a>' : (linktext || longname);
};

var htmlsafe = exports.htmlsafe = function(str) {
    return str.replace(/</g, '&lt;');
};

/**
 * Check whether `data` is a TaffyDB or an array of objects.
 * @private
 * @param {TAFFY|Array.<Object>} data A TaffyDB or array of objects.
 * @return {boolean} Set to `true` if `data` is a TaffyDB or `false` if `data` is an array of
 * objects.
 */
function isTaffy(data) {
    // reliable enough for our purposes
    return !util.isArray(data);
}

/**
 * Find items in a TaffyDB database or array of objects that match all of the specified properties,
 * or that cause the specified function to return `true`.
 *
 * This function gives special treatment to certain types of spec properties:
 *
 * + If a property in the spec contains an array, the function will test the item against each value
 * in the array.
 * + If a property in the spec contains an object, the item will be returned only if it also
 * contains an object that matches all of the properties in the spec's child object.
 *
 * For example, the spec `{ number: [1, 2, 3], letters: {A: [true, 'maybe']} }` would match
 * any of the following:
 *
 * + `{ number: 2, letters: {A: true} }`
 * + `{ number: 1, letters: {A: true, D: 'hello', Q: false} }`
 * + `{ number: 3, letters: {A: 'maybe'}, squiggle: '?' }`
 * @param {TAFFY|Array.<Object>} data The TaffyDB or array of objects to search.
 * @param {Object|Function} spec The key-value pairs to match against (for example,
 * `{longname: 'foo'}`), or a function that returns `true` if a value matches or `false` if it does
 * not match.
 * @param {boolean} invert Set to `true` to return only objects that _do not match_ any of the
 * specified properties.
 * @return {Array.<Object>} The objects that match the spec.
 */
var find = exports.find = function(data, spec, invert) {
    // remove TaffyDB crud
    function detaffy(item) {
        delete item.___id;
        delete item.___s;
        return item;
    }

    function defaultMatcher(item) {
        item = detaffy(item);

        // do we have a match?
        var match = true;

        for (var prop in spec) {
            // the item must contain each property in the spec
            if ( hasOwnProp.call(spec, prop) && hasOwnProp.call(item, prop) ) {
                // if the spec property is an array, we accept any value in the array
                if ( util.isArray(spec[prop]) ) {
                    match = spec[prop].indexOf(item[prop]) !== -1;
                }
                // if the spec property is an object, we recurse into the object
                else if (typeof spec[prop] === 'object') {
                    // if we get a result back, it's a match
                    match = Object.keys( find([item[prop]], spec[prop]) ).length > 0;
                }
                // for all other types, we just check equality
                else {
                    match = spec[prop] === item[prop];
                }

                // no need to keep checking if we know there's not a match
                if (!match) {
                    return false;
                }
            }
            // if a property is missing, it can't be a match
            else {
                return false;
            }
        }

        // it's a match!
        return true;
    }

    if ( isTaffy(data) ) {
        data = data().get();
    }

    // if a function was passed in, use it, but also remove TaffyDB crud if necessary
    var matcher = typeof spec !== 'function' ? defaultMatcher : function(item) {
        return spec.call(this, detaffy(item));
    };

    var matches = data.filter(matcher);
    var nonmatches = [];
    
    if (!invert) {
        return matches;
    }
    else {
        for (var i = 0, l = data.length; i < l; i++) {
            if (matches.indexOf(data[i]) === -1) {
                nonmatches.push(data[i]);
            }
        }

        return nonmatches;
    }
};

/**
 * Find items in a TaffyDB database or array of objects that do not match any of the specified
 * properties, or that cause the specified function to return `false`.
 *
 * Calling this function is equivalent to calling `find()` and setting the `invert` parameter to
 * `true`.
 * @param {TAFFY|Array.<Object>} data The TaffyDB or array of objects to search.
 * @param {Object|Function} spec The key-value pairs to match against (for example,
 * `{longname: 'foo'}`), or a function that returns `false` if a value matches or `true` if it does
 * not match.
 * @return {Array.<Object>} The objects that do not match any properties of the spec.
 */
var remove = exports.remove = function(data, spec) {
    return find(data, spec, true);
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
 * @param {TAFFY} data The TaffyDB database to search.
 * @return {object} An object with `classes`, `externals`, `globals`, `mixins`, `modules`, and
 * `namespaces` properties. Each property contains an array of objects.
 */
exports.getMembers = function(data) {
    return {
        classes: find( data, {kind: 'class'} ),
        externals: find( data, {kind: 'external'} ),
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
 * @param {object} d The doclet whose types will be retrieved.
 * @return {array<string>} HTML links to allowed types for the member.
 */
exports.getSignatureTypes = function(d) {
    var types = [];
    
    if (d.type && d.type.names) {
        types = d.type.names;
    }
    
    if (types && types.length) {
        types = types.map(function(t) {
            return linkto(t, htmlsafe(t));
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
 * @param {object} d The doclet whose types will be retrieved.
 * @return {array<string>} HTML links to types that the member can return.
 */
exports.getSignatureReturns = function(d) {
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
            return linkto(r);
        });
    }

    return returnTypes;
};

/**
 * Retrieve links to a member's ancestors.
 * @param {TAFFY} data The TaffyDB database to search.
 * @param {object} doclet The doclet whose ancestors will be retrieved.
 * @return {array<string>} HTML links to a member's ancestors.
 */
exports.getAncestorLinks = function(data, doclet) {
    var ancestors = [],
        doc = doclet.memberof;

    while (doc) {
        doc = find( data, {longname: doc}, false );
        if (doc) { doc = doc[0]; }
        if (!doc) { break; }
        ancestors.unshift( linkto(doc.longname, (exports.scopeToPunc[doc.scope] || '') + doc.name) );
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
 * @param {TAFFY|Array.<Object>} data The TaffyDB or array of objects to prune.
 * @return {TAFFY|Array.<Object>} The pruned TaffyDB or array of objects.
 */
exports.prune = function(data) {
    var taffy = isTaffy(data);

    data = remove(data, {undocumented: true});
    data = remove(data, {ignore: true});
    data = remove(data, {memberof: '<anonymous>'});

    if (!env.opts.private) {
        data = remove(data, {access: 'private'});
    }
 
    // if the caller gave us a TaffyDB, we need to return a TaffyDB
    if (taffy) {
        data = require('taffydb').taffy(data);
    }
    return data;
};

exports.registerLink = function(longname, url) {
    linkMap.longnameToUrl[longname] = url;
    linkMap.urlToLongname[url] = longname;
};

function toLink(longname, content) {
    if (!longname) {
        // if this happens, there's something wrong with the caller itself; the user can't fix this
        throw new Error('Missing required parameter: url');
    }
    
    // Has link been specified manually?
    var url;
    if (/^(http|ftp)s?:/.test(longname)) {
        url = longname;
        
        // Has link text been specified {@link http://github.com|GitHub Website}
        var split = url.indexOf('|');
        if (split !== -1) {
            content = url.substr(split + 1);
            url = url.substr(0, split);
        }
    }
    else {
        url = linkMap.longnameToUrl[longname];
    }
    
    content = content || longname;
    
    if (!url) {
        return content;
    }
    else {
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
    if (!tutorialLinkMap.nameToUrl[node.name]) {
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
    str = str.replace(/(?:\[(.+?)\])?\{@link +(.+?)\}/gi,
        function(match, content, longname) {
            return toLink(longname, content);
        }
    );

    str = str.replace(/(?:\[(.+?)\])?\{@tutorial +(.+?)\}/gi,
        function(match, content, tutorial) {
            return toTutorial(tutorial, content);
        }
    );

    return str;
};

/** Turn a doclet into a URL. */
exports.createLink = function(doclet) {
    var url = '',
        longname,
        filename;
    
    if (containers.indexOf(doclet.kind) < 0) {
        longname = doclet.longname;
        filename = getUniqueFilename(doclet.memberof || exports.globalName);
        
        url = filename + '#' + getNamespace(doclet.kind) + doclet.name;
    }
    else {
        longname = doclet.longname;
        url = getUniqueFilename(longname);
    }
    
    return url;
};
