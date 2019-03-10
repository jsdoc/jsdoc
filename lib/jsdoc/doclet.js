/**
 * @module jsdoc/doclet
 */
const _ = require('underscore');
const jsdoc = {
    env: require('jsdoc/env'),
    name: require('jsdoc/name'),
    src: {
        astnode: require('jsdoc/src/astnode'),
        Syntax: require('jsdoc/src/syntax').Syntax
    },
    tag: {
        Tag: require('jsdoc/tag').Tag,
        dictionary: require('jsdoc/tag/dictionary')
    },
    util: {
        doop: require('jsdoc/util/doop')
    }
};
const path = require('jsdoc/path');
const Syntax = jsdoc.src.Syntax;
const util = require('util');

function applyTag(doclet, {title, value}) {
    if (title === 'name') {
        doclet.name = value;
    }

    if (title === 'kind') {
        doclet.kind = value;
    }

    if (title === 'description') {
        doclet.description = value;
    }
}

function fakeMeta(node) {
    return {
        type: node ? node.type : null,
        node: node
    };
}

// use the meta info about the source code to guess what the doclet kind should be
// TODO: set this elsewhere (maybe jsdoc/src/astnode.getInfo)
function codeToKind(code) {
    const isFunction = jsdoc.src.astnode.isFunction;
    let kind = 'member';
    const node = code.node;

    if ( isFunction(code.type) && code.type !== Syntax.MethodDefinition ) {
        kind = 'function';
    }
    else if (code.type === Syntax.MethodDefinition) {
        if (code.node.kind === 'constructor') {
            kind = 'class';
        }
        else if (code.node.kind !== 'get' && code.node.kind !== 'set') {
            kind = 'function';
        }
    }
    else if (code.type === Syntax.ClassDeclaration || code.type === Syntax.ClassExpression) {
        kind = 'class';
    }
    else if (code.type === Syntax.ExportAllDeclaration) {
        // this value will often be an Identifier for a variable, which isn't very useful
        kind = codeToKind(fakeMeta(node.source));
    }
    else if (code.type === Syntax.ExportDefaultDeclaration ||
        code.type === Syntax.ExportNamedDeclaration) {
        kind = codeToKind(fakeMeta(node.declaration));
    }
    else if (code.type === Syntax.ExportSpecifier) {
        // this value will often be an Identifier for a variable, which isn't very useful
        kind = codeToKind(fakeMeta(node.local));
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
        // remove opening slash+stars
        docletSrc.replace(/^\/\*\*+/, '')
            // replace closing star slash with end-marker
            .replace(/\**\*\/$/, '\\Z')
            // remove left margin like: spaces+star or spaces+end-marker
            .replace(/^\s*(\* ?|\\Z)/gm, '')
            // remove end-marker
            .replace(/\s*\\Z$/g, '');

    return docletSrc;
}

/**
 * Convert the raw source of the doclet comment into an array of pseudo-Tag objects.
 * @private
 */
function toTags(docletSrc) {
    let parsedTag;
    const tagData = [];
    let tagText;
    let tagTitle;

    // split out the basic tags, keep surrounding whitespace
    // like: @tagTitle tagBody
    docletSrc
        // replace splitter ats with an arbitrary sequence
        .replace(/^(\s*)@(\S)/gm, '$1\\@$2')
        // then split on that arbitrary sequence
        .split('\\@')
        .forEach($ => {
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

function fixDescription(docletSrc, {code}) {
    let isClass;

    if (!/^\s*@/.test(docletSrc) && docletSrc.replace(/\s/g, '').length) {
        isClass = code &&
            (code.type === Syntax.ClassDeclaration ||
            code.type === Syntax.ClassExpression);

        docletSrc = `${isClass ? '@classdesc' : '@description'} ${docletSrc}`;
    }

    return docletSrc;
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

function removeGlobal(longname) {
    const globalRegexp = new RegExp(`^${jsdoc.name.LONGNAMES.GLOBAL}\\.?`);

    return longname.replace(globalRegexp, '');
}

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

function dooper(source, target, properties) {
    properties.forEach(property => {
        switch (typeof source[property]) {
            case 'function':
                // do nothing
                break;

            case 'object':
                target[property] = jsdoc.util.doop(source[property]);

                break;

            default:
                target[property] = source[property];
        }
    });
}

/**
 * Combine two doclets into a target doclet, using properties from the secondary doclet only when
 * those properties do not exist on the primary doclet, and ignoring properties that should be
 * excluded.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} primary - The primary doclet.
 * @param {module:jsdoc/doclet.Doclet} secondary - The secondary doclet.
 * @param {module:jsdoc/doclet.Doclet} target - The doclet to which properties will be copied.
 * @param {Array.<string>} exclude - The names of properties to exclude from copying.
 */
function combine(primary, secondary, target, exclude) {
    const primaryProperties = _.difference(Object.getOwnPropertyNames(primary), exclude);
    const secondaryProperties = _.difference(Object.getOwnPropertyNames(secondary),
        exclude.concat(primaryProperties));

    dooper(primary, target, primaryProperties);
    dooper(secondary, target, secondaryProperties);
}

/**
 * Combine specified properties from two doclets into a target doclet, using the properties of the
 * primary doclet unless the properties of the secondary doclet appear to be a better fit.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} primary - The primary doclet.
 * @param {module:jsdoc/doclet.Doclet} secondary - The secondary doclet.
 * @param {module:jsdoc/doclet.Doclet} target - The doclet to which properties will be copied.
 * @param {Array.<string>} include - The names of properties to copy.
 */
function combineWithLogic(primary, secondary, target, include) {
    include.forEach(property => {
        let shouldUsePrimary = false;

        if ({}.hasOwnProperty.call(primary, property)) {
            // use the primary property if the secondary property is missing or empty
            if (!secondary[property] || !secondary[property].length) {
                shouldUsePrimary = true;
            }
            // use the source property if it's not empty
            else if (primary[property].length) {
                shouldUsePrimary = true;
            }
        }

        if (shouldUsePrimary) {
            target[property] = jsdoc.util.doop(primary[property]);
        }
        else if ({}.hasOwnProperty.call(secondary, property)) {
            target[property] = jsdoc.util.doop(secondary[property]);
        }
    });
}

/**
 * Represents a single JSDoc comment.
 *
 * @alias module:jsdoc/doclet.Doclet
 */
class Doclet {
    /**
     * Create a doclet.
     *
     * @param {string} docletSrc - The raw source code of the jsdoc comment.
     * @param {object=} meta - Properties describing the code related to this comment.
     */
    constructor(docletSrc, meta = {}) {
        let newTags = [];

        /** The original text of the comment from the source code. */
        this.comment = docletSrc;
        this.setMeta(meta);

        docletSrc = unwrap(docletSrc);
        docletSrc = fixDescription(docletSrc, meta);

        newTags = toTags.call(this, docletSrc);

        for (let i = 0, l = newTags.length; i < l; i++) {
            this.addTag(newTags[i].title, newTags[i].text);
        }

        this.postProcess();
    }

    /** Called once after all tags have been added. */
    postProcess() {
        let i;
        let l;

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
            this.longname += `(${this.variation})`;
        }

        // add in any missing param names
        if (this.params && this.meta && this.meta.code && this.meta.code.paramnames) {
            for (i = 0, l = this.params.length; i < l; i++) {
                if (!this.params[i].name) {
                    this.params[i].name = this.meta.code.paramnames[i] || '';
                }
            }
        }
    }

    /**
     * Add a tag to the doclet.
     *
     * @param {string} title - The title of the tag being added.
     * @param {string} [text] - The text of the tag being added.
     */
    addTag(title, text) {
        const tagDef = jsdoc.tag.dictionary.lookUp(title);
        const newTag = new jsdoc.tag.Tag(title, text, this.meta);

        if (tagDef && tagDef.onTagged) {
            tagDef.onTagged(this, newTag);
        }

        if (!tagDef) {
            this.tags = this.tags || [];
            this.tags.push(newTag);
        }

        applyTag(this, newTag);
    }

    /**
     * Set the doclet's `memberof` property.
     *
     * @param {string} sid - The longname of the doclet's parent symbol.
     */
    setMemberof(sid) {
        /**
         * The longname of the symbol that contains this one, if any.
         * @type {string}
         */
        this.memberof = removeGlobal(sid)
            .replace(/\.prototype/g, jsdoc.name.SCOPE.PUNC.INSTANCE);
    }

    /**
     * Set the doclet's `longname` property.
     *
     * @param {string} name - The longname for the doclet.
     */
    setLongname(name) {
        /**
         * The fully resolved symbol name.
         * @type {string}
         */
        this.longname = removeGlobal(name);
        if (jsdoc.tag.dictionary.isNamespace(this.kind)) {
            this.longname = jsdoc.name.applyNamespace(this.longname, this.kind);
        }
    }

    /**
     * Set the doclet's `scope` property. Must correspond to a scope name that is defined in
     * {@link module:jsdoc/name.SCOPE.NAMES}.
     *
     * @param {module:jsdoc/name.SCOPE.NAMES} scope - The scope for the doclet relative to the
     * symbol's parent.
     * @throws {Error} If the scope name is not recognized.
     */
    setScope(scope) {
        let errorMessage;
        let filepath;
        const scopeNames = _.values(jsdoc.name.SCOPE.NAMES);

        if (!scopeNames.includes(scope)) {
            filepath = getFilepath(this);

            errorMessage = util.format('The scope name "%s" is not recognized. Use one of the ' +
                'following values: %j', scope, scopeNames);
            if (filepath) {
                errorMessage += util.format(' (Source file: %s)', filepath);
            }

            throw new Error(errorMessage);
        }

        this.scope = scope;
    }

    /**
     * Add a symbol to this doclet's `borrowed` array.
     *
     * @param {string} source - The longname of the symbol that is the source.
     * @param {string} target - The name the symbol is being assigned to.
     */
    borrow(source, target) {
        const about = { from: source };

        if (target) {
            about.as = target;
        }

        if (!this.borrowed) {
            /**
             * A list of symbols that are borrowed by this one, if any.
             * @type {Array.<string>}
             */
            this.borrowed = [];
        }
        this.borrowed.push(about);
    }

    mix(source) {
        /**
         * A list of symbols that are mixed into this one, if any.
         * @type Array.<string>
         */
        this.mixes = this.mixes || [];
        this.mixes.push(source);
    }

    /**
     * Add a symbol to the doclet's `augments` array.
     *
     * @param {string} base - The longname of the base symbol.
     */
    augment(base) {
        /**
         * A list of symbols that are augmented by this one, if any.
         * @type Array.<string>
         */
        this.augments = this.augments || [];
        this.augments.push(base);
    }

    /**
     * Set the `meta` property of this doclet.
     *
     * @param {object} meta
     */
    setMeta(meta) {
        let pathname;

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
            /**
             * The column number of the code associated with this doclet.
             * @type number
             */
            this.meta.columnno = meta.columnno;

            pathname = path.dirname(meta.filename);
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
                /**
                 * The name of the symbol in the source code.
                 * @type {string}
                 */
                this.meta.code.name = meta.code.name;
            }
            if (meta.code.type) {
                /**
                 * The type of the symbol in the source code.
                 * @type {string}
                 */
                this.meta.code.type = meta.code.type;
            }
            if (meta.code.node) {
                Object.defineProperty(this.meta.code, 'node', {
                    value: meta.code.node,
                    enumerable: false
                });
            }
            if (meta.code.funcscope) {
                this.meta.code.funcscope = meta.code.funcscope;
            }
            if (typeof meta.code.value !== 'undefined') {
                /**
                 * The value of the symbol in the source code.
                 * @type {*}
                 */
                this.meta.code.value = meta.code.value;
            }
            if (meta.code.paramnames) {
                this.meta.code.paramnames = meta.code.paramnames.slice(0);
            }
        }
    }
}
exports.Doclet = Doclet;

/**
 * Combine two doclets into a new doclet.
 *
 * @param {module:jsdoc/doclet.Doclet} primary - The doclet whose properties will be used.
 * @param {module:jsdoc/doclet.Doclet} secondary - The doclet to use as a fallback for properties
 * that the primary doclet does not have.
 */
exports.combine = (primary, secondary) => {
    const specialCase = [
        'params',
        'properties'
    ];
    const target = new Doclet('');

    combine(primary, secondary, target, specialCase);
    combineWithLogic(primary, secondary, target, specialCase);

    return target;
};
