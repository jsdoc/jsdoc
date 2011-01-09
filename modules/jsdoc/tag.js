/**
	@module jsdoc/tag
	@requires jsdoc/tag/dictionary
	@requires jsdoc/tag/validator
	@requires jsdoc/tag/type

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
	
	var jsdoc = {
	    tag: {
	        dictionary: require('jsdoc/tag/dictionary'),
	        validator: require('jsdoc/tag/validator'),
	        type: require('jsdoc/tag/type')
	    }
	};
	
	/**
	    @constructor Tag
	 */
	exports.Tag = function(tagTitle, tagBody, meta) {
	    var tagDef = jsdoc.tag.dictionary.lookUp(tagTitle),
	        meta = meta  || {};
	    	
	    this.title = jsdoc.tag.dictionary.normalise( trim(tagTitle) );
	    this.text = trim(tagBody, tagDef.keepsWhitespace);
	    
	    if (this.text) {
            if (tagDef.canHaveType) {
                this.value = {};
                
                var [
                    /*Array.<string>*/ typeNames,
                    /*any*/ remainingText,
                    /*?boolean*/ optional,
                    /*?boolean*/ nullable,
                    /*?boolean*/ variable
                ] = jsdoc.tag.type.parse(this.text);
                
                if (typeNames.length) {
                    this.value.type = {
                        names:    typeNames,
                        optional: optional,
                        nullable: nullable,
                        variable: variable
                    };
                }
                
                if (remainingText) {
                    if (tagDef.canHaveName) {
                        var [tagName, tagDesc, tagOptional, tagDefault] = parseTagText(remainingText);
                        
                        if (tagName)     { this.value.name = tagName; }
                        if (tagDesc)     { this.value.description = tagDesc; }
                        if (tagOptional) { this.value.optional = tagOptional; }
                        if (tagDefault)  { this.value.defaultvalue = tagDefault; }
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
	}
	
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
		@private
		@method parseTagText
		@param {string} tagText
		@returns {Array.<string, string, boolean, boolean>} [pname, pdesc, poptional, pdefault].
	 */
	function parseTagText(tagText) {
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
		return [pname, pdesc, poptional, pdefault];
	}

})();