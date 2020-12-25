/**
 * @module jsdoc/doclet
 */
const _ = require('lodash');
let dictionary = require('jsdoc/tag/dictionary');
const { isFunction } = require('@jsdoc/parse').astNode;
const {
    applyNamespace,
    hasLeadingScope,
    hasTrailingScope,
    LONGNAMES,
    MODULE_NAMESPACE,
    nameIsLongname,
    prototypeToPunc,
    PUNC_TO_SCOPE,
    SCOPE,
    SCOPE_TO_PUNC,
    toParts
} = require('@jsdoc/core').name;
const path = require('path');
const { Syntax } = require('@jsdoc/parse');
const { Tag } = require('jsdoc/tag');

const DEFAULT_SCOPE = SCOPE.NAMES.STATIC;

function fakeMeta(node) {
    return {
        type: node ? node.type : null,
        node: node
    };
}

// use the meta info about the source code to guess what the doclet kind should be
// TODO: set this elsewhere (maybe @jsdoc/parse.astNode.getInfo)
function codeToKind(code) {
    let kind = 'member';
    const node = code.node;

    if (isFunction(code.type) && code.type !== Syntax.MethodDefinition) {
        kind = 'function';
    }
    else if (code.type === Syntax.MethodDefinition && node) {
        if (node.kind === 'constructor') {
            kind = 'class';
        }
        else if (node.kind !== 'get' && node.kind !== 'set') {
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
    else if (node && node.parent && isFunction(node.parent)) {
        kind = 'param';
    }

    return kind;
}

function unwrap(docletSrc) {
    if (!docletSrc) {
        return '';
    }

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
 * Resolves the following properties of a doclet:
 *
 * + `name`
 * + `longname`
 * + `memberof`
 * + `variation`
 *
 * @private
 */
function resolve(doclet) {
    let about = {};
    let memberof = doclet.memberof || '';
    let metaName;
    let name = doclet.name ? String(doclet.name) : '';
    let puncAndName;
    let puncAndNameIndex;

    // Change `MyClass.prototype.instanceMethod` to `MyClass#instanceMethod`
    // (but not in function params, which lack `doclet.kind`).
    // TODO: Check for specific `doclet.kind` values (probably `function`, `class`, and `module`).
    if (name && doclet.kind) {
        name = prototypeToPunc(name);
    }
    doclet.name = name;

    // Does the doclet have an alias that identifies the memberof? If so, use it
    if (doclet.alias) {
        about = toParts(name);

        if (about.memberof) {
            memberof = about.memberof;
        }
    }
    // Member of a var in an outer scope?
    else if (name && !memberof && doclet.meta.code && doclet.meta.code.funcscope) {
        name = doclet.longname = doclet.meta.code.funcscope + SCOPE.PUNC.INNER + name;
    }

    if (memberof || doclet.forceMemberof) { // @memberof tag given
        memberof = prototypeToPunc(memberof);

        // The name is a complete longname, like `@name foo.bar` with `@memberof foo`.
        if (name && nameIsLongname(name, memberof) && name !== memberof) {
            about = toParts(name, (doclet.forceMemberof ? memberof : undefined));
        }
        // The name and memberof are identical and refer to a module, like `@name module:foo` with
        // `@memberof module:foo`.
        else if (name && name === memberof && name.indexOf(MODULE_NAMESPACE) === 0) {
            about = toParts(name, (doclet.forceMemberof ? memberof : undefined));
        }
        // The name and memberof are identical, like `@name foo` with `@memberof foo`.
        else if (name && name === memberof) {
            doclet.scope = doclet.scope || DEFAULT_SCOPE;
            name = memberof + SCOPE_TO_PUNC[doclet.scope] + name;
            about = toParts(name, (doclet.forceMemberof ? memberof : undefined));
        }
        // Like `@memberof foo#` or `@memberof foo~`.
        else if (name && hasTrailingScope(memberof) ) {
            about = toParts(memberof + name, (doclet.forceMemberof ? memberof : undefined));
        }
        else if (name && doclet.scope) {
            about = toParts(memberof + (SCOPE_TO_PUNC[doclet.scope] || '') + name,
                (doclet.forceMemberof ? memberof : undefined));
        }
    } else {
        // No memberof.
        about = toParts(name);
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
            doclet.scope = PUNC_TO_SCOPE[about.scope];
        }
    }
    else if (doclet.name && doclet.memberof && !doclet.longname) {
        if (hasLeadingScope(doclet.name)) {
            doclet.scope = PUNC_TO_SCOPE[RegExp.$1];
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
            if (
                puncAndNameIndex !== -1 &&
                (puncAndNameIndex === metaName.length - puncAndName.length)
            ) {
                doclet.scope = SCOPE.NAMES.INSTANCE;
            }
        }

        doclet.scope = doclet.scope || DEFAULT_SCOPE;
        doclet.setLongname(doclet.memberof + SCOPE_TO_PUNC[doclet.scope] + doclet.name);
    }

    if (about.variation) {
        doclet.variation = about.variation;
    }

    // If we never found a longname, just use an empty string.
    if (!doclet.longname) {
        doclet.longname = '';
    }
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

function removeGlobal(longname) {
    const globalRegexp = new RegExp(`^${LONGNAMES.GLOBAL}\\.?`);

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
 * Copy all but a list of excluded properties from one of two doclets onto a target doclet. Prefers
 * the primary doclet over the secondary doclet.
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
 * has a non-falsy value and a length greater than 0. Prefers the primary doclet over the secondary
 * doclet.
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

    // TODO: We call this method in the constructor _and_ in `jsdoc/src/handlers`. It appears that
    // if we don't call the method twice, various doclet properties can be incorrect, including name
    // and memberof.
    /** Called once after all tags have been added. */
    postProcess() {
        if (!this.preserveName) {
            resolve(this);
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
            for (let i = 0, l = this.params.length; i < l; i++) {
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
            // TODO: Use `prototypeToPunc` instead?
            .replace(/\.prototype/g, SCOPE.PUNC.INSTANCE);
    }

    /**
     * Set the doclet's `longname` property.
     *
     * @param {string} longname - The longname for the doclet.
     */
    setLongname(longname) {
        /**
         * The fully resolved symbol name.
         * @type {string}
         */
        this.longname = removeGlobal(longname);
        if (dictionary.isNamespace(this.kind)) {
            this.longname = applyNamespace(this.longname, this.kind);
        }
    }

    /**
     * Set the doclet's `scope` property. Must correspond to a scope name that is defined in
     * {@link module:@jsdoc/core.name.SCOPE.NAMES}.
     *
     * @param {string} scope - The scope for the doclet relative to the symbol's parent.
     * @throws {Error} If the scope name is not recognized.
     */
    setScope(scope) {
        let errorMessage;
        let filepath;
        const scopeNames = _.values(SCOPE.NAMES);

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
