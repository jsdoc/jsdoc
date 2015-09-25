/**
 * @overview
 * @author Michael Mathews <micmath@gmail.com>
 * @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
 * @module jsdoc/doclet
 */
'use strict';

var _ = require('underscore');
var jsdoc = {
    name: require('jsdoc/name'),
    src: {
        astnode: require('jsdoc/src/astnode'),
        Syntax: require('jsdoc/src/syntax').Syntax
    },
    tag: {
        Tag: require('jsdoc/tag').Tag,
        dictionary: require('jsdoc/tag/dictionary')
    }
};
var path = require('jsdoc/path');
var Syntax = jsdoc.src.Syntax;
var util = require('util');

function applyTag(doclet, tag) {
    if (tag.title === 'name') {
        doclet.name = tag.value;
    }

    if (tag.title === 'kind') {
        doclet.kind = tag.value;
    }

    if (tag.title === 'description') {
        doclet.description = tag.value;
    }
}

// use the meta info about the source code to guess what the doclet kind should be
function codeToKind(code) {
    var isFunction = jsdoc.src.astnode.isFunction;
    var kind = 'member';
    var node = code.node;

    if ( isFunction(code.type) ) {
        kind = 'function';
    }
    else if ( code.node && code.node.parent && isFunction(code.node.parent) ) {
        kind = 'param';
    }

    return kind;
}

function unwrap(docletSrc) {
    if (!docletSrc) { return ''; }

    // note: keep trailing whitespace for @examples
    // extra opening/closing stars are ignored
    // left margin is considered a star and a space
    // use the /m flag on regex to avoid having to guess what this platform's newline is
    docletSrc =
        docletSrc.replace(/^\/\*\*+/, '') // remove opening slash+stars
        .replace(/\**\*\/$/, '\\Z')       // replace closing star slash with end-marker
        .replace(/^\s*(\* ?|\\Z)/gm, '')  // remove left margin like: spaces+star or spaces+end-marker
        .replace(/\s*\\Z$/g, '');         // remove end-marker

    return docletSrc;
}

/**
 * Convert the raw source of the doclet comment into an array of pseudo-Tag objects.
 * @private
 */
function toTags(docletSrc) {
    var parsedTag;
    var tagData = [];
    var tagText;
    var tagTitle;

    // split out the basic tags, keep surrounding whitespace
    // like: @tagTitle tagBody
    docletSrc
        // replace splitter ats with an arbitrary sequence
        .replace(/^(\s*)@(\S)/gm, '$1\\@$2')
        // then split on that arbitrary sequence
        .split('\\@')
        .forEach(function($) {
            if ($) {
                parsedTag = $.match(/^(\S+)(?:\s+(\S[\s\S]*))?/);

                if (parsedTag) {
                    tagTitle = parsedTag[1];
                    tagText = parsedTag[2];

                    if (tagTitle) {
                        tagData.push({
                            title: tagTitle,
                            text: tagText
                        });
                    }
                }
            }
    });

    return tagData;
}

function fixDescription(docletSrc) {
    if (!/^\s*@/.test(docletSrc) && docletSrc.replace(/\s/g, '').length) {
        docletSrc = '@description ' + docletSrc;
    }
    return docletSrc;
}

function expandParamNames(params, codeNames) {
    var name;
    var newNames = [];

    for (var i = 0, u = 0, l = params.length; i < l; i++) {
        name = params[i].name;

        if (!name) {
            name = codeNames[u] || '';
            newNames.push(name);
            u++;
        } else {
            if (name.indexOf('.') === -1) {
                newNames.push(name);
                u++;
            } else if (/^[\.]{1,3}([^\.].*)$/.test(name)) {
                name = newNames[newNames.length-1] + '.' + RegExp.$1;
            }
        }

        params[i].name = name;
    }
    return params;
}

/**
 * Replace the existing tag dictionary with a new tag dictionary.
 *
 * Used for testing only.
 *
 * @private
 * @param {module:jsdoc/tag/dictionary.Dictionary} dict - The new tag dictionary.
 */
