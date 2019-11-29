/**
 * @module module:jsdoc/doclet
 */
const _ = require('lodash');
let dictionary = require('jsdoc/tag/dictionary');
const { isFunction } = require('jsdoc/src/astnode');
const name = require('jsdoc/name');
const path = require('jsdoc/path');
const { Syntax } = require('jsdoc/src/syntax');
const { Tag } = require('jsdoc/tag');

/**
 * Updates `doclet` with the key-value pair of `title`:`value`.
 *
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to update.
 * @param {object} tag - The tag with the property name and value to add to `doclet`.
 * @param {string} tag.title - The property name to add to `doclet`.
 * @param {*}      tag.value - The property value to add to `doclet`.
 */
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

/**
 * Returns fake metadata for `node`.
 *
 * @param {object} node - FIXME
 * @returns {object} FIXME
 */
function fakeMeta(node) {
    return {
        type: node ? node.type : null,
        node: node
    };
}

// use the meta info about the source code to guess what the doclet kind should be
/**
 * Gets a string representing the “kind” value of `code`.
 *
 * @todo - set this elsewhere (maybe jsdoc/src/astnode.getInfo)
 *
 * @param {*} code - FIXME
 * @returns {string} The `kind` value of `code`.
 */
function codeToKind(code) {
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

/**
 * FIXME
 *
 * @param {string} docletSrc - The raw source code of the JSDoc comment.
 * @returns {string} The unwrapped source code of `docletSrc`.
 */
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
 *
 * @private
 * @param {string} docletSrc - The raw source code of the JSDoc comment.
 * @returns {Array.<object.<string, string>>} An array of pseudo-Tag objects.
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

/**
 * FIXME
 *
 * @param {string} docletSrc - The raw source code of the JSDoc comment.
 * @param {object} fixMyName - FIXME
 * @param {object} fixMyName.code - FIXME
 * @returns {string} FIXME
 */
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
    dictionary = dict;
    require('jsdoc/tag')._replaceDictionary(dict);
    require('jsdoc/util/templateHelper')._replaceDictionary(dict);
};

/**
 * FIXME
 *
 * @param {string} longname - FIXME
 * @returns {string} FIXME
 */
function removeGlobal(longname) {
    const globalRegexp = new RegExp(`^${name.LONGNAMES.GLOBAL}\\.?`);

    return longname.replace(globalRegexp, '');
}

/**
 * Get the full path to the source file that is associated with a doclet.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to check for a filepath.
 * @returns {string} The path to the doclet's source file, or an empty string if the path is not
 * available.
 */
function getFilepath(doclet) {
    if (!doclet || !doclet.meta || !doclet.meta.filename) {
        return '';
    }

    return path.join(doclet.meta.path || '', doclet.meta.filename);
}

/**
 * Clone each property in `properties` from `source` to `target`.
 *
 * @param {object} source - The source to clone properties from.
 * @param {object} target - The target to clone properties to.
 * @param {*} properties - FIXME
 * @returns {void}
 */
function clone(source, target, properties) {
    properties.forEach(property => {
        switch (typeof source[property]) {
            case 'function':
                // do nothing
                break;

            case 'object':
                target[property] = _.cloneDeep(source[property]);

                break;

            default:
                target[property] = source[property];
        }
    });
}

/**
 * Copy all but a list of excluded properties from one of two doclets onto a target doclet.
 * Prefers the primary doclet over the secondary doclet.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} primary - The primary doclet.
 * @param {module:jsdoc/doclet.Doclet} secondary - The secondary doclet.
 * @param {module:jsdoc/doclet.Doclet} target - The doclet to which properties will be copied.
 * @param {Array.<string>} exclude - The names of properties to exclude from copying.
 */
function copyMostProperties(primary, secondary, target, exclude) {
    const primaryProperties = _.difference(Object.getOwnPropertyNames(primary), exclude);
    const secondaryProperties = _.difference(Object.getOwnPropertyNames(secondary),
        exclude.concat(primaryProperties));

    clone(primary, target, primaryProperties);
    clone(secondary, target, secondaryProperties);
}

/**
 * Copy specific properties from one of two doclets onto a target doclet, as long as the property
 * has a non-falsy value and a `length` greater than `0`.
 * Prefers the primary doclet over the secondary doclet.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} primary - The primary doclet.
 * @param {module:jsdoc/doclet.Doclet} secondary - The secondary doclet.
 * @param {module:jsdoc/doclet.Doclet} target - The doclet to which properties will be copied.
 * @param {Array.<string>} include - The names of properties to copy.
 */
