/**
 * Define tags that are known in JSDoc.
 * @module jsdoc/tag/dictionary/definitions
 */
const _ = require('underscore');
const jsdoc = {
    env: require('jsdoc/env'),
    name: require('jsdoc/name'),
    src: {
        astnode: require('jsdoc/src/astnode')
    },
    tag: {
        inline: require('jsdoc/tag/inline'),
        type: require('jsdoc/tag/type')
    },
    util: {
        doop: require('jsdoc/util/doop'),
        logger: require('jsdoc/util/logger')
    }
};
const path = require('jsdoc/path');
const Syntax = require('jsdoc/src/syntax').Syntax;

const hasOwnProp = Object.prototype.hasOwnProperty;

const DEFINITIONS = {
    closure: 'closureTags',
    jsdoc: 'jsdocTags'
};
const MODULE_NAMESPACE = 'module:';

// Clone a tag definition, excluding synonyms.
function cloneTagDef(tagDef, extras) {
    const newTagDef = jsdoc.util.doop(tagDef);

    delete newTagDef.synonyms;

    return (extras ? _.extend(newTagDef, extras) : newTagDef);
}

function getSourcePaths() {
    const sourcePaths = jsdoc.env.sourceFiles.slice(0) || [];

    if (jsdoc.env.opts._) {
        jsdoc.env.opts._.forEach(sourcePath => {
            const resolved = path.resolve(jsdoc.env.pwd, sourcePath);

            if (!sourcePaths.includes(resolved)) {
                sourcePaths.push(resolved);
            }
        });
    }

    return sourcePaths;
}

function filepathMinusPrefix(filepath) {
    const sourcePaths = getSourcePaths();
    const commonPrefix = path.commonPrefix(sourcePaths);
    let result = '';

    if (filepath) {
        filepath = path.normalize(filepath);
        // always use forward slashes in the result
        result = (filepath + path.sep).replace(commonPrefix, '')
            .replace(/\\/g, '/');
    }

    if (result.length > 0 && result[result.length - 1] !== '/') {
        result += '/';
    }

    return result;
}

/** @private */
function setDocletKindToTitle(doclet, {title}) {
    doclet.addTag( 'kind', title );
}

function setDocletScopeToTitle(doclet, {title}) {
    try {
        doclet.setScope(title);
    }
    catch (e) {
        jsdoc.util.logger.error(e.message);
    }
}

function setDocletNameToValue(doclet, {value, text}) {
    if (value && value.description) { // as in a long tag
        doclet.addTag('name', value.description);
    }
    else if (text) { // or a short tag
        doclet.addTag('name', text);
    }
}

function setDocletNameToValueName(doclet, {value}) {
    if (value && value.name) {
        doclet.addTag('name', value.name);
    }
}

function setDocletDescriptionToValue(doclet, {value}) {
    if (value) {
        doclet.addTag('description', value);
    }
}

function setDocletTypeToValueType(doclet, {value}) {
    if (value && value.type) {
        // Add the type names and other type properties (such as `optional`).
        // Don't overwrite existing properties.
        Object.keys(value).forEach(prop => {
            if ( !hasOwnProp.call(doclet, prop) ) {
                doclet[prop] = value[prop];
            }
        });
    }
}

function setNameToFile(doclet) {
    let name;

    if (doclet.meta.filename) {
        name = filepathMinusPrefix(doclet.meta.path) + doclet.meta.filename;
        doclet.addTag('name', name);
    }
}

function setDocletMemberof(doclet, {value}) {
    if (value && value !== '<global>') {
        doclet.setMemberof(value);
    }
}

function applyNamespace(docletOrNs, tag) {
    if (typeof docletOrNs === 'string') { // ns
        tag.value = jsdoc.name.applyNamespace(tag.value, docletOrNs);
    }
    else { // doclet
        if (!docletOrNs.name) {
            return; // error?
        }

        docletOrNs.longname = jsdoc.name.applyNamespace(docletOrNs.name, tag.title);
    }
}

