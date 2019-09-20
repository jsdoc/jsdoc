/**
 * Schema for validating JSDoc doclets.
 * @module jsdoc/schema
 * @see <https://trac.tools.ietf.org/html/draft-wright-json-schema-validation-01>
 */
// JSON schema types
const ARRAY = 'array';
const BOOLEAN = 'boolean';
const NULL = 'null';
const NUMBER = 'number';
const OBJECT = 'object';
const STRING = 'string';

const BOOLEAN_OPTIONAL = [BOOLEAN, NULL];
const STRING_OPTIONAL = [STRING, NULL];

const EVENT_REGEXP = 'event:[\\S]+';
const PACKAGE_REGEXP = 'package:[\\S]+';

const STRING_SCHEMA = {
    type: STRING
};

// information about the code associated with a doclet
const META_SCHEMA = exports.META_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        code: {
            type: OBJECT,
            additionalProperties: false,
            properties: {
                funcscope: {
                    type: STRING
                },
                id: {
                    type: STRING
                },
                name: {},
                node: {
                    type: OBJECT
                },
                paramnames: {
                    type: ARRAY,
                    uniqueItems: true,
                    items: {
                        type: STRING
                    }
                },
                type: {
                    type: STRING
                },
                value: {}
            }
        },
        columnno: {
            title: 'The column number of the code associated with this doclet.',
            type: NUMBER
        },
        filename: {
            title: 'The name of the file that contains the code associated with this doclet.',
            type: STRING
        },
        lineno: {
            title: 'The line number of the code associated with this doclet.',
            type: NUMBER
        },
        path: {
            title: 'The path in which the code associated with this doclet is located.',
            type: STRING
        },
        range: {
            title: 'The positions of the first and last characters of the code associated with ' +
                'this doclet.',
            type: ARRAY,
            minItems: 2,
            maxItems: 2,
            items: {
                type: NUMBER
            }
        },
        vars: {
            type: OBJECT
        }
    }
};

// type property containing type names
const TYPE_PROPERTY_SCHEMA = exports.TYPE_PROPERTY_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        names: {
            type: ARRAY,
            minItems: 1,
            items: {
                type: STRING
            }
        },
        // type parser output
        parsedType: {
            type: OBJECT,
            additionalProperties: true
        }
    }
};

// enumeration properties
const ENUM_PROPERTY_SCHEMA = exports.ENUM_PROPERTY_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        comment: {
            type: STRING
        },
        defaultvalue: {},
        description: {
            type: STRING_OPTIONAL
        },
        kind: {
            type: STRING,
            enum: ['member']
        },
        longname: {
            type: STRING
        },
        memberof: {
            type: STRING
        },
        meta: META_SCHEMA,
        name: {
            type: STRING
        },
        // is this member nullable? (derived from the type expression)
        nullable: {
            type: BOOLEAN_OPTIONAL
        },
        // is this member optional? (derived from the type expression)
        optional: {
            type: BOOLEAN_OPTIONAL
        },
        scope: {
            type: STRING,
            enum: ['static']
        },
        type: TYPE_PROPERTY_SCHEMA,
        // can this member be provided more than once? (derived from the type expression)
        variable: {
            type: BOOLEAN_OPTIONAL
        }
    }
};

// function parameter, or object property defined with @property tag
const PARAM_SCHEMA = exports.PARAM_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        // what is the default value for this parameter?
        defaultvalue: {},
        // a description of the parameter
        description: {
            type: STRING_OPTIONAL
        },
        // what name does this parameter have within the function?
        name: {
            type: STRING
        },
        // can the value for this parameter be null?
        nullable: {
            type: BOOLEAN_OPTIONAL
        },
        // is a value for this parameter optional?
        optional: {
            type: BOOLEAN_OPTIONAL
        },
        // what are the types of value expected for this parameter?
        type: TYPE_PROPERTY_SCHEMA,
        // can this parameter be repeated?
        variable: {
            type: BOOLEAN_OPTIONAL
        }
    }
};