function copySpecificProperties(primary, secondary, target, include) {
    include.forEach(property => {
        if ({}.hasOwnProperty.call(primary, property) && primary[property] &&
            primary[property].length) {
            target[property] = _.cloneDeep(primary[property]);
        }
        else if ({}.hasOwnProperty.call(secondary, property) && secondary[property] &&
            secondary[property].length) {
            target[property] = _.cloneDeep(secondary[property]);
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
     * @param {string} docletSrc - The raw source code of the JSDoc comment.
     * @param {object} [meta={}] - Properties describing the code related to this comment.
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
            name.resolve(this);
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
        const tagDef = dictionary.lookUp(title);
        const newTag = new Tag(title, text, this.meta);

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
         *
         * @type {string}
         */
        this.memberof = removeGlobal(sid)
            .replace(/\.prototype/g, name.SCOPE.PUNC.INSTANCE);
    }

    /**
     * Set the doclet's `longname` property.
     *
     * @param {string} longname - The longname for the doclet.
     */
    setLongname(longname) {
        /**
         * The fully resolved symbol name.
         *
         * @type {string}
         */
        this.longname = removeGlobal(longname);
        if (dictionary.isNamespace(this.kind)) {
            this.longname = name.applyNamespace(this.longname, this.kind);
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
        const scopeNames = _.values(name.SCOPE.NAMES);

        if (!scopeNames.includes(scope)) {
            filepath = getFilepath(this);

            errorMessage = `The scope name "${scope}" is not recognized. Use one of the ` +
                `following values: ${scopeNames}`;
            if (filepath) {
                errorMessage += ` (Source file: ${filepath})`;
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
             *
             * @type {Array.<string>}
             */
            this.borrowed = [];
        }
        this.borrowed.push(about);
    }

    mix(source) {
        /**
         * A list of symbols that are mixed into this one, if any.
         *
         * @type {Array.<string>}
         */
        this.mixes = this.mixes || [];
        this.mixes.push(source);
    }

    /**
     * Add a symbol to the doclet's `augments` array.
     *
     * @param {string} base - The `longname` of the base symbol.
     */
    augment(base) {
        /**
         * A list of symbols that are augmented by this one, if any.
         *
         * @type {Array.<string>}
         */
        this.augments = this.augments || [];
        this.augments.push(base);
    }

    /**
     * Set the `meta` property of this doclet.
     *
     * @param {object} meta - FIXME
     */
    setMeta(meta) {
        let pathname;

        /**
         * Information about the source code associated with this doclet.
         *
         * @namespace
         */
        this.meta = this.meta || {};

        if (meta.range) {
            /**
             * The positions of the first and last characters of the code associated with this doclet.
             *
             * @type {Array.<number>}
             */
            this.meta.range = meta.range.slice(0);
        }

        if (meta.lineno) {
            /**
             * The name of the file containing the code associated with this doclet.
             *
             * @type {string}
             */
            this.meta.filename = path.basename(meta.filename);
            /**
             * The line number of the code associated with this doclet.
             *
             * @type {number}
             */
            this.meta.lineno = meta.lineno;
            /**
             * The column number of the code associated with this doclet.
             *
             * @type {number}
             */
            this.meta.columnno = meta.columnno;

            pathname = path.dirname(meta.filename);
            if (pathname && pathname !== '.') {
                this.meta.path = pathname;
            }
        }

        /**
         * Information about the code symbol.
         *
         * @namespace
         */
        this.meta.code = this.meta.code || {};
        if (meta.id) { this.meta.code.id = meta.id; }
        if (meta.code) {
            if (meta.code.name) {
                /**
                 * The name of the symbol in the source code.
                 *
                 * @type {string}
                 */
                this.meta.code.name = meta.code.name;
            }
            if (meta.code.type) {
                /**
                 * The type of the symbol in the source code.
                 *
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
                 *
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
 * @returns {module:jsdoc/doclet.Doclet} A new doclet that combines the primary and secondary
 * doclets.
 */
exports.combine = (primary, secondary) => {
    const copyMostPropertiesExclude = [
        'params',
        'properties',
        'undocumented'
    ];
    const copySpecificPropertiesInclude = [
        'params',
        'properties'
    ];
    const target = new Doclet('');

    // First, copy most properties to the target doclet.
    copyMostProperties(primary, secondary, target, copyMostPropertiesExclude);
    // Then copy a few specific properties to the target doclet, as long as they're not falsy and
    // have a length greater than 0.
    copySpecificProperties(primary, secondary, target, copySpecificPropertiesInclude);

    return target;
};
