/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	Create tag objects.
	@module jsdoc/tag
 */
(function() {
	var jsdoc = {
		type: require('jsdoc/type'),
		tagDictionary: require('jsdoc/tagdictionary')
	};
	
	exports.fromText = function(tagText) {
		var tag = new Tag(tagText);
		return tag;
	}
	
	/**
		@private
		@constructor module:jsdoc/tag.Tag
		@param {string} tagText
	 */
	function Tag(tagText) {
		/** @property {string} - The raw text of this tag, include everything after the @. */
		this.raw = tagText;
		
		/** @property {string} - The name of this tag, the word adjacent to the @. */
		this.name = '';
		
		/** @property {Array} - Zero or more type specifiers. */
		this.type = [];
		
		/** @property {*} - The value of this tag. */
		this.value = null;
		
		/** @property {string} - If this is a long tag, then this will be the parameter name. */
		this.pname = '';
		
		/** @property {string} - If this is a long tag, then this will be the parameter description. */
		this.pdesc = '';
		
		// raw is like: "tagname andsometagtext"
		var parts = this.raw.match(/^\s*(\S+)(?:\s([\s\S]*))?$/);

		if (parts) {
			this.name = (parts[1] || '').toLowerCase(); // like @name
			this.name = jsdoc.tagDictionary.resolveSynonyms(this.name);

			tagText = parts[2] || ''; // all the rest of the tag
			
			// now that we know who you are, tell us a little about yourself...
			var tagAbout = jsdoc.tagDictionary.lookUp(this.name);
			
			if (!tagAbout.keepsWhitespace) {
				tagText = trim(tagText);
			}
			this.value = tagText;
			
			if (tagAbout.canHaveType) {
				var [
					/*Array.<string>*/ type,
					/*any*/ value,
					/*?boolean*/ optional,
					/*?boolean*/ nullable
				] = jsdoc.type.parse(this.value);
				
				if (type && type.length) { this.type = type; }
				
				// @type tags are special: their type *is* their value
				if (tagAbout.typeIsValue) {
					value = (this.type[0] === '')? this.value.split(/\s*\|\s*/g) : this.type;
					if (value.length === 1) value = value[0]; // single values don't need to be arrays
					this.type = [];
				}
				
				if (typeof value !== 'undefined') { this.value = value; }
				if (optional !== null) { this.poptional = optional; }
				if (nullable !== null) { this.pnullable = nullable; }
			}
			
			if (tagAbout.canHavePname && tagAbout.canHavePdesc) { // both
				if (typeof this.value === 'string') {
					var [pname, pdesc, poptional, pdefault] = parsePname(this.value);
					if (pname && pname !== '-') this.pname = pname;
					this.pdesc = pdesc;
					if (typeof poptional !== 'undefined') this.poptional = poptional;
					this.pdefault = pdefault;
				}
			}
			else if (tagAbout.canHavePname) { // only
				this.pname = String(this.value);
			}
			else if (tagAbout.canHavePdesc) { // only
				this.pdesc = String(this.value);
			}
		}
	}
	
	/**
		@param {string|Tag} tagOrTagName
		@param {*} [tagValue]
	 */
	function addTag(tagName, tagValue) {
		var tag;
		if (tagName.name) {
			tag = tagName;
			tagName = tagName.name;
		}
		
		var tagAbout = jsdoc.tagDictionary.lookUp(tagName);
		if (tagAbout.isScalar && this.hasTag(tagName)) {
			return false;
		}
		if (typeof tagValue === 'undefined') {
			// TODO this could obviously be more efficient
			this[this.length] = tag || exports.fromText(tagName);
		}
		else {
			this[this.length] = tag || exports.fromText(tagName + ' ' + tagValue);
		}
		return true;
	}
	
	function hasTag(tagName, tagValue) {
		var i = this.length;
		while(i--) {
			if (this[i].name === tagName) {
				return true;
			}
		}
		return false;
	}
	
	function setTag(tagName, tagValue) {
		var i = this.length;
		while(i--) {
			if (this[i].name === tagName) {
				this[i].value = tagValue;
				return true;
			}
		}
		
		this.addTag(tagName, tagValue);
		return false;
	}
	
	/**
		Given the source of a jsdoc comment, finds the tags.
		@private
		@function parse
		@param {string} commentSrc Unwrapped raw source of the doc comment.
		@returns {Array.<module:jsdoc/tag.Tag>}
	 */
	exports.parse = function(commentSrc) {
		var tags = [];
		tags.addTag = addTag;
		tags.hasTag = hasTag;
		tags.setTag = setTag;

		// split out the basic tags, keep surrounding whitespace
		commentSrc
		.replace(/^(\s*)@(\S)/gm, '$1\\@$2') // replace splitter ats with an arbitrary sequence (unicode_recordseperator+@)
		.split('\\@')                        // then split on that arbitrary sequence
		.forEach(function($) {
			var newTag = exports.fromText($);

			if (newTag.name) { tags.addTag(newTag); }
		});
		
		return tags;
	}
	
	Tag.prototype.toString = function() {
		return '@'+this.raw;
	}
	
	/**
		Parse the parameter name and parameter desc from the tag text.
		@private
		@method parsePname
		@param {string} tagText
		@returns {Array.<string, string, boolean, boolean>} [pname, pdesc, poptional, pdefault].
	 */
	function parsePname(tagText) {
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

	//TODO: move into a shared module?
	/** @private */
	function trim(text) {
		if (!text) { return ''; }
		return text.replace(/^\s+|\s+$/g, '');
	}
	
})();