exports._replaceDictionary = function _replaceDictionary(dict) {
    jsdoc.tag.dictionary = dict;
    require('jsdoc/tag')._replaceDictionary(dict);
    require('jsdoc/util/templateHelper')._replaceDictionary(dict);
};

/**
 * @class
 * @classdesc Represents a single JSDoc comment.
 * @param {string} docletSrc - The raw source code of the jsdoc comment.
 * @param {object=} meta - Properties describing the code related to this comment.
 */
var Doclet = exports.Doclet = function(docletSrc, meta) {
    var newTags = [];

    /** The original text of the comment from the source code. */
    this.comment = docletSrc;
    this.setMeta(meta);

    docletSrc = unwrap(docletSrc);
    docletSrc = fixDescription(docletSrc);

    newTags = toTags.call(this, docletSrc);

    for (var i = 0, l = newTags.length; i < l; i++) {
        this.addTag(newTags[i].title, newTags[i].text);
    }

    this.postProcess();
};

/** Called once after all tags have been added. */
Doclet.prototype.postProcess = function() {
    if (!this.preserveName) {
        jsdoc.name.resolve(this);
    }
    if (this.name && !this.longname) {
        this.setLongname(this.name);
    }
    if (this.memberof === '') {
        delete this.memberof;
    }

    if (!this.kind && this.meta && this.meta.code) {
        this.addTag( 'kind', codeToKind(this.meta.code) );
    }

    if (this.variation && this.longname && !/\)$/.test(this.longname) ) {
        this.longname += '(' + this.variation + ')';
    }

    // add in any missing param names
    if (this.params && this.meta && this.meta.code && this.meta.code.paramnames) {
        this.params = expandParamNames(this.params, this.meta.code.paramnames);
    }
};

/**
 * Add a tag to the doclet.
 *
 * @param {string} title - The title of the tag being added.
 * @param {string} [text] - The text of the tag being added.
 */
Doclet.prototype.addTag = function(title, text) {
    var tagDef = jsdoc.tag.dictionary.lookUp(title),
        newTag = new jsdoc.tag.Tag(title, text, this.meta);

    if (tagDef && tagDef.onTagged) {
       tagDef.onTagged(this, newTag);
    }

    if (!tagDef) {
        this.tags = this.tags || [];
        this.tags.push(newTag);
    }

    applyTag(this, newTag);
};

function removeGlobal(longname) {
    var globalRegexp = new RegExp('^' + jsdoc.name.LONGNAMES.GLOBAL + '\\.?');

    return longname.replace(globalRegexp, '');
}

/**
 * Set the doclet's `memberof` property.
 *
 * @param {string} sid - The longname of the doclet's parent symbol.
 */
Doclet.prototype.setMemberof = function(sid) {
    /**
     * The longname of the symbol that contains this one, if any.
     * @type string
     */
    this.memberof = removeGlobal(sid)
        .replace(/\.prototype/g, jsdoc.name.SCOPE.PUNC.INSTANCE);
};

/**
 * Set the doclet's `longname` property.
 *
 * @param {string} name - The longname for the doclet.
 */
Doclet.prototype.setLongname = function(name) {
    /**
     * The fully resolved symbol name.
     * @type string
     */
    this.longname = removeGlobal(name);
    if (jsdoc.tag.dictionary.isNamespace(this.kind)) {
        this.longname = jsdoc.name.applyNamespace(this.longname, this.kind);
    }
};

/**
 * Get the full path to the source file that is associated with a doclet.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} The doclet to check for a filepath.
 * @return {string} The path to the doclet's source file, or an empty string if the path is not
 * available.
 */
function getFilepath(doclet) {
    if (!doclet || !doclet.meta || !doclet.meta.filename) {
        return '';
    }

    return path.join(doclet.meta.path || '', doclet.meta.filename);
}

