/**
 * Functionality related to JSDoc tags.
 *
 * @module jsdoc/tag
 * @requires module:jsdoc/env
 * @requires module:jsdoc/path
 * @requires module:jsdoc/tag/dictionary
 * @requires module:jsdoc/tag/validator
 * @requires module:jsdoc/tag/type
 * @requires module:jsdoc/util/logger
 * @requires module:util
 */
const env = require('jsdoc/env');
const logger = require('jsdoc/util/logger');
const path = require('jsdoc/path');
const tag = {
    dictionary: require('jsdoc/tag/dictionary'),
    validator: require('jsdoc/tag/validator'),
    type: require('jsdoc/tag/type')
};

/**
 * Check whether the text is the same as a symbol name with leading or trailing whitespace.
 * If so, the whitespace must be preserved, and the text cannot be trimmed.
 *
 * @param {string} text - FIXME
 * @param {object} meta - FIXME
 * @returns {boolean} Can `text` be trimmed?
 */
function mustPreserveWhitespace(text, meta) {
    return meta && meta.code && meta.code.name === text && text.match(/(?:^\s+)|(?:\s+$)/);
}

/**
 * @param {string} text - FIXME
 * @param {object} opts - FIXME
 * @param {object} meta - FIXME
 * @returns {string} Trimmed `text`.
 */
function trim(text, opts, meta) {
    let indentMatcher;
    let match;

    opts = opts || {};
    text = String(typeof text === 'undefined' ? '' : text);

    if ( mustPreserveWhitespace(text, meta) ) {
        text = `"${text}"`;
    }
    else if (opts.keepsWhitespace) {
        text = text.replace(/^[\n\r\f]+|[\n\r\f]+$/g, '');
        if (opts.removesIndent) {
            match = text.match(/^([ \t]+)/);
            if (match && match[1]) {
                indentMatcher = new RegExp(`^${match[1]}`, 'gm');
                text = text.replace(indentMatcher, '');
            }
        }
    }
    else {
        text = text.replace(/^\s+|\s+$/g, '');
    }

    return text;
}

/**
 * @param {object} obj - FIXME
 * @param {string} propName - FIXME
 * @param {string} propValue - FIXME
 */
function addHiddenProperty(obj, propName, propValue) {
    Object.defineProperty(obj, propName, {
        value: propValue,
        writable: true,
        enumerable: Boolean(env.opts.debug),
        configurable: true
    });
}

/**
 * @param {object} fixMyName - FIXME
 * @param {object} fixMyNameToo - FIXME
 * @param {object} meta - FIXME
 * @returns {object} The parsed type.
 */
function parseType({text, originalTitle}, {canHaveName, canHaveType}, meta) {
    try {
        return tag.type.parse(text, canHaveName, canHaveType);
    }
    catch (e) {
        logger.error(
            'Unable to parse a tag\'s type expression%s with tag title "%s" and text "%s": %s',
            meta.filename ? ( ` for source file ${path.join(meta.path, meta.filename)}${meta.lineno ? (` in line ${meta.lineno}`) : ''}` ) : '',
            originalTitle,
            text,
            e.message
        );

        return {};
    }
}

/**
 * @param {object} tagInstance - FIXME
 * @param {object} tagDef - FIXME
 * @param {object} meta - FIXME
 */
function processTagText(tagInstance, tagDef, meta) {
    let tagType;

    if (tagDef.onTagText) {
        tagInstance.text = tagDef.onTagText(tagInstance.text);
    }

    if (tagDef.canHaveType || tagDef.canHaveName) {
        /** The value property represents the result of parsing the tag text. */
        tagInstance.value = {};

        tagType = parseType(tagInstance, tagDef, meta);

        // It is possible for a tag to *not* have a type but still have
        // optional or defaultvalue, e.g. '@param [foo]'.
        // Although tagType.type.length == 0 we should still copy the other properties.
        if (tagType.type) {
            if (tagType.type.length) {
                tagInstance.value.type = {
                    names: tagType.type
                };
                addHiddenProperty(tagInstance.value.type, 'parsedType', tagType.parsedType);
            }

            ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(prop => {
                if (typeof tagType[prop] !== 'undefined') {
                    tagInstance.value[prop] = tagType[prop];
                }
            });
        }

        if (tagType.text && tagType.text.length) {
            tagInstance.value.description = tagType.text;
        }

        if (tagDef.canHaveName) {
            // note the dash is a special case: as a param name it means "no name"
            if (tagType.name && tagType.name !== '-') {
                tagInstance.value.name = tagType.name;
            }
        }
    }
    else {
        tagInstance.value = tagInstance.text;
    }
}

/**
 * Replace the existing tag dictionary with a new tag dictionary.
 *
 * Used for testing only. Do not call this method directly. Instead, call
 * {@link module:jsdoc/doclet._replaceDictionary}, which also updates this module's tag dictionary.
 *
 * @private
 * @param {module:jsdoc/tag/dictionary.Dictionary} dict - The new tag dictionary.
 */
exports._replaceDictionary = function _replaceDictionary(dict) {
    tag.dictionary = dict;
};

/**
 * Represents a single doclet tag.
 */
class Tag {
    /**
     * Constructs a new tag object. Calls the tag validator.
     *
     * @param {string} tagTitle  - FIXME
     * @param {string} [tagBody] - FIXME
     * @param {object} [meta]    - FIXME
     */
    constructor(tagTitle, tagBody, meta) {
        let tagDef;
        let trimOpts;

        meta = meta || {};

        this.originalTitle = trim(tagTitle);

        /** The title of the tag (for example, `title` in `@title text`). */
        this.title = tag.dictionary.normalize(this.originalTitle);

        tagDef = tag.dictionary.lookUp(this.title);
        trimOpts = {
            keepsWhitespace: tagDef.keepsWhitespace,
            removesIndent: tagDef.removesIndent
        };

        /**
         * The text following the tag (for example, `text` in `@title text`).
         *
         * Whitespace is trimmed from the tag text as follows:
         *
         * + If the tag's `keepsWhitespace` option is falsy, all leading and trailing whitespace are
         * removed.
         * + If the tag's `keepsWhitespace` option is set to `true`, leading and trailing whitespace are
         * not trimmed, unless the `removesIndent` option is also enabled.
         * + If the tag's `removesIndent` option is set to `true`, any indentation that is shared by
         * every line in the string is removed. This option is ignored unless `keepsWhitespace` is set
         * to `true`.
         *
         * **Note**: If the tag text is the name of a symbol, and the symbol's name includes leading or
         * trailing whitespace (for example, the property names in `{ ' ': true, ' foo ': false }`),
         * the tag text is not trimmed. Instead, the tag text is wrapped in double quotes to prevent the
         * whitespace from being trimmed.
         */
        this.text = trim(tagBody, trimOpts, meta);

        if (this.text) {
            processTagText(this, tagDef, meta);
        }

        tag.validator.validate(this, tagDef, meta);
    }
}
exports.Tag = Tag;
