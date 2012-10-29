/**
    @module jsdoc/tag/type/closureCompilerType

    @author Michael Mathews <micmath@gmail.com>
    @author Jeff Williams <jeffrey.l.williams@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

function parseOptional(type) {
    var optional = null;

    // {sometype=} means optional
    if ( /(.+)=$/.test(type) ) {
        type = RegExp.$1;
        optional = true;
    }

    return { type: type, optional: optional };
}

function parseNullable(type) {
    var nullable = null;

    // {?sometype} means nullable, {!sometype} means not-nullable
    if ( /^([\?\!])(.+)$/.test(type) ) {
        type = RegExp.$2;
        nullable = (RegExp.$1 === '?')? true : false;
    }

    return { type: type, nullable: nullable };
}

function parseVariable(type) {
    var variable = null;

    // {...sometype} means variable number of that type
    if ( /^(\.\.\.)(.+)$/.test(type) ) {
        type = RegExp.$2;
        variable = true;
    }

    return { type: type, variable: variable };
}

/**
    Extract Closure Compiler-style type information from the tag info.
    @param {object} tagInfo Hash with name, type, and text properties.
    @return {object} Hash with name, type, text, optional, nullable, variable, and default properties.
 */
exports.parse = function(tagInfo) {
    var optional = parseOptional(tagInfo.type),
        nullable = parseNullable(optional.type),
        variable = parseVariable(nullable.type);

    return {
        name: tagInfo.name,
        type: variable.type,
        text: tagInfo.text,
        optional: tagInfo.optional || optional.optional, // don't override if already true
        nullable: nullable.nullable,
        variable: variable.variable,
        defaultvalue: tagInfo.defaultvalue
    };
};
