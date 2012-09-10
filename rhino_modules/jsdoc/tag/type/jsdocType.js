/**
    @module jsdoc/tag/type/jsdocType

    @author Michael Mathews <micmath@gmail.com>
    @author Jeff Williams <jeffrey.l.williams@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

 /**
     Extract JSDoc-style type information from the tag info.
     @param {object} tagInfo Hash with name, type, text, optional, nullable, variable, and default properties.
     @return {object} Hash with the same properties as tagInfo.
  */
exports.parse = function(tagInfo) {
    var name = tagInfo.name,
        optional,
        tagDefault;
    
    // like '[foo]' or '[ foo ]' or '[foo=bar]' or '[ foo=bar ]' or '[ foo = bar ]'
    if ( /^\[\s*(.+?)\s*\]$/.test(name) ) {
        name = RegExp.$1;
        optional = true;
        
        // like 'foo=bar' or 'foo = bar'
        if ( /^(.+?)\s*=\s*(.+)$/.test(name) ) {
            name = RegExp.$1;
            tagDefault = RegExp.$2;
        }
    }
    
    return {
        name: name,
        type: tagInfo.type,
        text: tagInfo.text,
        optional: optional,
        nullable: tagInfo.nullable,
        variable: tagInfo.variable,
        defaultvalue: tagDefault
    };
};