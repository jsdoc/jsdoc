/**
 * @module jsdoc/tag/type
 * 
 * @author Michael Mathews <micmath@gmail.com>
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */


/** @private */
function getTagInfo(tagValue, canHaveName, canHaveType) {
    var extractInlineTag = require('jsdoc/tag/inline').extractInlineTag;

    var name = '';
    var typeExpression = '';
    var text = tagValue;
    var typeAndText;
    var typeOverride;

    if (canHaveType) {
        typeAndText = extractInlineTag(text);
        typeExpression = typeAndText.text || typeExpression;
        text = typeAndText.newString;
    }
    
    if (canHaveName) {
        // like: name, [name], name text, [name] text, name - text, or [name] - text
        text.match(/^(\[[^\]]+\]|\S+)((?:\s*\-\s*|\s+)(\S[\s\S]*))?$/);
        name = RegExp.$1;
        text = RegExp.$3;
    }

    // an inline @type tag, like {@type Foo}, overrides the type expression
    if (canHaveType) {
        typeOverride = extractInlineTag(text, '@type');
        typeExpression = typeOverride.text || typeExpression;
        text = typeOverride.newString;
    }
    
    return {
        name: name,
        typeExpression: typeExpression,
        text: text
    };
}

/**
 * Information provided in a JSDoc tag.
 *
 * @typedef {Object} TagInfo
 * @memberof module:jsdoc/tag/type
 * @property {string} TagInfo.defaultvalue - The default value of the member.
 * @property {string} TagInfo.name - The name of the member (for example, `myParamName`).
 * @property {boolean} TagInfo.nullable - Indicates whether the member can be set to `null` or
 * `undefined`.
 * @property {boolean} TagInfo.optional - Indicates whether the member is optional.
 * @property {string} TagInfo.text - Descriptive text for the member (for example, `The user's email
 * address.`).
 * @property {Array.<string>} TagInfo.type - The type or types that the member can contain (for
 * example, `string` or `MyNamespace.MyClass`).
 * @property {string} TagInfo.typeExpression - The type expression that was parsed to identify the
 * types.
 * @property {boolean} TagInfo.variable - Indicates whether the number of members that are provided
 * can vary (for example, in a function that accepts any number of parameters).
 */

/**
 * Extract JSDoc-style type information from the name specified in the tag info, including the
 * member name; whether the member is optional; and the default value of the member.
 * 
 * @private
 * @param {module:jsdoc/tag/type.TagInfo} tagInfo - Information contained in the tag.
 * @return {module:jsdoc/tag/type.TagInfo} Updated information from the tag.
 */
function parseName(tagInfo) {
    // like '[foo]' or '[ foo ]' or '[foo=bar]' or '[ foo=bar ]' or '[ foo = bar ]'
    if ( /^\[\s*(.+?)\s*\]$/.test(tagInfo.name) ) {
        tagInfo.name = RegExp.$1;
        tagInfo.optional = true;
        
        // like 'foo=bar' or 'foo = bar'
        if ( /^(.+?)\s*=\s*(.+)$/.test(tagInfo.name) ) {
            tagInfo.name = RegExp.$1;
            tagInfo.defaultvalue = RegExp.$2;
        }
    }
    
    return tagInfo;
}

/** @private */
function getTypeStrings(parsedType) {
    var types = [];

    var catharsis = require('catharsis');
    var TYPES = catharsis.Types;
    var util = require('util');

    switch(parsedType.type) {
        case TYPES.AllLiteral:
            types.push('*');
            break;
        case TYPES.FunctionType:
            types.push('function');
            break;
        case TYPES.NameExpression:
            types.push(parsedType.name);
            break;
        case TYPES.NullLiteral:
            types.push('null');
            break;
        case TYPES.RecordType:
            types.push('Object');
            break;
        case TYPES.TypeApplication:
            types.push( catharsis.stringify(parsedType) );
            break;
        case TYPES.TypeUnion:
            parsedType.elements.forEach(function(element) {
                types = types.concat( getTypeStrings(element) );
            });
            break;
        case TYPES.UndefinedLiteral:
            types.push('undefined');
            break;
        case TYPES.UnknownLiteral:
            types.push('?');
            break;
        default:
            // this shouldn't happen
            throw new Error( util.format('unrecognized type %s in parsed type: %j', parsedType.type,
                parsedType) );
    }

    return types;
}

/**
 * Extract JSDoc-style and Closure Compiler-style type information from the type expression
 * specified in the tag info.
 *
 * @private
 * @param {module:jsdoc/tag/type.TagInfo} tagInfo - Information contained in the tag.
 * @return {module:jsdoc/tag/type.TagInfo} Updated information from the tag.
 */
function parseTypeExpression(tagInfo) {
    var catharsis = require('catharsis');
    var util = require('util');

    var errorMessage;
    var parsedType;

    // don't try to parse empty type expressions
    if (!tagInfo.typeExpression) {
        return tagInfo;
    }
    
    try {
        parsedType = catharsis.parse(tagInfo.typeExpression, {jsdoc: true});
    }
    catch (e) {
        // always re-throw so the caller has a chance to report which file was bad
        throw new Error( util.format('unable to parse the type expression "%s": %s',
            tagInfo.typeExpression, e.message) );
    }

    if (parsedType) {
        tagInfo.type = tagInfo.type.concat( getTypeStrings(parsedType) );

        // Catharsis and JSDoc use the same names for 'optional' and 'nullable'...
        ['optional', 'nullable'].forEach(function(key) {
            if (parsedType[key] !== null && parsedType[key] !== undefined) {
                tagInfo[key] = parsedType[key];
            }
        });

        // ...but not 'variable'.
        if (parsedType.repeatable !== null && parsedType.repeatable !== undefined) {
            tagInfo.variable = parsedType.repeatable;
        }
    }

    return tagInfo;
}

// TODO: allow users to add/remove type parsers (perhaps via plugins)
var typeParsers = [parseName, parseTypeExpression];

/**
 * Parse the value of a JSDoc tag.
 *
 * @param {string} tagValue - The value of the tag. For example, the tag `@param {string} name` has
 * a value of `{string} name`.
 * @param {boolean} canHaveName - Indicates whether the value can include a member name.
 * @param {boolean} canHaveType - Indicates whether the value can include a type expression that
 * describes the member.
 * @return {module:jsdoc/tag/type.TagInfo} Information obtained from the tag.
 * @throws {Error} Thrown if a type expression cannot be parsed.
 */
exports.parse = function(tagValue, canHaveName, canHaveType) {
    if (typeof tagValue !== 'string') { tagValue = ''; }
    
    var tagInfo = getTagInfo(tagValue, canHaveName, canHaveType);
    tagInfo.type = tagInfo.type || [];
    
    typeParsers.forEach(function(parser) {
        tagInfo = parser.call(this, tagInfo);
    });

    // if we wanted a type, but the parsers didn't add any type names, use the type expression
    if (canHaveType && !tagInfo.type.length && tagInfo.typeExpression) {
        tagInfo.type = [tagInfo.typeExpression];
    }

    return tagInfo;
};
