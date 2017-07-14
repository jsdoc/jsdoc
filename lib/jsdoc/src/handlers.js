/**
 * @module jsdoc/src/handlers
 */
'use strict';

var escape = require('escape-string-regexp');
var jsdoc = {
    doclet: require('jsdoc/doclet'),
    name: require('jsdoc/name'),
    src: {
        syntax: require('jsdoc/src/syntax')
    },
    util: {
        logger: require('jsdoc/util/logger')
    }
};
var util = require('util');

var currentModule = null;
var SCOPE_NAMES = jsdoc.name.SCOPE.NAMES;
var SCOPE_PUNC = jsdoc.name.SCOPE.PUNC;
var Syntax = jsdoc.src.syntax.Syntax;

function CurrentModule(doclet) {
    this.doclet = doclet;
    this.longname = doclet.longname;
    this.originalName = doclet.meta.code.name || '';
}

function filterByLongname(doclet) {
    // you can't document prototypes
    if ( /#$/.test(doclet.longname) ) {
        return true;
    }

    return false;
}

function createDoclet(comment, e) {
    var doclet;
    var err;

    try {
        doclet = new jsdoc.doclet.Doclet(comment, e);
    }
    catch (error) {
        err = new Error( util.format('cannot create a doclet for the comment "%s": %s',
            comment.replace(/[\r\n]/g, ''), error.message) );
        jsdoc.util.logger.error(err);
        doclet = new jsdoc.doclet.Doclet('', e);
    }

    return doclet;
}

/**
 * Create a doclet for a `symbolFound` event. The doclet represents an actual symbol that is defined
 * in the code.
 *
 * Here's why this function is useful. A JSDoc comment can define a symbol name by including:
 *
 * + A `@name` tag
 * + Another tag that accepts a name, such as `@function`
 *
 * When the JSDoc comment defines a symbol name, we treat it as a "virtual comment" for a symbol
 * that isn't actually present in the code. And if a virtual comment is attached to a symbol, it's
 * possible that the comment and symbol have nothing to do with one another.
 *
 * To handle this case, this function checks the new doclet to see if we've already added a name
 * property by parsing the JSDoc comment. If so, this method creates a replacement doclet that
 * ignores the attached JSDoc comment and only looks at the code.
 *
 * @private
 */
function createSymbolDoclet(comment, e) {
    var doclet = createDoclet(comment, e);

    if (doclet.name) {
        // try again, without the comment
        e.comment = '@undocumented';
        doclet = createDoclet(e.comment, e);
    }

    return doclet;
}

function setCurrentModule(doclet) {
    if (doclet.kind === 'module') {
        currentModule = new CurrentModule(doclet);
    }
}

function setModuleScopeMemberOf(parser, doclet) {
    var parentDoclet;
    var skipMemberof;

    // handle module symbols that are _not_ assigned to module.exports
    if (currentModule && currentModule.longname !== doclet.name) {
        if (!doclet.scope) {
            // is this a method definition? if so, we usually get the scope from the node directly
            if (doclet.meta && doclet.meta.code && doclet.meta.code.node &&
                doclet.meta.code.node.type === Syntax.MethodDefinition) {
                // special case for constructors of classes that have @alias tags
                if (doclet.meta.code.node.kind === 'constructor') {
                    parentDoclet = parser._getDocletById(
                        doclet.meta.code.node.parent.parent.nodeId
                    );

                    if (parentDoclet && parentDoclet.alias) {
                        // the constructor should use the same name as the class
                        doclet.addTag('alias', parentDoclet.alias);
                        doclet.addTag('name', parentDoclet.alias);

                        // and we shouldn't try to set a memberof value
                        skipMemberof = true;
                    }
                }
                else if (doclet.meta.code.node.static) {
                    doclet.addTag('static');
                }
                else {
                    doclet.addTag('instance');
                }
            }
            // is this something that the module exports? if so, it's a static member
            else if (doclet.meta && doclet.meta.code && doclet.meta.code.node &&
                doclet.meta.code.node.parent &&
                doclet.meta.code.node.parent.type === Syntax.ExportNamedDeclaration) {
                doclet.addTag('static');
            }
            // otherwise, it must be an inner member
            else {
                doclet.addTag('inner');
            }
        }

        // if the doclet isn't a memberof anything yet, and it's not a global, it must be a memberof
        // the current module (unless we were told to skip adding memberof)
        if (!doclet.memberof && doclet.scope !== SCOPE_NAMES.GLOBAL && !skipMemberof) {
            doclet.addTag('memberof', currentModule.longname);
        }
    }
}

