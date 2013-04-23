/*global env: true */
/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
    Functionality related to JSDoc tags.
    @module jsdoc/tag
    @requires jsdoc/tag/dictionary
    @requires jsdoc/tag/validator
    @requires jsdoc/tag/type
 */

var jsdoc = {
    tag: {
        dictionary: require('jsdoc/tag/dictionary'),
        validator: require('jsdoc/tag/validator'),
        type: require('jsdoc/tag/type')
    }
};

function trim(text, newlines) {
    if (!text) { return ''; }
    
    if (newlines) {
        return text.replace(/^[\n\r\f]+|[\n\r\f]+$/g, '');
    }
    else {
        return text.replace(/^\s+|\s+$/g, '');
    }
}

function processTagText(tag, tagDef) {
    var tagType;

    if (tagDef.onTagText) {
        tag.text = tagDef.onTagText(tag.text);
    }

    if (tagDef.canHaveType || tagDef.canHaveName) {
        /** The value property represents the result of parsing the tag text. */
        tag.value = {};
        
        tagType = jsdoc.tag.type.parse(tag.text, tagDef.canHaveName, tagDef.canHaveType);

        // It is possible for a tag to *not* have a type but still have
        // optional or defaultvalue, e.g. '@param [foo]'.
        // Although tagType.type.length == 0 we should still copy the other properties.
        if (tagType.type) {
            if (tagType.type.length) {
                tag.value.type = {
                    names: tagType.type
                };
            }
            tag.value.optional = tagType.optional;
            tag.value.nullable = tagType.nullable;
            tag.value.variable = tagType.variable;
            tag.value.defaultvalue = tagType.defaultvalue;
        }
        
        if (tagType.text && tagType.text.length) {
            tag.value.description = tagType.text;
        }
        
        if (tagDef.canHaveName) {
            // note the dash is a special case: as a param name it means "no name"
            if (tagType.name && tagType.name !== '-') { tag.value.name = tagType.name; }
        }
    }
    else {
        tag.value = tag.text;
    }
}

/**
    Constructs a new tag object. Calls the tag validator.
    @class
    @classdesc Represents a single doclet tag.
    @param {string} tagTitle
    @param {string=} tagBody
    @param {object=} meta
 */
var Tag = exports.Tag = function(tagTitle, tagBody, meta) {
    meta = meta || {};
    
    this.originalTitle = trim(tagTitle);
    
    /** The title part of the tag: @title text */
    this.title = jsdoc.tag.dictionary.normalise(this.originalTitle);

    var tagDef = jsdoc.tag.dictionary.lookUp(this.title);
    
    /** The text part of the tag: @title text */
    this.text = trim(tagBody, tagDef.keepsWhitespace);
    
    if (this.text) {
        processTagText(this, tagDef);
    }
    
    jsdoc.tag.validator.validate(this, tagDef, meta);
};
