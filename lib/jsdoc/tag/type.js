/**
    @module jsdoc/tag/type

    @author Michael Mathews <micmath@gmail.com>
    @author Jeff Williams <jeffrey.l.williams@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

function parseTypes(type) {
    var types = [];

    if ( type.indexOf('|') !== -1 ) {
        // remove optional parens, like: { ( string | number ) }
        // see: http://code.google.com/closure/compiler/docs/js-for-compiler.html#types
        if ( /^\s*\(\s*(.+)\s*\)\s*$/.test(type) ) {
            type = RegExp.$1;
        }
        types = type.split(/\s*\|\s*/g);
    }
    else if (type) {
        types = [type];
    }

    return types;
}

/** @private */
function trim(text) {
    return text.trim();
}

var getTagInfo = exports.getTagInfo = function(tagValue, canHaveName, canHaveType) {
    var name = '',
        type = '',
        text = tagValue,
        count = 0;

    // type expressions start with '{'
    if (canHaveType && tagValue[0] === '{') {
        count++;

        // find matching closer '}'
        for (var i = 1, leni = tagValue.length; i < leni; i++) {
            if (tagValue[i] === '\\') { i++; continue; } // backslash escapes the next character

            if (tagValue[i] === '{') { count++; }
            else if (tagValue[i] === '}') { count--; }

            if (count === 0) {
                type = trim(tagValue.slice(1, i))
                       .replace(/\\\{/g, '{') // unescape escaped curly braces
                       .replace(/\\\}/g, '}');
                text = trim(tagValue.slice(i+1));
                break;
            }
        }
    }
    
    if (canHaveName) {
        // like: name, [name], name text, [name] text, name - text, or [name] - text
        text.match(/^(\[[^\]]+\]|\S+)((?:\s*\-\s*|\s+)(\S[\s\S]*))?$/);
        name = RegExp.$1;
        text = RegExp.$3;
    }
    
    return { name: name, type: type, text: text };
};


/**
    @param {string} tagValue
    @param {boolean} canHaveName
    @param {boolean} canHaveType
    @returns {object} Hash with name, type, text, optional, nullable, variable, and defaultvalue properties
 */
exports.parse = function(tagValue, canHaveName, canHaveType) {
    if (typeof tagValue !== 'string') { tagValue = ''; }
    
    var tagInfo = getTagInfo(tagValue, canHaveName, canHaveType);
    
    // extract JSDoc-style type info, then Closure Compiler-style type info
    tagInfo = require('jsdoc/tag/type/jsdocType').parse(tagInfo);
    tagInfo = require('jsdoc/tag/type/closureCompilerType').parse(tagInfo);

    return {
        name: tagInfo.name,
        type: parseTypes(tagInfo.type), // make it into an array
        text: tagInfo.text,
        optional: tagInfo.optional,
        nullable: tagInfo.nullable,
        variable: tagInfo.variable,
        defaultvalue: tagInfo.defaultvalue
    };
};