function setDocletNameToFilename(doclet) {
    let name = '';

    if (doclet.meta.path) {
        name = filepathMinusPrefix(doclet.meta.path);
    }
    name += doclet.meta.filename.replace(/\.js$/i, '');

    doclet.name = name;
}

function parseTypeText(text) {
    const tagType = jsdoc.tag.type.parse(text, false, true);

    return tagType.typeExpression || text;
}

function parseBorrows(doclet, {text}) {
    const m = /^([\s\S]+?)(?:\s+as\s+([\s\S]+))?$/.exec(text);

    if (m) {
        if (m[1] && m[2]) {
            return {
                target: m[1],
                source: m[2]
            };
        }
        else if (m[1]) {
            return {
                target: m[1]
            };
        }

        return {};
    } else {
        return {};
    }
}

function stripModuleNamespace(name) {
    return name.replace(/^module:/, '');
}

function firstWordOf(string) {
    const m = /^(\S+)/.exec(string);

    if (m) {
        return m[1];
    }
    else {
        return '';
    }
}

function combineTypes({value}) {
    let combined;

    if (value && value.type) {
        if (value.type.names.length === 1) {
            combined = value.type.names[0];
        }
        else {
            combined = `(${value.type.names.join('|')})`;
        }
    }

    return combined;
}

// Tags that JSDoc uses internally, and that must always be defined.
const internalTags = {
    // Special separator tag indicating that multiple doclets should be generated for the same
    // comment. Used internally (and by some JSDoc users, although it's not officially supported).
    // In the following example, the parser will replace `//**` with an `@also` tag:
    // /**
    //  * Foo.
    //  *//**
    //  * Foo with a param.
    //  * @param {string} bar
    //  */
    //  function foo(bar) {}
    also: {
        onTagged() {
            // let the parser handle it; we define the tag here to avoid "not a known tag" errors
        }
    },
    description: {
        mustHaveValue: true,
        synonyms: ['desc']
    },
    kind: {
        mustHaveValue: true
    },
    name: {
        mustHaveValue: true
    },
    undocumented: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.undocumented = true;
            doclet.comment = '';
        }
    }
};

