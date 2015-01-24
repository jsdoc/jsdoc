/**
    A collection of functions relating to JSDoc symbol name manipulation.
    @module jsdoc/name
    @author Michael Mathews <micmath@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
'use strict';

var _ = require('underscore');
var escape = require('escape-string-regexp');

var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Longnames that have a special meaning in JSDoc.
 *
 * @enum {string}
 * @static
 * @memberof module:jsdoc/name
 */
var LONGNAMES = exports.LONGNAMES = {
    /** Longname used for doclets that do not have a longname, such as anonymous functions. */
    ANONYMOUS: '<anonymous>',
    /** Longname that represents global scope. */
    GLOBAL: '<global>'
};

// Module namespace prefix.
var MODULE_NAMESPACE = 'module:';

/**
 * Names and punctuation marks that identify doclet scopes.
 *
 * @enum {string}
 * @static
 * @memberof module:jsdoc/name
 */
var SCOPE = exports.SCOPE = {
    NAMES: {
        GLOBAL: 'global',
        INNER: 'inner',
        INSTANCE: 'instance',
        STATIC: 'static'
    },
    PUNC: {
        INNER: '~',
        INSTANCE: '#',
        STATIC: '.'
    }
};

// For backwards compatibility, this enum must use lower-case keys
var scopeToPunc = exports.scopeToPunc = {
    'inner': SCOPE.PUNC.INNER,
    'instance': SCOPE.PUNC.INSTANCE,
    'static': SCOPE.PUNC.STATIC
};
var puncToScope = exports.puncToScope = _.invert(scopeToPunc);

var DEFAULT_SCOPE = SCOPE.NAMES.STATIC;
var SCOPE_PUNC = _.values(SCOPE.PUNC);
var SCOPE_PUNC_STRING = '[' + SCOPE_PUNC.join() + ']';
var REGEXP_LEADING_SCOPE = new RegExp('^(' + SCOPE_PUNC_STRING + ')');
var REGEXP_TRAILING_SCOPE = new RegExp('(' + SCOPE_PUNC_STRING + ')$');

var DESCRIPTION = '(?:(?:[ \\t]*\\-\\s*|\\s+)(\\S[\\s\\S]*))?$';
var REGEXP_DESCRIPTION = new RegExp(DESCRIPTION);
var REGEXP_NAME_DESCRIPTION = new RegExp('^(\\[[^\\]]+\\]|\\S+)' + DESCRIPTION);

function nameIsLongname(name, memberof) {
    var regexp = new RegExp('^' + escape(memberof) + SCOPE_PUNC_STRING);

    return regexp.test(name);
}

function prototypeToPunc(name) {
    // don't mangle symbols named "prototype"
    if (name === 'prototype') {
        return name;
    }

    return name.replace(/(?:^|\.)prototype\.?/g, SCOPE.PUNC.INSTANCE);
}

// TODO: deprecate exports.resolve in favor of a better name
/**
    Resolves the longname, memberof, variation and name values of the given doclet.
    @param {module:jsdoc/doclet.Doclet} doclet
 */
exports.resolve = function(doclet) {
    var about = {};
    var memberof = doclet.memberof || '';
    var name = doclet.name ? String(doclet.name) : '';

    var parentDoc;

    // change MyClass.prototype.instanceMethod to MyClass#instanceMethod
    // (but not in function params, which lack doclet.kind)
    // TODO: check for specific doclet.kind values (probably function, class, and module)
    if (name && doclet.kind) {
        name = prototypeToPunc(name);
    }
    doclet.name = name;

    // member of a var in an outer scope?
    if (name && !memberof && doclet.meta.code && doclet.meta.code.funcscope) {
        name = doclet.longname = doclet.meta.code.funcscope + SCOPE.PUNC.INNER + name;
    }

    if (memberof || doclet.forceMemberof) { // @memberof tag given
        memberof = prototypeToPunc(memberof);

        // the name is a complete longname, like @name foo.bar, @memberof foo
        if (name && nameIsLongname(name, memberof) && name !== memberof) {
            about = exports.shorten(name, (doclet.forceMemberof ? memberof : undefined));
        }
        // the name and memberof are identical and refer to a module,
        // like @name module:foo, @memberof module:foo (probably a member like 'var exports')
        else if (name && name === memberof && name.indexOf(MODULE_NAMESPACE) === 0) {
            about = exports.shorten(name, (doclet.forceMemberof ? memberof : undefined));
        }
        // the name and memberof are identical, like @name foo, @memberof foo
        else if (name && name === memberof) {
            doclet.scope = doclet.scope || DEFAULT_SCOPE;
            name = memberof + scopeToPunc[doclet.scope] + name;
            about = exports.shorten(name, (doclet.forceMemberof ? memberof : undefined));
        }
        // like @memberof foo# or @memberof foo~
        else if (name && REGEXP_TRAILING_SCOPE.test(memberof) ) {
            about = exports.shorten(memberof + name, (doclet.forceMemberof ? memberof : undefined));
        }
        else if (name && doclet.scope) {
            about = exports.shorten(memberof + (scopeToPunc[doclet.scope] || '') + name,
                (doclet.forceMemberof ? memberof : undefined));
        }
    }
    else { // no @memberof
        about = exports.shorten(name);
    }

    if (about.name) {
        doclet.name = about.name;
    }

    if (about.memberof) {
        doclet.setMemberof(about.memberof);
    }

    if (about.longname && (!doclet.longname || doclet.longname === doclet.name)) {
        doclet.setLongname(about.longname);
    }

    if (doclet.scope === SCOPE.NAMES.GLOBAL) { // via @global tag?
        doclet.setLongname(doclet.name);
        delete doclet.memberof;
    }
    else if (about.scope) {
        if (about.memberof === LONGNAMES.GLOBAL) { // via @memberof <global> ?
            doclet.scope = SCOPE.NAMES.GLOBAL;
        }
        else {
            doclet.scope = puncToScope[about.scope];
        }
    }
    else if (doclet.name && doclet.memberof && !doclet.longname) {
        if ( REGEXP_LEADING_SCOPE.test(doclet.name) ) {
            doclet.scope = puncToScope[RegExp.$1];
            doclet.name = doclet.name.substr(1);
        }
        else {
            doclet.scope = DEFAULT_SCOPE;
        }

        doclet.setLongname(doclet.memberof + scopeToPunc[doclet.scope] + doclet.name);
    }

    if (about.variation) {
        doclet.variation = about.variation;
    }

    // if we never found a longname, just use an empty string
    if (!doclet.longname) {
        doclet.longname = '';
    }
};

