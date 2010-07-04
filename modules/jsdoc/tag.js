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
	var jsdoc_type = require('jsdoc/type'),
		tagz = require('jsdoc/tagdictionary').TagDictionary;
	
	exports.fromText = function(tagText) {
		var tag = new Tag(tagText);
		return tag;
	}
	
	// tags that have {type} (name desc|text)
	var longTags = ['param', 'constructor', 'type', 'const', 'module', 'event', 'namespace', 'method', 'member', 'function', 'variable', 'enum', 'returns'];
	// tags that have {type} text
	var anonTags = ['returns'];
	
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
		var parts = this.raw.match(/^\s*(\S+)(?:\s+([\s\S]*))?$/);

		if (parts) {
			this.name = (parts[1] || '').toLowerCase(); // like @name
			this.name = resolveSynonyms(this.name);

			tagText = parts[2] || ''; // all the rest of the tag

			if (tagz.lookUp(this.name).keepsWhitespace) {
				this.value = tagText;
			}
			else {
				this.value = trim(tagText);
			}
			
			if (longTags.indexOf(this.name) > -1) { // is a tag that uses the long format

				var /*Array.<string>*/ type,
					/*any*/            value,
					/*?boolean*/       optional,
					/*?boolean*/       nullable;
				
				[type, value, optional, nullable] = jsdoc_type.parse(this.value);
				
				// don't add an empty type or null attributes
				if (type && type.length) { this.type = type; }
				
				// @type tags are special: the only tag that is not allowed to have a {type}
				// their type becomes their value
				if (this.name === 'type') {
					value = (this.type[0] === '')? this.value.split(/\s*\|\s*/g) : this.type;
					if (value.length === 1) value = value[0]; // single values don't need to be arrays
					this.type = [];
				}

				if (optional !== null) { this.poptional = optional; }
				if (nullable !== null) { this.pnullable = nullable; }
				
// TODO protect @example from being overwritten?
				this.value = value;
				if (tagz.lookUp(this.name).canHavePname && tagz.lookUp(this.name).canHavePdesc) { // some tags just have {type} desc
					if (typeof this.value === 'string') {
						var [pname, pdesc, poptional, pdefault] = parsePname(this.value);
						this.pname = pname;
						this.pdesc = pdesc;
						if (typeof poptional !== 'undefined') this.poptional = poptional;
						this.pdefault = pdefault;
					}
				}
				else if (tagz.lookUp(this.name).canHavePdesc) {
					this.pdesc = this.value;
				}
			}
		}
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

		// split out the basic tags, keep surrounding whitespace
		commentSrc
		.replace(/^(\s*)@(\S)/gm, '$1\\@$2') // replace splitter ats with an arbitrary sequence (unicode_recordseperator+@)
		.split('\\@')                        // then split on that arbitrary sequence
		.forEach(function($) {
			var newTag = exports.fromText($);

			if (newTag.name) { tags.push(newTag); }
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
	
	function resolveSynonyms(name) {
		if ( exports.synonyms.hasOwnProperty(name) ) {
			return exports.synonyms[name];
		}
		else {
			return name;
		}
	}
	exports.synonyms = {
		/*synonym*/    /*canonical*/
		'description': 'desc',
		'function':    'method',
		'variable':    'property',
		'return':      'returns',
		'member':      'memberof',
		'overview':    'file',
		'fileoverview':'file'
	}
	
	//TODO: move into a shared module?
	/** @private */
	function trim(text) {
		if (!text) { return ''; }
		return text.replace(/^\s+|\s+$/g, '');
	}
	
})();