// Core JSDoc tags that are shared with other tag dictionaries.
let baseTags = exports.baseTags = {
    abstract: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            // we call this `virtual` because `abstract` is a reserved word
            doclet.virtual = true;
        },
        synonyms: ['virtual']
    },
    access: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            // only valid values are package, private, protected and public
            if ( /^(package|private|protected|public)$/i.test(value) ) {
                doclet.access = value.toLowerCase();
            }
            else {
                delete doclet.access;
            }
        }
    },
    alias: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.alias = value;
        }
    },
    async: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.async = true;
        }
    },
    augments: {
        mustHaveValue: true,
        // Allow augments value to be specified as a normal type, e.g. {Type}
        onTagText: parseTypeText,
        onTagged(doclet, {value}) {
            doclet.augment( firstWordOf(value) );
        },
        synonyms: ['extends']
    },
    author: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.author = doclet.author || [];
            doclet.author.push(value);
        }
    },
    // this symbol has a member that should use the same docs as another symbol
    borrows: {
        mustHaveValue: true,
        onTagged(doclet, tag) {
            const borrows = parseBorrows(doclet, tag);

            doclet.borrow(borrows.target, borrows.source);
        }
    },
    class: {
        onTagged(doclet, tag) {
            let looksLikeDesc;

            doclet.addTag('kind', 'class');

            // handle special case where both @class and @constructor tags exist in same doclet
            if (tag.originalTitle === 'class') {
                // multiple words after @class?
                looksLikeDesc = (tag.value || '').match(/\S+\s+\S+/);
                if ((looksLikeDesc || /@construct(s|or)\b/i.test(doclet.comment)) &&
                    !/@classdesc\b/i.test(doclet.comment)) {
                    // treat the @class tag as a @classdesc tag instead
                    doclet.classdesc = tag.value;

                    return;
                }
            }

            setDocletNameToValue(doclet, tag);
        },
        synonyms: ['constructor']
    },
    classdesc: {
        onTagged(doclet, {value}) {
            doclet.classdesc = value;
        }
    },
    constant: {
        canHaveType: true,
        canHaveName: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValueName(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        },
        synonyms: ['const']
    },
    constructs: {
        onTagged(doclet, {value}) {
            let ownerClassName;

            if (!value) {
                // this can be resolved later in the handlers
                ownerClassName = '{@thisClass}';
            }
            else {
                ownerClassName = firstWordOf(value);
            }
            doclet.addTag('alias', ownerClassName);
            doclet.addTag('kind', 'class');
        }
    },
    copyright: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.copyright = value;
        }
    },
    default: {
        onTagged(doclet, {value}) {
            const nodeToValue = jsdoc.src.astnode.nodeToValue;

            if (value) {
                doclet.defaultvalue = value;
            }
            else if (doclet.meta && doclet.meta.code &&
                typeof doclet.meta.code.value !== 'undefined') {
                switch (doclet.meta.code.type) {
                    case Syntax.ArrayExpression:
                        doclet.defaultvalue = nodeToValue(doclet.meta.code.node);
                        doclet.defaultvaluetype = 'array';
                        break;

                    case Syntax.Literal:
                        doclet.defaultvalue = doclet.meta.code.value;
                        break;

                    case Syntax.ObjectExpression:
                        doclet.defaultvalue = nodeToValue(doclet.meta.code.node);
                        doclet.defaultvaluetype = 'object';
                        break;

                    default:
                        // do nothing
                        break;
                }
            }
        },
        synonyms: ['defaultvalue']
    },
    deprecated: {
        // value is optional
        onTagged(doclet, {value}) {
            doclet.deprecated = value || true;
        }
    },
    enum: {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.kind = doclet.kind || 'member';
            doclet.isEnum = true;
            setDocletTypeToValueType(doclet, tag);
        }
    },
    event: {
        isNamespace: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
        }
    },
    example: {
        keepsWhitespace: true,
        removesIndent: true,
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.examples = doclet.examples || [];
            doclet.examples.push(value);
        }
    },
    exports: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            const modName = firstWordOf(value);

            // in case the user wrote something like `/** @exports module:foo */`:
            doclet.addTag( 'alias', stripModuleNamespace(modName) );
            doclet.addTag('kind', 'module');
        }
    },
    external: {
        canHaveType: true,
        isNamespace: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
                doclet.addTag('name', doclet.type.names[0]);
            }
            else {
                setDocletNameToValue(doclet, tag);
            }
        },
        synonyms: ['host']
    },
    file: {
        onTagged(doclet, tag) {
            setNameToFile(doclet);
            setDocletKindToTitle(doclet, tag);
            setDocletDescriptionToValue(doclet, tag);

            doclet.preserveName = true;
        },
        synonyms: ['fileoverview', 'overview']
    },
    fires: {
        mustHaveValue: true,
        onTagged(doclet, tag) {
            doclet.fires = doclet.fires || [];
            applyNamespace('event', tag);
            doclet.fires.push(tag.value);
        },
        synonyms: ['emits']
    },
    function: {
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
        },
        synonyms: ['func', 'method']
    },
    generator: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.generator = true;
        }
    },
    global: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.scope = jsdoc.name.SCOPE.NAMES.GLOBAL;
            delete doclet.memberof;
        }
    },
    hideconstructor: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.hideconstructor = true;
        }
    },
    ignore: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.ignore = true;
        }
    },
    implements: {
        mustHaveValue: true,
        onTagText: parseTypeText,
        onTagged(doclet, {value}) {
            doclet.implements = doclet.implements || [];
            doclet.implements.push(value);
        }
    },
    inheritdoc: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            // use an empty string so JSDoc can support `@inheritdoc Foo#bar` in the future
            doclet.inheritdoc = '';
        }
    },
    inner: {
        onTagged(doclet, tag) {
            setDocletScopeToTitle(doclet, tag);
        }
    },
    instance: {
        onTagged(doclet, tag) {
            setDocletScopeToTitle(doclet, tag);
        }
    },
    interface: {
        canHaveName: true,
        onTagged(doclet, tag) {
            doclet.addTag('kind', 'interface');
            if (tag.value) {
                setDocletNameToValueName(doclet, tag);
            }
        }
    },
    lends: {
        onTagged(doclet, {value}) {
            doclet.alias = value || jsdoc.name.LONGNAMES.GLOBAL;
            doclet.addTag('undocumented');
        }
    },
    license: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.license = value;
        }
    },
    listens: {
        mustHaveValue: true,
        onTagged(doclet, tag) {
            doclet.listens = doclet.listens || [];
            applyNamespace('event', tag);
            doclet.listens.push(tag.value);
        }
    },
    member: {
        canHaveType: true,
        canHaveName: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValueName(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        },
        synonyms: ['var']
    },
    memberof: {
        mustHaveValue: true,
        onTagged(doclet, tag) {
            if (tag.originalTitle === 'memberof!') {
                doclet.forceMemberof = true;
                if (tag.value === jsdoc.name.LONGNAMES.GLOBAL) {
                    doclet.addTag('global');
                    delete doclet.memberof;
                }
            }
            setDocletMemberof(doclet, tag);
        },
        synonyms: ['memberof!']
    },
    // this symbol mixes in all of the specified object's members
    mixes: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            const source = firstWordOf(value);

            doclet.mix(source);
        }
    },
    mixin: {
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
        }
    },
    modifies: {
        canHaveType: true,
        onTagged(doclet, {value}) {
            doclet.modifies = doclet.modifies || [];
            doclet.modifies.push(value);
        }
    },
    module: {
        canHaveType: true,
        isNamespace: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
            if (!doclet.name) {
                setDocletNameToFilename(doclet);
            }
            // in case the user wrote something like `/** @module module:foo */`:
            doclet.name = stripModuleNamespace(doclet.name);

            setDocletTypeToValueType(doclet, tag);
        }
    },
    namespace: {
        canHaveType: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        }
    },
    package: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.access = 'package';
        }
    },
    param: {
        canHaveType: true,
        canHaveName: true,
        onTagged(doclet, {value}) {
            doclet.params = doclet.params || [];
            doclet.params.push(value || {});
        },
        synonyms: ['arg', 'argument']
    },
    private: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.access = 'private';
        }
    },
    property: {
        mustHaveValue: true,
        canHaveType: true,
        canHaveName: true,
        onTagged(doclet, {value}) {
            doclet.properties = doclet.properties || [];
            doclet.properties.push(value);
        },
        synonyms: ['prop']
    },
    protected: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.access = 'protected';
        }
    },
    public: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.access = 'public';
        }
    },
    readonly: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.readonly = true;
        }
    },
    requires: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            let requiresName;

            // inline link tags are passed through as-is so that `@requires {@link foo}` works
            if ( jsdoc.tag.inline.isInlineTag(value, 'link\\S*') ) {
                requiresName = value;
            }
            // otherwise, assume it's a module
            else {
                requiresName = firstWordOf(value);
                if (requiresName.indexOf(MODULE_NAMESPACE) !== 0) {
                    requiresName = MODULE_NAMESPACE + requiresName;
                }
            }

            doclet.requires = doclet.requires || [];
            doclet.requires.push(requiresName);
        }
    },
    returns: {
        mustHaveValue: true,
        canHaveType: true,
        onTagged(doclet, {value}) {
            doclet.returns = doclet.returns || [];
            doclet.returns.push(value);
        },
        synonyms: ['return']
    },
    see: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.see = doclet.see || [];
            doclet.see.push(value);
        }
    },
    since: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.since = value;
        }
    },
    static: {
        onTagged(doclet, tag) {
            setDocletScopeToTitle(doclet, tag);
        }
    },
    summary: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.summary = value;
        }
    },
    'this': {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.this = firstWordOf(value);
        }
    },
    todo: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.todo = doclet.todo || [];
            doclet.todo.push(value);
        }
    },
    throws: {
        mustHaveValue: true,
        canHaveType: true,
        onTagged(doclet, {value}) {
            doclet.exceptions = doclet.exceptions || [];
            doclet.exceptions.push(value);
        },
        synonyms: ['exception']
    },
    tutorial: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.tutorials = doclet.tutorials || [];
            doclet.tutorials.push(value);
        }
    },
    type: {
        mustHaveValue: true,
        mustNotHaveDescription: true,
        canHaveType: true,
        onTagText(text) {
            let closeIdx;
            let openIdx;

            const OPEN_BRACE = '{';
            const CLOSE_BRACE = '}';

            // remove line breaks
            text = text.replace(/[\f\n\r]/g, '');

            // Text must be a type expression; for backwards compatibility, we add braces if they're
            // missing. But do NOT add braces to things like `@type {string} some pointless text`.
            openIdx = text.indexOf(OPEN_BRACE);
            closeIdx = text.indexOf(CLOSE_BRACE);

            // a type expression is at least one character long
            if ( openIdx !== 0 || closeIdx <= openIdx + 1) {
                text = OPEN_BRACE + text + CLOSE_BRACE;
            }

            return text;
        },
        onTagged(doclet, tag) {
            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);

                // for backwards compatibility, we allow @type for functions to imply return type
                if (doclet.kind === 'function') {
                    doclet.addTag('returns', tag.text);
                }
            }
        }
    },
    typedef: {
        canHaveType: true,
        canHaveName: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);

            if (tag.value) {
                setDocletNameToValueName(doclet, tag);

                // callbacks are always type {function}
                if (tag.originalTitle === 'callback') {
                    doclet.type = {
                        names: [
                            'function'
                        ]
                    };
                }
                else {
                    setDocletTypeToValueType(doclet, tag);
                }
            }
        },
        synonyms: ['callback']
    },
    variation: {
        mustHaveValue: true,
        onTagged(doclet, tag) {
            let value = tag.value;

            if ( /^\((.+)\)$/.test(value) ) {
                value = RegExp.$1;
            }

            doclet.variation = value;
        }
    },
    version: {
        mustHaveValue: true,
        onTagged(doclet, {value}) {
            doclet.version = value;
        }
    },
    yields: {
        mustHaveValue: true,
        canHaveType: true,
        onTagged(doclet, {value}) {
            doclet.yields = doclet.yields || [];
            doclet.yields.push(value);
        },
        synonyms: ['yield']
    }
};

