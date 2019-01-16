/**
 * A collection of functions relating to JSDoc symbol name manipulation.
 * @module jsdoc/name
 */
const _ = require('underscore');
const escape = require('escape-string-regexp');

const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Longnames that have a special meaning in JSDoc.
 *
 * @enum {string}
 * @static
 * @memberof module:jsdoc/name
 */
const LONGNAMES = exports.LONGNAMES = {
    /** Longname used for doclets that do not have a longname, such as anonymous functions. */
    ANONYMOUS: '<anonymous>',
    /** Longname that represents global scope. */
    GLOBAL: '<global>'
};

// Module namespace prefix.
const MODULE_NAMESPACE = 'module:';

/**
 * Names and punctuation marks that identify doclet scopes.
 *
 * @enum {string}
 * @static
 * @memberof module:jsdoc/name
 */
const SCOPE = exports.SCOPE = {
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
const scopeToPunc = exports.scopeToPunc = {
    'inner': SCOPE.PUNC.INNER,
    'instance': SCOPE.PUNC.INSTANCE,
    'static': SCOPE.PUNC.STATIC
};
const puncToScope = exports.puncToScope = _.invert(scopeToPunc);

const DEFAULT_SCOPE = SCOPE.NAMES.STATIC;
const SCOPE_PUNC = _.values(SCOPE.PUNC);
const SCOPE_PUNC_STRING = `[${SCOPE_PUNC.join()}]`;
const REGEXP_LEADING_SCOPE = new RegExp(`^(${SCOPE_PUNC_STRING})`);
const REGEXP_TRAILING_SCOPE = new RegExp(`(${SCOPE_PUNC_STRING})$`);

const DESCRIPTION = '(?:(?:[ \\t]*\\-\\s*|\\s+)(\\S[\\s\\S]*))?$';
const REGEXP_DESCRIPTION = new RegExp(DESCRIPTION);
const REGEXP_NAME_DESCRIPTION = new RegExp(`^(\\[[^\\]]+\\]|\\S+)${DESCRIPTION}`);

function nameIsLongname(name, memberof) {
    const regexp = new RegExp(`^${escape(memberof)}${SCOPE_PUNC_STRING}`);

    return regexp.test(name);
}

function prototypeToPunc(name) {
    // don't mangle symbols named "prototype"
    if (name === 'prototype') {
        return name;
    }

    return name.replace(/(?:^|\.)prototype\.?/g, SCOPE.PUNC.INSTANCE);
}

// TODO: docs
/**
 * @param {string} name - The symbol's longname.
 * @return {string} The symbol's basename.
 */
exports.getBasename = name => {
    if (name !== undefined) {
        return name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
    }

    return undefined;
};

// TODO: deprecate exports.resolve in favor of a better name
/**
 * Resolves the longname, memberof, variation and name values of the given doclet.
 * @param {module:jsdoc/doclet.Doclet} doclet
 */
exports.resolve = doclet => {
    let about = {};
    let memberof = doclet.memberof || '';
    let metaName;
    let name = doclet.name ? String(doclet.name) : '';
    let puncAndName;
    let puncAndNameIndex;

    // change MyClass.prototype.instanceMethod to MyClass#instanceMethod
    // (but not in function params, which lack doclet.kind)
    // TODO: check for specific doclet.kind values (probably function, class, and module)
    if (name && doclet.kind) {
        name = prototypeToPunc(name);
    }
    doclet.name = name;

    // does the doclet have an alias that identifies the memberof? if so, use it
    if (doclet.alias) {
        about = exports.shorten(name);

        if (about.memberof) {
            memberof = about.memberof;
        }
    }
    // member of a var in an outer scope?
    else if (name && !memberof && doclet.meta.code && doclet.meta.code.funcscope) {
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
        else if (doclet.meta.code && doclet.meta.code.name) {
            // HACK: Handle cases where an ES 2015 class is a static memberof something else, and
            // the class has instance members. In these cases, we have to detect the instance
            // members' scope by looking at the meta info. There's almost certainly a better way to
            // do this...
            metaName = String(doclet.meta.code.name);
            puncAndName = SCOPE.PUNC.INSTANCE + doclet.name;
            puncAndNameIndex = metaName.indexOf(puncAndName);
            if ( puncAndNameIndex !== -1 &&
                (puncAndNameIndex === metaName.length - puncAndName.length) ) {
                doclet.scope = SCOPE.NAMES.INSTANCE;
            }
        }

        doclet.scope = doclet.scope || DEFAULT_SCOPE;
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
 * @param {string} longname The full longname of the symbol.
 * @param {string} ns The namespace to be applied.
 * @returns {string} The longname with the namespace applied.
 */
exports.applyNamespace = (longname, ns) => {
    const nameParts = exports.shorten(longname);
    const name = nameParts.name;

    longname = nameParts.longname;

    if ( !/^[a-zA-Z]+?:.+$/i.test(name) ) {
        longname = longname.replace( new RegExp(`${escape(name)}$`), `${ns}:${name}` );
    }

    return longname;
};

// TODO: docs
exports.stripNamespace = longname => longname.replace(/^[a-zA-Z]+:/, '');

/**
 * Check whether a parent longname is an ancestor of a child longname.
 *
 * @param {string} parent - The parent longname.
 * @param {string} child - The child longname.
 * @return {boolean} `true` if the parent is an ancestor of the child; otherwise, `false`.
 */
exports.hasAncestor = (parent, child) => {
    let hasAncestor = false;
    let memberof = child;

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
    let i;
    let memberof = '';
    let name = '';
    let parts;
    let partsRegExp;
    let scopePunc = '';
    let token;
    const tokens = [];
    let variation;

    // quoted strings in a longname are atomic, so we convert them to tokens:
    // foo["bar"] => foo.@{1}@
    // Foo.prototype["bar"] => Foo#@{1}
    longname = longname.replace(/(prototype|#)?(\[?["'].+?["']\]?)/g, ($, p1, p2) => {
        let punc = '';

        // is there a leading bracket?
        if ( /^\[/.test(p2) ) {
            // is it a static or instance member?
            punc = p1 ? SCOPE.PUNC.INSTANCE : SCOPE.PUNC.STATIC;
            p2 = p2.replace(/^\[/g, '')
                .replace(/\]$/g, '');
        }

        token = `@{${tokens.length}}@`;
        tokens.push(p2);

        return punc + token;
    });

    longname = prototypeToPunc(longname);

    if (typeof forcedMemberof !== 'undefined') {
        partsRegExp = new RegExp(`^(.*?)([${sliceChars.join()}]?)$`);
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
        parts = (longname.match(new RegExp(`^(:?(.+)([${sliceChars.join()}]))?(.+?)$`)) || [])
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
        longname = longname.replace(`@{${i}}@`, tokens[i]);
        memberof = memberof.replace(`@{${i}}@`, tokens[i]);
        scopePunc = scopePunc.replace(`@{${i}}@`, tokens[i]);
        name = name.replace(`@{${i}}@`, tokens[i]);
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
 * Given a longname like "a.b#c(2)", slice it up into an object containing the memberof, the scope,
 * the name, and variation.
 * @param {string} longname
 * @param {string} forcedMemberof
 * @returns {object} Representing the properties of the given name.
 */
exports.shorten = (longname, forcedMemberof) => atomize(longname, SCOPE_PUNC, forcedMemberof);

// TODO: docs
exports.combine = ({memberof, scope, name, variation}) => [
    (memberof || ''),
    (scope || ''),
    (name || ''),
    (variation || '')
].join('');

// TODO: docs
exports.stripVariation = name => {
    const parts = exports.shorten(name);

    parts.variation = '';

    return exports.combine(parts);
};

function splitLongname(longname, options) {
    const chunks = [];
    let currentNameInfo;
    const nameInfo = {};
    let previousName = longname;
    const splitters = SCOPE_PUNC.concat('/');

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

/**
 * Convert an array of doclet longnames into a tree structure, optionally attaching doclets to the
 * tree.
 *
 * Each level of the tree is an object with the following properties:
 *
 * + `longname {string}`: The longname.
 * + `memberof {string?}`: The memberof.
 * + `scope {string?}`: The longname's scope, represented as a punctuation mark (for example, `#`
 * for instance and `.` for static).
 * + `name {string}`: The short name.
 * + `doclet {Object?}`: The doclet associated with the longname, or `null` if the doclet was not
 * provided.
 * + `children {Object?}`: The children of the current longname. Not present if there are no
 * children.
 *
 * For example, suppose you have the following array of doclet longnames:
 *
 * ```js
 * [
 *   "module:a",
 *   "module:a/b",
 *   "myNamespace",
 *   "myNamespace.Foo",
 *   "myNamespace.Foo#bar"
 * ]
 * ```
 *
 * This method converts these longnames to the following tree:
 *
 * ```js
 * {
 *   "module:a": {
 *     "longname": "module:a",
 *     "memberof": "",
 *     "scope": "",
 *     "name": "module:a",
 *     "doclet": null,
 *     "children": {
 *       "/b": {
 *         "longname": "module:a/b",
 *         "memberof": "module:a",
 *         "scope": "/",
 *         "name": "b",
 *         "doclet": null
 *       }
 *     }
 *   },
 *   "myNamespace": {
 *     "longname": "myNamespace",
 *     "memberof": "",
 *     "scope": "",
 *     "name": "myNamespace",
 *     "doclet": null,
 *     "children": {
 *       ".Foo": {
 *         "longname": "myNamespace.Foo",
 *         "memberof": "myNamespace",
 *         "scope": ".",
 *         "name": "Foo",
 *         "doclet": null,
 *         "children": {
 *           "#bar": {
 *             "longname": "myNamespace.Foo#bar",
 *             "memberof": "myNamespace.Foo",
 *             "scope": "#",
 *             "name": "bar",
 *             "doclet": null
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param {Array<string>} longnames - The longnames to convert into a tree.
 * @param {Object<string, module:jsdoc/doclet.Doclet>} doclets - The doclets to attach to a tree.
 * Each property should be the longname of a doclet, and each value should be the doclet for that
 * longname.
 * @return {Object} A tree with information about each longname in the format shown above.
 */
exports.longnamesToTree = (longnames, doclets) => {
    const splitOptions = { includeVariation: false };
    const tree = {};

    longnames.forEach(longname => {
        let currentLongname = '';
        let currentParent = tree;
        let nameInfo;
        let processed;

        // don't try to add empty longnames to the tree
        if (!longname) {
            return;
        }

        processed = splitLongname(longname, splitOptions);
        nameInfo = processed.nameInfo;

        processed.chunks.forEach(chunk => {
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
 * Split a string that starts with a name and ends with a description into its parts. Allows the
 * defaultvalue (if present) to contain brackets. If the name is found to have mismatched brackets,
 * null is returned.
 * @param {string} nameDesc
 * @returns {object} Hash with "name" and "description" properties.
 */
function splitNameMatchingBrackets(nameDesc) {
    const buffer = [];
    let c;
    let stack = 0;
    let stringEnd = null;

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
 * Split a string that starts with a name and ends with a description into its parts.
 * @param {string} nameDesc
 * @returns {object} Hash with "name" and "description" properties.
 */
exports.splitName = nameDesc => {
    // like: name, [name], name text, [name] text, name - text, or [name] - text
    // the hyphen must be on the same line as the name; this prevents us from treating a Markdown
    // dash as a separator

    // optional values get special treatment
    let result = null;

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
