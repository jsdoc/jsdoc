/**
 * Module to strip the leading BOM, if present, from UTF-8 files.
 * @module
 * @private
 */

/**
 * Strip the leading BOM, if present, from a string.
 *
 * @private
 * @param {string} text - The string to strip.
 * @return {string} The stripped string.
 */
exports.strip = (text = '') => text.replace(/^\uFEFF/, '');