const DOCLET_SCHEMA = exports.DOCLET_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        // what access privileges are allowed
        access: {
            type: STRING,
            enum: [
                'package',
                'private',
                'protected',
                'public'
            ]
        },
        alias: {
            type: STRING
        },
        async: {
            type: BOOLEAN
        },
        augments: {
            type: ARRAY,
            uniqueItems: true,
            items: {
                type: STRING
            }
        },
        author: {
            type: ARRAY,
            items: {
                type: STRING
            }
        },
        borrowed: {
            type: ARRAY,
            uniqueItems: true,
            items: {
                type: OBJECT,
                additionalProperties: false,
                properties: {
                    // name of the target
                    as: {
                        type: STRING
                    },
                    // name of the source
                    from: {
                        type: STRING
                    }
                }
            }
        },
        // a description of the class that this constructor belongs to
        classdesc: {
            type: STRING
        },
        comment: {
            type: STRING
        },
        copyright: {
            type: STRING
        },
        defaultvalue: {},
        defaultvaluetype: {
            type: STRING,
            enum: [OBJECT, ARRAY]
        },
        // is usage of this symbol deprecated?
        deprecated: {
            type: [STRING, BOOLEAN]
        },
        // a description
        description: {
            type: STRING_OPTIONAL
        },
        // something else to consider
        examples: {
            type: ARRAY,
            items: {
                type: STRING
            }
        },
        exceptions: {
            type: ARRAY,
            items: PARAM_SCHEMA
        },
        // the path to another constructor
        extends: {
            type: ARRAY,
            uniqueItems: true,
            items: {
                type: STRING
            }
        },
        // the path to another doc object
        fires: {
            type: ARRAY,
            uniqueItems: true,
            items: {
                type: STRING,
                pattern: EVENT_REGEXP
            }
        },
        forceMemberof: {
            type: BOOLEAN_OPTIONAL
        },
        generator: {
            type: BOOLEAN
        },
        hideconstructor: {
            type: BOOLEAN
        },
        ignore: {
            type: BOOLEAN
        },
        implementations: {
            type: ARRAY,
            items: {
                type: STRING
            }
        },
        implements: {
            type: ARRAY,
            items: {
                type: STRING
            }
        },
        inheritdoc: {
            type: STRING
        },
        inherited: {
            type: BOOLEAN
        },
        inherits: {
            type: STRING,
            dependency: {
                inherited: true
            }
        },
        isEnum: {
            type: BOOLEAN
        },
        // what kind of symbol is this?
        kind: {
            type: STRING,
            enum: [
                'class',
                'constant',
                'event',
                'external',
                'file',
                'function',
                'interface',
                'member',
                'mixin',
                'module',
                'namespace',
                'package',
                'param',
                'typedef'
            ]
        },
        license: {
            type: STRING
        },
        listens: {
            type: ARRAY,
            uniqueItems: true,
            items: {
                type: STRING,
                pattern: EVENT_REGEXP
            }
        },
        longname: {
            type: STRING
        },
        // probably a leading substring of the path
        memberof: {
            type: STRING
        },
        // information about this doc
        meta: META_SCHEMA,
        // was this doclet mixed in?
        mixed: {
            type: BOOLEAN
        },
        mixes: {
            type: ARRAY,
            uniqueItems: true,
            items: {
                type: STRING
            }
        },
        modifies: {
            type: ARRAY,
            uniqueItems: true,
            items: PARAM_SCHEMA
        },
        // probably a trailing substring of the path
        name: {
            type: STRING
        },
        // is this member nullable? (derived from the type expression)
        nullable: {
            type: BOOLEAN_OPTIONAL
        },
        // is this member optional? (derived from the type expression)
        optional: {
            type: BOOLEAN_OPTIONAL
        },
        // does this member explicitly override the parent?
        override: {
            type: BOOLEAN
        },
        overrides: {
            type: STRING
        },
        // are there function parameters associated with this doc?
        params: {
            type: ARRAY,
            uniqueItems: true,
            items: PARAM_SCHEMA
        },
        preserveName: {
            type: BOOLEAN
        },
        properties: {
            type: ARRAY,
            uniqueItems: true,
            minItems: 1,
            items: {
                anyOf: [ENUM_PROPERTY_SCHEMA, PARAM_SCHEMA]
            }
        },
        readonly: {
            type: BOOLEAN
        },
        // the symbol being documented requires another symbol
        requires: {
            type: ARRAY,
            uniqueItems: true,
            minItems: 1,
            items: {
                type: STRING
            }
        },
        returns: {
            type: ARRAY,
            minItems: 1,
            items: PARAM_SCHEMA
        },
        // what sort of parent scope does this symbol have?
        scope: {
            type: STRING,
            enum: [
                'global',
                'inner',
                'instance',
                'static'
            ]
        },
        // something else to consider
        see: {
            type: ARRAY,
            minItems: 1,
            items: {
                type: STRING
            }
        },
        // at what previous version was this doc added?
        since: {
            type: STRING
        },
        summary: {
            type: STRING
        },
        // arbitrary tags associated with this doc
        tags: {
            type: ARRAY,
            minItems: 1,
            items: {
                type: OBJECT,
                additionalProperties: false,
                properties: {
                    originalTitle: {
                        type: STRING
                    },
                    text: {
                        type: STRING
                    },
                    title: {
                        type: STRING
                    },
                    value: {
                        oneOf: [STRING_SCHEMA, PARAM_SCHEMA]
                    }
                }
            }
        },
        'this': {
            type: STRING
        },
        todo: {
            type: ARRAY,
            minItems: 1,
            items: {
                type: STRING
            }
        },
        // extended tutorials
        tutorials: {
            type: ARRAY,
            minItems: 1,
            items: {
                type: STRING
            }
        },
        // what type is the value that this doc is associated with, like `number`
        type: TYPE_PROPERTY_SCHEMA,
        undocumented: {
            type: BOOLEAN
        },
        // can this member be provided more than once? (derived from the type expression)
        variable: {
            type: BOOLEAN_OPTIONAL
        },
        variation: {
            type: STRING
        },
        // what is the version of this doc
        version: {
            type: STRING
        },
        // is a member left to be implemented during inheritance?
        virtual: {
            type: BOOLEAN
        },
        yields: {
            type: ARRAY,
            minItems: 1,
            items: PARAM_SCHEMA
        }
    }
};

