/**
    @module jsdoc/tag/type

    @author Michael Mathews <micmath@gmail.com>
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

function getTagType(tagValue) {
    var type = '',
        text = '',
        count = 0;

    // type expressions start with '{'
    if (tagValue[0] === '{') {
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
    return { type: type, text: text };
}
exports.getTagType = getTagType;


/**
    @param {string} tagValue
    @returns {object} Hash with type, text, optional, nullable, and variable properties
 */
exports.parse = function(tagValue) {
    if (typeof tagValue !== 'string') { tagValue = ''; }
    var type = '',
        text = '',
        tagType,
        optional,
        nullable,
        variable;
    
    tagType = getTagType(tagValue);
    type = tagType.type;
    if (tagType.type === '') {
        text = tagValue;
    } else {
        text = tagType.text;
    }
    
    optional = parseOptional(type);
    nullable = parseNullable(type);
    variable = parseVariable(type);
    type = variable.type || nullable.type || optional.type;

    type = parseTypes(type); // make it into an array

    return {
        type: type,
        text: text,
        optional: optional.optional,
        nullable: nullable.nullable,
        variable: variable.variable
    };
};
