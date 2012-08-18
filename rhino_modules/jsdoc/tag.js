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
    Parse the parameter name and parameter desc from the tag text.
    @inner
    @method parseParamText
    @memberof module:jsdoc/tag
    @param {string} tagText
    @returns {Array.<string, string, boolean, boolean>} [pname, pdesc, poptional, pdefault].
 */
function parseParamText(tagText) {
    var pname, pdesc, poptional, pdefault;

    // like: pname, pname pdesc, or name - pdesc
    tagText.match(/^(\[[^\]]+\]|\S+)((?:\s*\-\s*|\s+)(\S[\s\S]*))?$/);
    pname = RegExp.$1;
    pdesc = RegExp.$3;

    if ( /^\[\s*(.+?)\s*\]$/.test(pname) ) {
        pname = RegExp.$1;
        poptional = true;
        
        if ( /^(.+?)\s*=\s*(.+)$/.test(pname) ) {
            pname = RegExp.$1;
            pdefault = RegExp.$2;
        }
    }
    return { name: pname, desc: pdesc, optional: poptional, default: pdefault };
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
        
        if (tagDef.canHaveType) {
        
            /** The value property represents the result of parsing the tag text. */
            this.value = {};
            
            var tagType = jsdoc.tag.type.parse(this.text);

            if (tagType.type && tagType.type.length) {
                this.value.type = {
                    names:    tagType.type,
                    optional: tagType.optional,
                    nullable: tagType.nullable,
                    variable: tagType.variable
                };
            }

            var remainingText = tagType.text;

            if (remainingText) {
                if (tagDef.canHaveName) {
                    var paramInfo = parseParamText(remainingText);
                    
                    // note the dash is a special case: as a param name it means "no name"
                    if (paramInfo.name && paramInfo.name !== '-') { this.value.name = paramInfo.name; }
                    
                    if (paramInfo.desc)     { this.value.description = paramInfo.desc; }
                    if (paramInfo.optional) { this.value.optional = paramInfo.optional; }
                    if (paramInfo.default)  { this.value.defaultvalue = paramInfo.default; }
                }
                else {
                    this.value.description = remainingText;
                }
            }
        }
        else {
            this.value = this.text;
        }
    }
    
    jsdoc.tag.validator.validate(this, meta);
};