/**
 * Set the doclet's `scope` property. Must correspond to a scope name that is defined in
 * {@link module:jsdoc/name.SCOPE.NAMES}.
 *
 * @param {module:jsdoc/name.SCOPE.NAMES} scope - The scope for the doclet relative to the symbol's
 * parent.
 * @throws {Error} If the scope name is not recognized.
 */
Doclet.prototype.setScope = function(scope) {
    var errorMessage;
    var filepath;
    var scopeNames = _.values(jsdoc.name.SCOPE.NAMES);

    if (scopeNames.indexOf(scope) === -1) {
        filepath = getFilepath(this);

        errorMessage = util.format('The scope name "%s" is not recognized. Use one of the ' +
            'following values: %j', scope, scopeNames);
        if (filepath) {
            errorMessage += util.format(' (Source file: %s)', filepath);
        }

        throw new Error(errorMessage);
    }

    this.scope = scope;
};

/**
 * Add a symbol to this doclet's `borrowed` array.
 *
 * @param {string} source - The longname of the symbol that is the source.
 * @param {string} target - The name the symbol is being assigned to.
 */
Doclet.prototype.borrow = function(source, target) {
    var about = { from: source };
    if (target) {
        about.as = target;
    }

    if (!this.borrowed) {
        /**
         * A list of symbols that are borrowed by this one, if any.
         * @type Array.<string>
         */
        this.borrowed = [];
    }
    this.borrowed.push(about);
};

Doclet.prototype.mix = function(source) {
    /**
     * A list of symbols that are mixed into this one, if any.
     * @type Array.<string>
     */
    this.mixes = this.mixes || [];
    this.mixes.push(source);
};

/**
 * Add a symbol to the doclet's `augments` array.
 *
 * @param {string} base - The longname of the base symbol.
 */
Doclet.prototype.augment = function(base) {
    /**
     * A list of symbols that are augmented by this one, if any.
     * @type Array.<string>
     */
    this.augments = this.augments || [];
    this.augments.push(base);
};

/**
 * Set the `meta` property of this doclet.
 *
 * @param {object} meta
 */
Doclet.prototype.setMeta = function(meta) {
    /**
     * Information about the source code associated with this doclet.
     * @namespace
     */
    this.meta = this.meta || {};

    if (meta.range) {
        /**
         * The positions of the first and last characters of the code associated with this doclet.
         * @type Array.<number>
         */
        this.meta.range = meta.range.slice(0);
    }

    if (meta.lineno) {
        /**
         * The name of the file containing the code associated with this doclet.
         * @type string
         */
        this.meta.filename = path.basename(meta.filename);
        /**
         * The line number of the code associated with this doclet.
         * @type number
         */
        this.meta.lineno = meta.lineno;

        var pathname = path.dirname(meta.filename);
        if (pathname && pathname !== '.') {
            this.meta.path = pathname;
        }
    }

    /**
     * Information about the code symbol.
     * @namespace
     */
    this.meta.code = this.meta.code || {};
    if (meta.id) { this.meta.code.id = meta.id; }
    if (meta.code) {
        if (meta.code.name) {
            /** The name of the symbol in the source code. */
            this.meta.code.name = meta.code.name;
        }
        if (meta.code.type) {
            /** The type of the symbol in the source code. */
            this.meta.code.type = meta.code.type;
        }
        // the AST node is only enumerable in debug mode, which reduces clutter for the
        // --explain/-X option
        if (meta.code.node) {
            Object.defineProperty(this.meta.code, 'node', {
                value: meta.code.node,
                enumerable: global.env.opts.debug ? true : false
            });
        }
        if (meta.code.funcscope) {
            this.meta.code.funcscope = meta.code.funcscope;
        }
        if (typeof meta.code.value !== 'undefined') {
            /** The value of the symbol in the source code. */
            this.meta.code.value = meta.code.value;
        }
        if (meta.code.paramnames) {
            this.meta.code.paramnames = meta.code.paramnames.slice(0);
        }
    }
};