/**
    @method module:jsdoc/name.applyNamespace
    @param {string} longname The full longname of the symbol.
    @param {string} ns The namespace to be applied.
    @returns {string} The longname with the namespace applied.
 */
exports.applyNamespace = function(longname, ns) {
    var nameParts = exports.shorten(longname);
    var name = nameParts.name;

    longname = nameParts.longname;

    if ( !/^[a-zA-Z]+?:.+$/i.test(name) ) {
        longname = longname.replace( new RegExp(escape(name) + '$'), ns + ':' + name );
    }

    return longname;
};

// TODO: docs
exports.stripNamespace = function(longname) {
    return longname.replace(/^[a-zA-Z]+:/, '');
};

/**
 * Check whether a parent longname is an ancestor of a child longname.
 *
 * @param {string} parent - The parent longname.
 * @param {string} child - The child longname.
 * @return {boolean} `true` if the parent is an ancestor of the child; otherwise, `false`.
 */
exports.hasAncestor = function(parent, child) {
    var hasAncestor = false;
    var memberof = child;

    if (!parent || !child) {
        return hasAncestor;
    }

    // fast path for obvious non-ancestors
    if (child.indexOf(parent) !== 0) {
        return hasAncestor;
    }

    do {
        memberof = exports.shorten(memberof).memberof;

        if (memberof === parent) {
            hasAncestor = true;
        }
    } while (!hasAncestor && memberof);

    return hasAncestor;
};

// TODO: docs
function atomize(longname, sliceChars, forcedMemberof) {
    var i;
    var memberof = '';
    var name = '';
    var parts;
    var partsRegExp;
    var scopePunc = '';
    var token;
    var tokens = [];
    var variation;

    // quoted strings in a longname are atomic, so we convert them to tokens:
    // foo["bar"] => foo.@{1}@
    // Foo.prototype["bar"] => Foo#@{1}
    longname = longname.replace(/(prototype|#)?(\[?["'].+?["']\]?)/g, function($, p1, p2) {
        var punc = '';

        // is there a leading bracket?
        if ( /^\[/.test(p2) ) {
            // is it a static or instance member?
            punc = p1 ? SCOPE.PUNC.INSTANCE : SCOPE.PUNC.STATIC;
            p2 = p2.replace(/^\[/g, '')
                .replace(/\]$/g, '');
        }

        token = '@{' + tokens.length + '}@';
        tokens.push(p2);

        return punc + token;
    });

    longname = prototypeToPunc(longname);

    if (typeof forcedMemberof !== 'undefined') {
        partsRegExp = new RegExp('^(.*?)([' + sliceChars.join() + ']?)$');
        name = longname.substr(forcedMemberof.length);
        parts = forcedMemberof.match(partsRegExp);

        if (parts[1]) {
            memberof = parts[1] || forcedMemberof;
        }
        if (parts[2]) {
            scopePunc = parts[2];
        }
    }
    else if (longname) {
        parts = (longname.match(new RegExp('^(:?(.+)([' + sliceChars.join() + ']))?(.+?)$')) || [])
            .reverse();
        name = parts[0] || '';
        scopePunc = parts[1] || '';
        memberof = parts[2] || '';
    }

    // like /** @name foo.bar(2) */
    if ( /(.+)\(([^)]+)\)$/.test(name) ) {
        name = RegExp.$1;
        variation = RegExp.$2;
    }

    // restore quoted strings
    i = tokens.length;
    while (i--) {
        longname = longname.replace('@{' + i + '}@', tokens[i]);
        memberof = memberof.replace('@{' + i + '}@', tokens[i]);
        scopePunc = scopePunc.replace('@{' + i + '}@', tokens[i]);
        name = name.replace('@{' + i + '}@', tokens[i]);
    }

    return {
        longname: longname,
        memberof: memberof,
        scope: scopePunc,
        name: name,
        variation: variation
    };
}