function setDefaultScope(doclet) {
    // module doclets don't get a default scope
    if (!doclet.scope && doclet.kind !== 'module') {
        doclet.setScope(SCOPE_NAMES.GLOBAL);
    }
}

function addDoclet(parser, newDoclet) {
    var e;

    if (newDoclet) {
        setCurrentModule(newDoclet);
        e = { doclet: newDoclet };
        parser.emit('newDoclet', e);

        if ( !e.defaultPrevented && !filterByLongname(e.doclet) ) {
            parser.addResult(e.doclet);
        }
    }
}

function processAlias(parser, doclet, astNode) {
    var memberofName;

    if (doclet.alias === '{@thisClass}') {
        memberofName = parser.resolveThis(astNode);

        // "class" refers to the owner of the prototype, not the prototype itself
        if ( /^(.+?)(\.prototype|#)$/.test(memberofName) ) {
            memberofName = RegExp.$1;
        }
        doclet.alias = memberofName;
    }

    doclet.addTag('name', doclet.alias);
    doclet.postProcess();
}

// TODO: separate code that resolves `this` from code that resolves the module object
function findSymbolMemberof(parser, doclet, astNode, nameStartsWith, trailingPunc) {
    var memberof = '';
    var nameAndPunc;
    var scopePunc = '';

    // handle computed properties like foo['bar']
    if (trailingPunc === '[') {
        // we don't know yet whether the symbol is a static or instance member
        trailingPunc = null;
    }

    nameAndPunc = nameStartsWith + (trailingPunc || '');

    // remove stuff that indicates module membership (but don't touch the name `module.exports`,
    // which identifies the module object itself)
    if (doclet.name !== 'module.exports') {
        doclet.name = doclet.name.replace(nameAndPunc, '');
    }

    // like `bar` in:
    //   exports.bar = 1;
    //   module.exports.bar = 1;
    //   module.exports = MyModuleObject; MyModuleObject.bar = 1;
    if (nameStartsWith !== 'this' && currentModule && doclet.name !== 'module.exports') {
        memberof = currentModule.longname;
        scopePunc = SCOPE_PUNC.STATIC;
    }
    // like: module.exports = 1;
    else if (doclet.name === 'module.exports' && currentModule) {
        doclet.addTag('name', currentModule.longname);
        doclet.postProcess();
    }
    else {
        memberof = parser.resolveThis(astNode);

        // like the following at the top level of a module:
        //   this.foo = 1;
        if (nameStartsWith === 'this' && currentModule && !memberof) {
            memberof = currentModule.longname;
            scopePunc = SCOPE_PUNC.STATIC;
        }
        else {
            scopePunc = SCOPE_PUNC.INSTANCE;
        }
    }

    return {
        memberof: memberof,
        scopePunc: scopePunc
    };
}

function addSymbolMemberof(parser, doclet, astNode) {
    var basename;
    var memberof;
    var memberofInfo;
    var moduleOriginalName = '';
    var resolveTargetRegExp;
    var scopePunc;
    var unresolved;

    if (!astNode) {
        return;
    }

    // check to see if the doclet name is an unresolved reference to the module object, or to `this`
    // TODO: handle cases where the module object is shadowed in the current scope
    if (currentModule) {
        moduleOriginalName = '|' + currentModule.originalName;
    }
    resolveTargetRegExp = new RegExp('^((?:module.)?exports|this' + moduleOriginalName +
        ')(\\.|\\[|$)');
    unresolved = resolveTargetRegExp.exec(doclet.name);

    if (unresolved) {
        memberofInfo = findSymbolMemberof(parser, doclet, astNode, unresolved[1], unresolved[2]);
        memberof = memberofInfo.memberof;
        scopePunc = memberofInfo.scopePunc;

        if (memberof) {
            doclet.name = doclet.name ?
                memberof + scopePunc + doclet.name :
                memberof;
        }
    }
    else {
        memberofInfo = parser.astnodeToMemberof(astNode);
        basename = memberofInfo.basename;
        memberof = memberofInfo.memberof;
    }

    // if we found a memberof name, apply it to the doclet
    if (memberof) {
        doclet.addTag('memberof', memberof);
        if (basename) {
            doclet.name = (doclet.name || '')
                .replace(new RegExp('^' + escape(basename) + '.'), '');
        }
    }
    // otherwise, add the defaults for a module (if we're currently in a module)
    else {
        setModuleScopeMemberOf(parser, doclet);
    }
}

function newSymbolDoclet(parser, docletSrc, e) {
    var newDoclet = createSymbolDoclet(docletSrc, e);

    // if there's an alias, use that as the symbol name
    if (newDoclet.alias) {
        processAlias(parser, newDoclet, e.astnode);
    }
    // otherwise, get the symbol name from the code
    else if (e.code && typeof e.code.name !== 'undefined' && e.code.name !== '') {
        newDoclet.addTag('name', e.code.name);
        if (!newDoclet.memberof) {
            addSymbolMemberof(parser, newDoclet, e.astnode);
        }

        newDoclet.postProcess();
    }
    else {
        return false;
    }

    // set the scope to global unless any of the following are true:
    // a) the doclet is a memberof something
    // b) the doclet represents a module
    // c) we're in a module that exports only this symbol
    if ( !newDoclet.memberof && newDoclet.kind !== 'module' &&
        (!currentModule || currentModule.longname !== newDoclet.name) ) {
        newDoclet.scope = SCOPE_NAMES.GLOBAL;
    }

    // handle cases where the doclet kind is auto-detected from the node type
    if (e.code.kind && newDoclet.kind === 'member') {
        newDoclet.kind = e.code.kind;
    }

    addDoclet(parser, newDoclet);
    e.doclet = newDoclet;

    return true;
}

/**
 * Attach these event handlers to a particular instance of a parser.
 * @param parser
 */
exports.attachTo = function(parser) {
    // Handle JSDoc "virtual comments" that include one of the following:
    // + A `@name` tag
    // + Another tag that accepts a name, such as `@function`
    parser.on('jsdocCommentFound', function(e) {
        var comments = e.comment.split(/@also\b/g);
        var newDoclet;

        for (var i = 0, l = comments.length; i < l; i++) {
            newDoclet = createDoclet(comments[i], e);

            // we're only interested in virtual comments here
            if (!newDoclet.name) {
                continue;
            }

            // add the default scope/memberof for a module (if we're in a module)
            setModuleScopeMemberOf(parser, newDoclet);
            newDoclet.postProcess();

            // if we _still_ don't have a scope, use the default
            setDefaultScope(newDoclet);

            addDoclet(parser, newDoclet);

            e.doclet = newDoclet;
        }
    });

    // Handle named symbols in the code. May or may not have a JSDoc comment attached.
    parser.on('symbolFound', function(e) {
        var comments = e.comment.split(/@also\b/g);

        for (var i = 0, l = comments.length; i < l; i++) {
            newSymbolDoclet(parser, comments[i], e);
        }
    });

    parser.on('fileComplete', function() {
        currentModule = null;
    });
};
