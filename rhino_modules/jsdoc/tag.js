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

/**
    Constructs a new tag object. Calls the tag validator.
    @class
    @classdesc Represents a single doclet tag.
    @param {string} tagTitle
    @param {string=} tagBody
    @param {object=} meta
 */
exports.Tag = function(tagTitle, tagBody, meta) {
    var tagDef = jsdoc.tag.dictionary.lookUp(tagTitle);
    meta = meta  || {};
    
    this.originalTitle = trim(tagTitle);
    
    /** The title part of the tag: @title text */
    this.title = jsdoc.tag.dictionary.normalise( this.originalTitle );
    
    /** The text part of the tag: @title text */
    this.text = trim(tagBody, tagDef.keepsWhitespace);
    
    if (this.text) {
        
        if (tagDef.onTagText) {
            this.text = tagDef.onTagText(this.text);
        }
        
        if (tagDef.canHaveType || tagDef.canHaveName) {
        
            /** The value property represents the result of parsing the tag text. */
            this.value = {};
            
            var tagType = jsdoc.tag.type.parse(this.text, tagDef.canHaveName, tagDef.canHaveType);

            if (tagType.type && tagType.type.length) {
                this.value.type = {
                    names: tagType.type
                };
                this.value.optional = tagType.optional;
                this.value.nullable = tagType.nullable;
                this.value.variable = tagType.variable;
                this.value.defaultvalue = tagType.defaultvalue;
            }
            
            if (tagType.text && tagType.text.length) {
                this.value.description = tagType.text;
            }
            
            if (tagDef.canHaveName) {
                // note the dash is a special case: as a param name it means "no name"
                if (tagType.name && tagType.name !== '-') { this.value.name = tagType.name; }
            }
        }
        else {
            this.value = this.text;
        }
    }
    
    jsdoc.tag.validator.validate(this, meta);
};