const CONTACT_INFO_SCHEMA = exports.CONTACT_INFO_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        email: {
            type: STRING
        },
        name: {
            type: STRING
        },
        url: {
            type: STRING,
            format: 'uri'
        }
    }
};

const BUGS_SCHEMA = exports.BUGS_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        email: {
            type: STRING
        },
        url: {
            type: STRING,
            format: 'uri'
        }
    }
};

const PACKAGE_SCHEMA = exports.PACKAGE_SCHEMA = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        author: {
            anyOf: [STRING_SCHEMA, CONTACT_INFO_SCHEMA]
        },
        bugs: {
            anyOf: [STRING_SCHEMA, BUGS_SCHEMA]
        },
        contributors: {
            type: ARRAY,
            minItems: 0,
            items: {
                anyOf: [STRING_SCHEMA, CONTACT_INFO_SCHEMA]
            }
        },
        dependencies: {
            type: OBJECT
        },
        description: {
            type: STRING
        },
        devDependencies: {
            type: OBJECT
        },
        engines: {
            type: OBJECT
        },
        files: {
            type: ARRAY,
            uniqueItems: true,
            minItems: 0,
            items: {
                type: STRING
            }
        },
        homepage: {
            type: STRING,
            format: 'uri'
        },
        keywords: {
            type: ARRAY,
            minItems: 0,
            items: {
                type: STRING
            }
        },
        kind: {
            type: STRING,
            enum: ['package']
        },
        licenses: {
            type: ARRAY,
            minItems: 1,
            items: {
                type: OBJECT,
                additionalProperties: false,
                properties: {
                    type: {
                        type: STRING
                    },
                    url: {
                        type: STRING,
                        format: 'uri'
                    }
                }
            }
        },
        longname: {
            type: STRING,
            pattern: PACKAGE_REGEXP
        },
        main: {
            type: STRING
        },
        name: {
            type: STRING
        },
        repository: {
            type: OBJECT,
            additionalProperties: false,
            properties: {
                type: {
                    type: STRING
                },
                // we don't use `format: 'uri'` here because repo URLs are atypical
                url: {
                    type: STRING
                }
            }
        },
        version: {
            type: STRING
        }
    }
};

exports.DOCLETS_SCHEMA = {
    type: ARRAY,
    items: {
        anyOf: [DOCLET_SCHEMA, PACKAGE_SCHEMA]
    }
};
