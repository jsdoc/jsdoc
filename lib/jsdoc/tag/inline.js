/**
 * @module jsdoc/tag/inline
 */
/**
 * Information about an inline tag that was found within a string.
 *
 * @typedef {Object} InlineTagInfo
 * @memberof module:jsdoc/tag/inline
 * @property {?string} completeTag - The entire inline tag, including its enclosing braces.
 * @property {?string} tag - The tag whose text was found.
 * @property {?string} text - The tag text that was found.
 */

/**
 * Information about the results of replacing inline tags within a string.
 *
 * @typedef {Object} InlineTagResult
 * @memberof module:jsdoc/tag/inline
 * @property {Array.<module:jsdoc/tag/inline.InlineTagInfo>} tags - The inline tags that were found.
 * @property {string} newString - The updated text string after extracting or replacing the inline
 * tags.
 */

/**
 * Text-replacing function for strings that contain an inline tag.
 *
 * @callback InlineTagReplacer
 * @memberof module:jsdoc/tag/inline
 * @param {string} string - The complete string containing the inline tag.
 * @param {module:jsdoc/tag/inline.InlineTagInfo} tagInfo - Information about the inline tag.
 * @return {string} An updated version of the complete string.
 */

/**
 * Create a regexp that matches a specific inline tag, or all inline tags.
 *
 * @private
 * @memberof module:jsdoc/tag/inline
 * @param {?string} tagName - The inline tag that the regexp will match. May contain regexp
 * characters. If omitted, matches any string.
 * @param {?string} prefix - A prefix for the regexp. Defaults to an empty string.
 * @param {?string} suffix - A suffix for the regexp. Defaults to an empty string.
 * @returns {RegExp} A regular expression that matches the requested inline tag.
 */
function regExpFactory(tagName = '\\S+', prefix = '', suffix = '') {
    return new RegExp(`${prefix}\\{@${tagName}\\s+((?:.|\n)+?)\\}${suffix}`, 'i');
}

/**
 * Check whether a string is an inline tag. You can check for a specific inline tag or for any valid
 * inline tag.
 *
 * @param {string} string - The string to check.
 * @param {?string} tagName - The inline tag to match. May contain regexp characters. If this
 * parameter is omitted, this method returns `true` for any valid inline tag.
 * @returns {boolean} Set to `true` if the string is a valid inline tag or `false` in all other
 * cases.
 */
exports.isInlineTag = (string, tagName) => regExpFactory(tagName, '^', '$').test(string);

/**
 * Replace all instances of multiple inline tags with other text.
 *
 * @param {string} string - The string in which to replace the inline tags.
 * @param {Object} replacers - The functions that are used to replace text in the string. The keys
 * must contain tag names (for example, `link`), and the values must contain functions with the
 * type {@link module:jsdoc/tag/inline.InlineTagReplacer}.
 * @return {module:jsdoc/tag/inline.InlineTagResult} The updated string, as well as information
 * about the inline tags that were found.
 */
exports.replaceInlineTags = (string, replacers) => {
    const tagInfo = [];

    function replaceMatch(replacer, tag, match, text) {
        const matchedTag = {
            completeTag: match,
            tag: tag,
            text: text
        };

        tagInfo.push(matchedTag);

        return replacer(string, matchedTag);
    }

    string = string || '';

    Object.keys(replacers).forEach(replacer => {
        const tagRegExp = regExpFactory(replacer);
        let matches;
        let previousString;

        // call the replacer once for each match
        do {
            matches = tagRegExp.exec(string);
            if (matches) {
                previousString = string;
                string = replaceMatch(replacers[replacer], replacer, matches[0], matches[1]);
            }
        } while (matches && previousString !== string);
    });

    return {
        tags: tagInfo,
        newString: string.trim()
    };
};

/**
 * Replace all instances of an inline tag with other text.
 *
 * @param {string} string - The string in which to replace the inline tag.
 * @param {string} tag - The name of the inline tag to replace.
 * @param {module:jsdoc/tag/inline.InlineTagReplacer} replacer - The function that is used to
 * replace text in the string.
 * @return {module:jsdoc/tag/inline.InlineTagResult} The updated string, as well as information
 * about the inline tags that were found.
 */
exports.replaceInlineTag = (string, tag, replacer) => {
    const replacers = {};

    replacers[tag] = replacer;

    return exports.replaceInlineTags(string, replacers);
};

/**
 * Extract inline tags from a string, replacing them with an empty string.
 *
 * @param {string} string - The string from which to extract text.
 * @param {?string} tag - The inline tag to extract.
 * @return {module:jsdoc/tag/inline.InlineTagResult} The updated string, as well as information
 * about the inline tags that were found.
 */
exports.extractInlineTag = (string, tag) => exports.replaceInlineTag(string, tag, (str, {completeTag}) => str.replace(completeTag, ''));