baseTags = _.extend(baseTags, internalTags);

// Tag dictionary for JSDoc.
exports.jsdocTags = baseTags;

function ignore() {
    // do nothing
}

// Tag dictionary for Google Closure Compiler.
exports.closureTags = {
    const: {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.kind = 'constant';
            setDocletTypeToValueType(doclet, tag);
        },
        // Closure Compiler only
        synonyms: ['define']
    },
    constructor: cloneTagDef(baseTags.class),
    deprecated: cloneTagDef(baseTags.deprecated),
    // Closure Compiler only
    dict: {
        onTagged: ignore
    },
    enum: cloneTagDef(baseTags.enum),
    // Closure Compiler only
    export: {
        onTagged: ignore
    },
    // Closure Compiler only
    externs: {
        onTagged: ignore
    },
    extends: cloneTagDef(baseTags.augments),
    fileoverview: {
        onTagged(doclet, tag) {
            setNameToFile(doclet);
            doclet.kind = 'file';
            setDocletDescriptionToValue(doclet, tag);

            doclet.preserveName = true;
        }
    },
    final: cloneTagDef(baseTags.readonly),
    implements: cloneTagDef(baseTags.implements),
    // Closure Compiler only
    implicitcast: {
        onTagged: ignore
    },
    inheritdoc: cloneTagDef(baseTags.inheritdoc),
    interface: cloneTagDef(baseTags.interface, {
        canHaveName: false,
        mustNotHaveValue: true,
        // Closure Compiler only
        synonyms: ['record']
    }),
    lends: cloneTagDef(baseTags.lends),
    license: cloneTagDef(baseTags.license),
    modifies: cloneTagDef(baseTags.modifies),
    // Closure Compiler only
    noalias: {
        onTagged: ignore
    },
    // Closure Compiler only
    nocollapse: {
        onTagged: ignore
    },
    // Closure Compiler only
    nocompile: {
        onTagged: ignore
    },
    // Closure Compiler only
    nosideeffects: {
        onTagged(doclet) {
            doclet.modifies = [];
        }
    },
    // Closure Compiler only
    override: {
        mustNotHaveValue: true,
        onTagged(doclet) {
            doclet.override = true;
        }
    },
    package: {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.access = 'package';

            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
            }
        }
    },
    param: cloneTagDef(baseTags.param),
    // Closure Compiler only
    polymer: {
        onTagged: ignore
    },
    // Closure Compiler only
    polymerBehavior: {
        onTagged: ignore
    },
    // Closure Compiler only
    preserve: cloneTagDef(baseTags.license),
    private: {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.access = 'private';

            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
            }
        }
    },
    protected: {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.access = 'protected';

            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
            }
        }
    },
    public: {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.access = 'public';

            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
            }
        }
    },
    return: cloneTagDef(baseTags.returns),
    // Closure Compiler only
    struct: {
        onTagged: ignore
    },
    // Closure Compiler only
    suppress: {
        onTagged: ignore
    },
    // Closure Compiler only
    template: {
        onTagged: ignore
    },
    'this': {
        canHaveType: true,
        onTagged(doclet, tag) {
            doclet.this = combineTypes(tag);
        }
    },
    throws: cloneTagDef(baseTags.throws),
    type: cloneTagDef(baseTags.type, {
        mustNotHaveDescription: false
    }),
    typedef: {
        canHaveType: true,
        onTagged(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        }
    },
    // Closure Compiler only
    unrestricted: {
        onTagged: ignore
    }
};

