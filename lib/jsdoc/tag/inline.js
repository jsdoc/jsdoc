/**
 * @module jsdoc/tag/inline
 * 
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
 * Information about the result of extracting an inline tag from a text string.
 *
 * @typedef {Object} InlineTagInfo
 * @memberof module:jsdoc/tag/inline
 * @property {?string} tag - The tag whose text was found, or `null` if no tag was specified.
 * @property {string} text - The tag text that was found.
 * @property {string} newString - The updated text string after extracting or replacing the inline
 * tag.
 */

/**
 * Function that replaces an inline tag with other text.
 *
 * @callback InlineTagReplacer
 * @memberof module:jsdoc/tag/inline
 * @param {string} string - The complete string containing the inline tag.
 * @param {string} completeTag - The entire inline tag, including its enclosing braces.
 * @param {string} tagText - The text contained in the inline tag.
 * @return {string} An updated version of the string that contained the inline tag.
 */

/** @private */
function unescapeBraces(text) {
    return text.replace(/\\\{/g, '{')
        .replace(/\\\}/g, '}');
}

/**
 * Replace an inline tag with other text.
 *
 * To replace untagged text that is enclosed in braces, set the `tag` parameter to `null`.
 *
 * @param {string} string - The string in which to replace the inline tag.
 * @param {?string} tag - The inline tag that must follow the opening brace (for example, `@link`).
 * @param {module:jsdoc/tag/inline.InlineTagReplacer} replacer - The function that is used to
 * replace text in the string.
 * @return {module:jsdoc/tag/inline.InlineTagInfo} The updated string, as well as information about
 * the inline tag.
 */
exports.replaceInlineTag = function(string, tag, replacer) {
    string = string || '';
    tag = tag || '';

    var count = 0;
    var position = 0;
    var completeTag = '';
    var text = '';
    var start = '{' + tag;
    var startIndex = string.indexOf(start);
    var textStartIndex;

    if (startIndex !== -1) {
        // advance to the first character after `start`
        position = textStartIndex = startIndex + start.length;
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
                completeTag = string.slice(startIndex, position + 1);
                text = string.slice(textStartIndex, position).trim();
                break;
            }

            position++;
        }
    }

    string = replacer.call(this, string, completeTag, text);

    return {
        tag: tag || null,
        text: unescapeBraces(text),
        newString: string.trim()
    };
};

/**
 * Extract the first portion of a string that is enclosed in braces, with the `tag` parameter
 * immediately following the opening brace.
 *
 * To extract untagged text that is enclosed in braces, omit the `tag` parameter.
 *
 * @param {string} string - The string from which to extract text.
 * @param {?string} tag - The inline tag that must follow the opening brace (for example, `@link`).
 * @return {module:jsdoc/tag/inline.InlineTagInfo} Information about the string and inline tag.
 */
exports.extractInlineTag = function(string, tag) {
    return exports.replaceInlineTag(string, tag, function(string, completeTag,
        tagText) {
        return string.replace(completeTag, '');
    });
};
