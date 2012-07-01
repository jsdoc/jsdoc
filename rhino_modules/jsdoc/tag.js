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
    @returns {{paramName: string, paramDesc: string, paramOptional: boolean, paramDefault: boolean}}
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
    return {
        paramName: pname,
        paramDesc: pdesc,
        paramOptional: poptional,
        paramDefault: pdefault
    };
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
    var parsed,
        parsedParamText,
        paramName,
        paramDesc,
        paramOptional,
        paramDefault;
    var tagDef = jsdoc.tag.dictionary.lookUp(tagTitle);
    
    meta = meta || {};
    
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
            
            parsed = jsdoc.tag.type.parse(this.text);

            if (parsed.type.length) {
                this.value.type = {
                    names:    parsed.type,
                    optional: parsed.optional,
                    nullable: parsed.nullable,
                    variable: parsed.variable
                };
            }

            if (parsed.text) {
                if (tagDef.canHaveName) {
                    parsedParamText = parseParamText(parsed.text);
                    paramName = parsedParamText.paramName;
                    paramDesc = parsedParamText.paramDesc;
                    paramOptional = parsedParamText.paramOptional;
                    paramDefault = parsedParamText.paramDefault;
                     
                    // note the dash is a special case: as a param name it means "no name"
                    if (paramName && paramName !== '-') { this.value.name = paramName; }
                    
                    if (paramDesc)     { this.value.description = paramDesc; }
                    if (paramOptional) { this.value.optional = paramOptional; }
                    if (paramDefault)  { this.value.defaultvalue = paramDefault; }
                }
                else {
                    this.value.description = parsed.text;
                }
            }
        }
        else {
            this.value = this.text;
        }
    }
    
    jsdoc.tag.validator.validate(this, meta);
};