function addTagDefinitions(dictionary, tagDefs) {
    Object.keys(tagDefs).forEach(tagName => {
        let tagDef;

        tagDef = tagDefs[tagName];
        dictionary.defineTag(tagName, tagDef);

        if (tagDef.synonyms) {
            tagDef.synonyms.forEach(synonym => {
                dictionary.defineSynonym(tagName, synonym);
            });
        }
    });
}

/**
 * Populate the given dictionary with the appropriate JSDoc tag definitions.
 *
 * If the `tagDefinitions` parameter is omitted, JSDoc uses its configuration settings to decide
 * which tags to add to the dictionary.
 *
 * If the `tagDefinitions` parameter is included, JSDoc adds only the tag definitions from the
 * `tagDefinitions` object. The configuration settings are ignored.
 *
 * @param {module:jsdoc/tag/dictionary} dictionary
 * @param {Object} [tagDefinitions] - A dictionary whose values define the rules for a JSDoc tag.
 */
exports.defineTags = (dictionary, tagDefinitions) => {
    let dictionaries;

    if (!tagDefinitions) {
        dictionaries = jsdoc.env.conf.tags.dictionaries;

        if (!dictionaries) {
            jsdoc.util.logger.error('The configuration setting "tags.dictionaries" is undefined. ' +
                'Unable to load tag definitions.');

            return;
        }
        else {
            dictionaries = dictionaries.slice(0).reverse();
        }

        dictionaries.forEach(dictName => {
            const tagDefs = exports[DEFINITIONS[dictName]];

            if (!tagDefs) {
                jsdoc.util.logger.error('The configuration setting "tags.dictionaries" contains ' +
                    'the unknown dictionary name %s. Ignoring the dictionary.', dictName);

                return;
            }

            addTagDefinitions(dictionary, _.extend(tagDefs, internalTags));
        });
    }
    else {
        addTagDefinitions(dictionary, _.extend(tagDefinitions, internalTags));
    }
};
