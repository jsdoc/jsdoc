/**
 * @module @jsdoc/tag/lib/type
 * @alias @jsdoc/tag.type
 */
const { cast } = require('@jsdoc/util');
const catharsis = require('catharsis');
const { extractInlineTag } = require('./inline');
const { splitNameAndDescription } = require('@jsdoc/core').name;

/**
 * Information about a type expression extracted from tag text.
 *
 * @typedef TypeExpressionInfo
 * @memberof module:@jsdoc/tag.type
 * @property {string} expression - The type expression.
 * @property {string} text - The updated tag text.
 */

/** @private */
function unescapeBraces(text) {
    return text.replace(/\\\{/g, '{')
        .replace(/\\\}/g, '}');
}

/**
 * Extract a type expression from the tag text.
 *
 * @private
 * @param {string} string - The tag text.
 * @return {module:@jsdoc/tag.type.TypeExpressionInfo} The type expression and updated tag text.
 */
function extractTypeExpression(string) {
    let completeExpression;
    let count = 0;
    let position = 0;
    let expression = '';
    const startIndex = string.search(/\{[^@]/);
    let textStartIndex;

    if (startIndex !== -1) {
        // advance to the first character in the type expression
        position = textStartIndex = startIndex + 1;
        count++;

        while (position < string.length) {
            switch (string[position]) {
                case '\\':
                    // backslash is an escape character, so skip the next character
                    position++;
                    break;
                case '{':
                    count++;
                    break;
                case '}':
                    count--;
                    break;
                default:
                    // do nothing
            }

            if (count === 0) {
                completeExpression = string.slice(startIndex, position + 1);
                expression = string.slice(textStartIndex, position).trim();
                break;
            }

            position++;
        }
    }

    string = completeExpression ? string.replace(completeExpression, '') : string;

    return {
        expression: unescapeBraces(expression),
        newString: string.trim()
    };
}

/** @private */
function getTagInfo(tagValue, canHaveName, canHaveType) {
    let name = '';
    let typeExpression = '';
    let text = tagValue;
    let expressionAndText;
    let nameAndDescription;
    let typeOverride;

    if (canHaveType) {
        expressionAndText = extractTypeExpression(text);
        typeExpression = expressionAndText.expression;
        text = expressionAndText.newString;
    }

    if (canHaveName) {
        nameAndDescription = splitNameAndDescription(text);
        name = nameAndDescription.name;
        text = nameAndDescription.description;
    }

    // an inline @type tag, like {@type Foo}, overrides the type expression
    if (canHaveType) {
        typeOverride = extractInlineTag(text, 'type');
        if (typeOverride.tags && typeOverride.tags[0]) {
            typeExpression = typeOverride.tags[0].text;
        }
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
 * @memberof module:@jsdoc/tag.type
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
 * @param {module:@jsdoc/tag.type.TagInfo} tagInfo - Information contained in the tag.
 * @return {module:@jsdoc/tag.type.TagInfo} Updated information from the tag.
 */
function parseName(tagInfo) {
    // like '[foo]' or '[ foo ]' or '[foo=bar]' or '[ foo=bar ]' or '[ foo = bar ]'
    // or 'foo=bar' or 'foo = bar'
    if ( /^(\[)?\s*(.+?)\s*(\])?$/.test(tagInfo.name) ) {
        tagInfo.name = RegExp.$2;
        // were the "optional" brackets present?
        if (RegExp.$1 && RegExp.$3) {
            tagInfo.optional = true;
        }

        // like 'foo=bar' or 'foo = bar'
        if ( /^(.+?)\s*=\s*(.+)$/.test(tagInfo.name) ) {
            tagInfo.name = RegExp.$1;
            tagInfo.defaultvalue = cast(RegExp.$2);
        }
    }

    return tagInfo;
}

/** @private */
function getTypeStrings(parsedType, isOutermostType) {
    let applications;
    let typeString;

    let types = [];

    const TYPES = catharsis.Types;

    switch (parsedType.type) {
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
            // if this is the outermost type, we strip the modifiers; otherwise, we keep them
            if (isOutermostType) {
                applications = parsedType.applications.map(application =>
                    catharsis.stringify(application)).join(', ');
                typeString = `${getTypeStrings(parsedType.expression)[0]}.<${applications}>`;

                types.push(typeString);
            }
            else {
                types.push( catharsis.stringify(parsedType) );
            }
            break;
        case TYPES.TypeUnion:
            parsedType.elements.forEach(element => {
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
            throw new Error(`unrecognized type ${parsedType.type} in parsed type: ${parsedType}`);
    }

    return types;
}

/**
 * Extract JSDoc-style and Closure Compiler-style type information from the type expression
 * specified in the tag info.
 *
 * @private
 * @param {module:@jsdoc/tag.type.TagInfo} tagInfo - Information contained in the tag.
 * @return {module:@jsdoc/tag.type.TagInfo} Updated information from the tag.
 */
function parseTypeExpression(tagInfo) {
    let parsedType;

    // don't try to parse empty type expressions
    if (!tagInfo.typeExpression) {
        return tagInfo;
    }

    try {
        parsedType = catharsis.parse(tagInfo.typeExpression, {
            jsdoc: true,
            useCache: false
        });
    }
    catch (e) {
        // always re-throw so the caller has a chance to report which file was bad
        throw new Error(`Invalid type expression "${tagInfo.typeExpression}": ${e.message}`);
    }

    tagInfo.type = tagInfo.type.concat( getTypeStrings(parsedType, true) );
    tagInfo.parsedType = parsedType;

    // Catharsis and JSDoc use the same names for 'optional' and 'nullable'...
    ['optional', 'nullable'].forEach(key => {
        if (parsedType[key] !== null && parsedType[key] !== undefined) {
            tagInfo[key] = parsedType[key];
        }
    });

    // ...but not 'variable'.
    if (parsedType.repeatable !== null && parsedType.repeatable !== undefined) {
        tagInfo.variable = parsedType.repeatable;
    }

    return tagInfo;
}

// TODO: allow users to add/remove type parsers (perhaps via plugins)
const typeParsers = [parseName, parseTypeExpression];

/**
 * Parse the value of a JSDoc tag.
 *
 * @param {string} tagValue - The value of the tag. For example, the tag `@param {string} name` has
 * a value of `{string} name`.
 * @param {boolean} canHaveName - Indicates whether the value can include a symbol name.
 * @param {boolean} canHaveType - Indicates whether the value can include a type expression that
 * describes the symbol.
 * @return {module:@jsdoc/tag.type.TagInfo} Information obtained from the tag.
 * @throws {Error} Thrown if a type expression cannot be parsed.
 */
exports.parse = (tagValue, canHaveName, canHaveType) => {
    let tagInfo;

    if (typeof tagValue !== 'string') {
        tagValue = '';
    }

    tagInfo = getTagInfo(tagValue, canHaveName, canHaveType);
    tagInfo.type = tagInfo.type || [];

    typeParsers.forEach(parser => {
        tagInfo = parser(tagInfo);
    });

    // if we wanted a type, but the parsers didn't add any type names, use the type expression
    if (canHaveType && !tagInfo.type.length && tagInfo.typeExpression) {
        tagInfo.type = [tagInfo.typeExpression];
    }

    return tagInfo;
};
