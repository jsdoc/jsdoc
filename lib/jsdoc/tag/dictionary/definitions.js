/**
 * Define tags that are known in JSDoc.
 * @module jsdoc/tag/dictionary/definitions
 */
'use strict';

var _ = require('underscore');
var jsdoc = {
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
var path = require('jsdoc/path');
var Syntax = require('jsdoc/src/syntax').Syntax;

var hasOwnProp = Object.prototype.hasOwnProperty;

var DEFINITIONS = {
    closure: 'closureTags',
    jsdoc: 'jsdocTags'
};
var MODULE_NAMESPACE = 'module:';

// Clone a tag definition, excluding synonyms.
function cloneTagDef(tagDef, extras) {
    var newTagDef = jsdoc.util.doop(tagDef);

    delete newTagDef.synonyms;

    return (extras ? _.extend(newTagDef, extras) : newTagDef);
}

function getSourcePaths() {
    var sourcePaths = jsdoc.env.sourceFiles.slice(0) || [];

    if (jsdoc.env.opts._) {
        jsdoc.env.opts._.forEach(function(sourcePath) {
            var resolved = path.resolve(jsdoc.env.pwd, sourcePath);

            if (sourcePaths.indexOf(resolved) === -1) {
                sourcePaths.push(resolved);
            }
        });
    }

    return sourcePaths;
}

function filepathMinusPrefix(filepath) {
    var sourcePaths = getSourcePaths();
    var commonPrefix = path.commonPrefix(sourcePaths);
    var result = '';

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
function setDocletKindToTitle(doclet, tag) {
    doclet.addTag( 'kind', tag.title );
}

function setDocletScopeToTitle(doclet, tag) {
    try {
        doclet.setScope(tag.title);
    }
    catch (e) {
        jsdoc.util.logger.error(e.message);
    }
}

function setDocletNameToValue(doclet, tag) {
    if (tag.value && tag.value.description) { // as in a long tag
        doclet.addTag('name', tag.value.description);
    }
    else if (tag.text) { // or a short tag
        doclet.addTag('name', tag.text);
    }
}

function setDocletNameToValueName(doclet, tag) {
    if (tag.value && tag.value.name) {
        doclet.addTag('name', tag.value.name);
    }
}

function setDocletDescriptionToValue(doclet, tag) {
    if (tag.value) {
        doclet.addTag('description', tag.value);
    }
}

function setDocletTypeToValueType(doclet, tag) {
    if (tag.value && tag.value.type) {
        // Add the type names and other type properties (such as `optional`).
        // Don't overwrite existing properties.
        Object.keys(tag.value).forEach(function(prop) {
            if ( !hasOwnProp.call(doclet, prop) ) {
                doclet[prop] = tag.value[prop];
            }
        });
    }
}

function setNameToFile(doclet) {
    var name;

    if (doclet.meta.filename) {
        name = filepathMinusPrefix(doclet.meta.path) + doclet.meta.filename;
        doclet.addTag('name', name);
    }
}

function setDocletMemberof(doclet, tag) {
    if (tag.value && tag.value !== '<global>') {
        doclet.setMemberof(tag.value);
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
    var name = '';

    if (doclet.meta.path) {
        name = filepathMinusPrefix(doclet.meta.path);
    }
    name += doclet.meta.filename.replace(/\.js$/i, '');

    doclet.name = name;
}

function parseTypeText(text) {
    var tagType = jsdoc.tag.type.parse(text, false, true);

    return tagType.typeExpression || text;
}

function parseBorrows(doclet, tag) {
    var m = /^([\s\S]+?)(?:\s+as\s+([\s\S]+))?$/.exec(tag.text);

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
    var m = /^(\S+)/.exec(string);

    if (m) {
        return m[1];
    }
    else {
        return '';
    }
}

function combineTypes(tag) {
    var combined;

    if (tag.value && tag.value.type) {
        if (tag.value.type.names.length === 1) {
            combined = tag.value.type.names[0];
        }
        else {
            combined = '(' + tag.value.type.names.join('|') + ')';
        }
    }

    return combined;
}

// Tags that JSDoc uses internally, and that must always be defined.
var internalTags = {
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
        onTagged: function() {
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
        onTagged: function(doclet) {
            doclet.undocumented = true;
            doclet.comment = '';
        }
    }
};


// Core JSDoc tags that are shared with other tag dictionaries.
var baseTags = exports.baseTags = {
    abstract: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            // we call this `virtual` because `abstract` is a reserved word
            doclet.virtual = true;
        },
        synonyms: ['virtual']
    },
    access: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            // only valid values are package, private, protected and public
            if ( /^(package|private|protected|public)$/i.test(tag.value) ) {
                doclet.access = tag.value.toLowerCase();
            }
            else {
                delete doclet.access;
            }
        }
    },
    alias: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.alias = tag.value;
        }
    },
    async: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.async = true;
        }
    },
    augments: {
        mustHaveValue: true,
        // Allow augments value to be specified as a normal type, e.g. {Type}
        onTagText: parseTypeText,
        onTagged: function(doclet, tag) {
            doclet.augment( firstWordOf(tag.value) );
        },
        synonyms: ['extends']
    },
    author: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.author = doclet.author || [];
            doclet.author.push(tag.value);
        }
    },
    // this symbol has a member that should use the same docs as another symbol
    borrows: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            var borrows = parseBorrows(doclet, tag);

            doclet.borrow(borrows.target, borrows.source);
        }
    },
    class: {
        onTagged: function(doclet, tag) {
            var looksLikeDesc;

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
        onTagged: function(doclet, tag) {
            doclet.classdesc = tag.value;
        }
    },
    constant: {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValueName(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        },
        synonyms: ['const']
    },
    constructs: {
        onTagged: function(doclet, tag) {
            var ownerClassName;

            if (!tag.value) {
                // this can be resolved later in the handlers
                ownerClassName = '{@thisClass}';
            }
            else {
                ownerClassName = firstWordOf(tag.value);
            }
            doclet.addTag('alias', ownerClassName);
            doclet.addTag('kind', 'class');
        }
    },
    copyright: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.copyright = tag.value;
        }
    },
    default: {
        onTagged: function(doclet, tag) {
            var nodeToValue = jsdoc.src.astnode.nodeToValue;

            if (tag.value) {
                doclet.defaultvalue = tag.value;
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
        onTagged: function(doclet, tag) {
            doclet.deprecated = tag.value || true;
        }
    },
    enum: {
        canHaveType: true,
        onTagged: function(doclet, tag) {
            doclet.kind = doclet.kind || 'member';
            doclet.isEnum = true;
            setDocletTypeToValueType(doclet, tag);
        }
    },
    event: {
        isNamespace: true,
        onTagged: function(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
        }
    },
    example: {
        keepsWhitespace: true,
        removesIndent: true,
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.examples = doclet.examples || [];
            doclet.examples.push(tag.value);
        }
    },
    exports: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            var modName = firstWordOf(tag.value);

            // in case the user wrote something like `/** @exports module:foo */`:
            doclet.addTag( 'alias', stripModuleNamespace(modName) );
            doclet.addTag('kind', 'module');
        }
    },
    external: {
        canHaveType: true,
        isNamespace: true,
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
            setNameToFile(doclet);
            setDocletKindToTitle(doclet, tag);
            setDocletDescriptionToValue(doclet, tag);

            doclet.preserveName = true;
        },
        synonyms: ['fileoverview', 'overview']
    },
    fires: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.fires = doclet.fires || [];
            applyNamespace('event', tag);
            doclet.fires.push(tag.value);
        },
        synonyms: ['emits']
    },
    function: {
        onTagged: function(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
        },
        synonyms: ['func', 'method']
    },
    generator: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.generator = true;
        }
    },
    global: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.scope = jsdoc.name.SCOPE.NAMES.GLOBAL;
            delete doclet.memberof;
        }
    },
    hideconstructor: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.hideconstructor = true;
        }
    },
    ignore: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.ignore = true;
        }
    },
    implements: {
        mustHaveValue: true,
        onTagText: parseTypeText,
        onTagged: function(doclet, tag) {
            doclet.implements = doclet.implements || [];
            doclet.implements.push(tag.value);
        }
    },
    inheritdoc: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            // use an empty string so JSDoc can support `@inheritdoc Foo#bar` in the future
            doclet.inheritdoc = '';
        }
    },
    inner: {
        onTagged: function(doclet, tag) {
            setDocletScopeToTitle(doclet, tag);
        }
    },
    instance: {
        onTagged: function(doclet, tag) {
            setDocletScopeToTitle(doclet, tag);
        }
    },
    interface: {
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.addTag('kind', 'interface');
            if (tag.value) {
                setDocletNameToValueName(doclet, tag);
            }
        }
    },
    lends: {
        onTagged: function(doclet, tag) {
            doclet.alias = tag.value || jsdoc.name.LONGNAMES.GLOBAL;
            doclet.addTag('undocumented');
        }
    },
    license: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.license = tag.value;
        }
    },
    listens: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.listens = doclet.listens || [];
            applyNamespace('event', tag);
            doclet.listens.push(tag.value);
        }
    },
    member: {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValueName(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        },
        synonyms: ['var']
    },
    memberof: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
            var source = firstWordOf(tag.value);

            doclet.mix(source);
        }
    },
    mixin: {
        onTagged: function(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
        }
    },
    modifies: {
        canHaveType: true,
        onTagged: function(doclet, tag) {
            doclet.modifies = doclet.modifies || [];
            doclet.modifies.push(tag.value);
        }
    },
    module: {
        canHaveType: true,
        isNamespace: true,
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
            setDocletKindToTitle(doclet, tag);
            setDocletNameToValue(doclet, tag);
            setDocletTypeToValueType(doclet, tag);
        }
    },
    package: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.access = 'package';
        }
    },
    param: {
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.params = doclet.params || [];
            doclet.params.push(tag.value || {});
        },
        synonyms: ['arg', 'argument']
    },
    private: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.access = 'private';
        }
    },
    property: {
        mustHaveValue: true,
        canHaveType: true,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.properties = doclet.properties || [];
            doclet.properties.push(tag.value);
        },
        synonyms: ['prop']
    },
    protected: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.access = 'protected';
        }
    },
    public: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.access = 'public';
        }
    },
    readonly: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.readonly = true;
        }
    },
    requires: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            var requiresName;

            // inline link tags are passed through as-is so that `@requires {@link foo}` works
            if ( jsdoc.tag.inline.isInlineTag(tag.value, 'link\\S*') ) {
                requiresName = tag.value;
            }
            // otherwise, assume it's a module
            else {
                requiresName = firstWordOf(tag.value);
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
        onTagged: function(doclet, tag) {
            doclet.returns = doclet.returns || [];
            doclet.returns.push(tag.value);
        },
        synonyms: ['return']
    },
    see: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.see = doclet.see || [];
            doclet.see.push(tag.value);
        }
    },
    since: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.since = tag.value;
        }
    },
    static: {
        onTagged: function(doclet, tag) {
            setDocletScopeToTitle(doclet, tag);
        }
    },
    summary: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.summary = tag.value;
        }
    },
    'this': {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.this = firstWordOf(tag.value);
        }
    },
    todo: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.todo = doclet.todo || [];
            doclet.todo.push(tag.value);
        }
    },
    throws: {
        mustHaveValue: true,
        canHaveType: true,
        onTagged: function(doclet, tag) {
            doclet.exceptions = doclet.exceptions || [];
            doclet.exceptions.push(tag.value);
        },
        synonyms: ['exception']
    },
    tutorial: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.tutorials = doclet.tutorials || [];
            doclet.tutorials.push(tag.value);
        }
    },
    type: {
        mustHaveValue: true,
        mustNotHaveDescription: true,
        canHaveType: true,
        onTagText: function(text) {
            var closeIdx;
            var openIdx;

            var OPEN_BRACE = '{';
            var CLOSE_BRACE = '}';

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
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
            var value = tag.value;

            if ( /^\((.+)\)$/.test(value) ) {
                value = RegExp.$1;
            }

            doclet.variation = value;
        }
    },
    version: {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            doclet.version = tag.value;
        }
    },
    yields: {
        mustHaveValue: true,
        canHaveType: true,
        onTagged: function(doclet, tag) {
            doclet.yields = doclet.yields || [];
            doclet.yields.push(tag.value);
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
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet) {
            doclet.modifies = [];
        }
    },
    // Closure Compiler only
    override: {
        mustNotHaveValue: true,
        onTagged: function(doclet) {
            doclet.override = true;
        }
    },
    package: {
        canHaveType: true,
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
            doclet.access = 'private';

            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
            }
        }
    },
    protected: {
        canHaveType: true,
        onTagged: function(doclet, tag) {
            doclet.access = 'protected';

            if (tag.value && tag.value.type) {
                setDocletTypeToValueType(doclet, tag);
            }
        }
    },
    public: {
        canHaveType: true,
        onTagged: function(doclet, tag) {
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
        onTagged: function(doclet, tag) {
            doclet.this = combineTypes(tag);
        }
    },
    throws: cloneTagDef(baseTags.throws),
    type: cloneTagDef(baseTags.type, {
        mustNotHaveDescription: false
    }),
    typedef: {
        canHaveType: true,
        onTagged: function(doclet, tag) {
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
    Object.keys(tagDefs).forEach(function(tagName) {
        var tagDef;

        tagDef = tagDefs[tagName];
        dictionary.defineTag(tagName, tagDef);

        if (tagDef.synonyms) {
            tagDef.synonyms.forEach(function(synonym) {
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
exports.defineTags = function(dictionary, tagDefinitions) {
    var dictionaries;

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

        dictionaries.forEach(function(dictName) {
            var tagDefs = exports[DEFINITIONS[dictName]];

            if (tagDefs) {
                addTagDefinitions(dictionary, _.extend(tagDefs, internalTags));
            }
            else{
                addTagDefinitions(dictionary, internalTags);
            }
            
        });
    }
    else {
        addTagDefinitions(dictionary, _.extend(tagDefinitions, internalTags));
    }
};