// TODO: deprecate exports.shorten in favor of a better name
/**
    Given a longname like "a.b#c(2)", slice it up into an object
    containing the memberof, the scope, the name, and variation.
    @param {string} longname
    @param {string} forcedMemberof
    @returns {object} Representing the properties of the given name.
 */
exports.shorten = function(longname, forcedMemberof) {
    return atomize(longname, SCOPE_PUNC, forcedMemberof);
};

// TODO: docs
exports.combine = function(parts) {
    return [
        (parts.memberof || ''),
        (parts.scope || ''),
        (parts.name || ''),
        (parts.variation || '')
    ].join('');
};

// TODO: docs
exports.stripVariation = function(name) {
    var parts = exports.shorten(name);

    parts.variation = '';

    return exports.combine(parts);
};

function splitLongname(longname, options) {
    var chunks = [];
    var currentNameInfo;
    var nameInfo = {};
    var previousName = longname;
    var splitters = SCOPE_PUNC.concat('/');

    options = _.defaults(options || {}, {
        includeVariation: true
    });

    do {
        if (!options.includeVariation) {
            previousName = exports.stripVariation(previousName);
        }
        currentNameInfo = nameInfo[previousName] = atomize(previousName, splitters);
        previousName = currentNameInfo.memberof;
        chunks.push(currentNameInfo.scope + currentNameInfo.name);
    } while (previousName);

    return {
        chunks: chunks.reverse(),
        nameInfo: nameInfo
    };
}

// TODO: docs
exports.longnamesToTree = function longnamesToTree(longnames, doclets) {
    var splitOptions = { includeVariation: false };
    var tree = {};

    longnames.forEach(function(longname) {
        var currentLongname = '';
        var currentParent = tree;
        var nameInfo;
        var processed;

        // don't try to add empty longnames to the tree
        if (!longname) {
            return;
        }

        processed = splitLongname(longname, splitOptions);
        nameInfo = processed.nameInfo;

        processed.chunks.forEach(function(chunk) {
            currentLongname += chunk;

            if (currentParent !== tree) {
                currentParent.children = currentParent.children || {};
                currentParent = currentParent.children;
            }

            if (!hasOwnProp.call(currentParent, chunk)) {
                currentParent[chunk] = nameInfo[currentLongname];
            }

            if (currentParent[chunk]) {
                currentParent[chunk].doclet = doclets ? doclets[currentLongname] : null;
                currentParent = currentParent[chunk];
            }
        });
    });

    return tree;
};

/**
    Split a string that starts with a name and ends with a description into its parts.
    Allows the defaultvalue (if present) to contain brackets. If the name is found to have
    mismatched brackets, null is returned.
    @param {string} nameDesc
    @returns {object} Hash with "name" and "description" properties.
 */
function splitNameMatchingBrackets(nameDesc) {
    var buffer = [];
    var c;
    var stack = 0;
    var stringEnd = null;

    for (var i = 0; i < nameDesc.length; ++i) {
        c = nameDesc[i];
        buffer.push(c);

        if (stringEnd) {
            if (c === '\\' && i + 1 < nameDesc.length) {
                buffer.push(nameDesc[++i]);
            } else if (c === stringEnd) {
                stringEnd = null;
            }
        } else if (c === '"' || c === "'") {
            stringEnd = c;
        } else if (c === '[') {
            ++stack;
        } else if (c === ']') {
            if (--stack === 0) {
                break;
            }
        }
    }

    if (stack || stringEnd) {
        return null;
    }

    nameDesc.substr(i).match(REGEXP_DESCRIPTION);
    return {
        name: buffer.join(''),
        description: RegExp.$1
    };
}


// TODO: deprecate exports.splitName in favor of a better name
/**
    Split a string that starts with a name and ends with a description into its parts.
    @param {string} nameDesc
    @returns {object} Hash with "name" and "description" properties.
 */
exports.splitName = function(nameDesc) {
    // like: name, [name], name text, [name] text, name - text, or [name] - text
    // the hyphen must be on the same line as the name; this prevents us from treating a Markdown
    // dash as a separator

    // optional values get special treatment
    var result = null;
    if (nameDesc[0] === '[') {
        result = splitNameMatchingBrackets(nameDesc);
        if (result !== null) {
            return result;
        }
    }

    nameDesc.match(REGEXP_NAME_DESCRIPTION);
    return {
        name: RegExp.$1,
        description: RegExp.$2
    };
};
