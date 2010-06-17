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
	var jsdoc_type = require('jsdoc/type');
	
	exports.fromTagText = function(tagText) {
		return new Tag(tagText);
	}
	
	// tags that have {type} (name desc|text)
	var longTags = ['param', 'constructor', 'const', 'module', 'event', 'namespace', 'method', 'member', 'function', 'variable', 'enum', 'returns'];
	// tags that have {type} text
	var anonTags = ['returns'];
	
	/**
		@private
		@constructor Tag
		@param {string} tagText
	 */
	function Tag(tagText) {
		this.raw = tagText;
		this.name = '';
		this.type = [];
		this.text = '';
		this.pname = '';
		this.pdesc = '';
		
		// tagText is like: "tagname tag text"
		var bits = tagText.match(/^\s*(\S+)(?:\s([\s\S]*))?$/);
	
		if (bits) {
			this.name = (bits[1] || '').toLowerCase(); // like @name
			this.name = trim( resolveSynonyms(this.name) );
			
			this.text = bits[2] || ''; // all the rest of the tag

			if (this.name !== 'example') { // example is the only tag that preserves whitespace
				this.text = trim( this.text );
			}
			
			if (longTags.indexOf(this.name) > -1) { // is a tag that uses the long format
				var /*Array.<string>*/ type,
					/*string*/         text,
					/*?boolean*/       optional,
					/*?boolean*/       nullable;
				[type, text, optional, nullable] = jsdoc_type.parse(this.text);
				
				// @type tags are the only tag that is not allowed to have a {type}!
				if (this.name === 'type') {
					text = text || type.join('|');
					type = [];
				}

				// don't add an empty type or null attributes
				if (type && type.length) { this.type = type; }
				if (optional !== null) { this.poptional = optional; }
				if (nullable !== null) { this.pnullable = nullable; }
				
				this.text = text;
			
				if (anonTags.indexOf(this.name) > -1) {
					this.pdesc = this.text;
				}
				else {
					
					var [pname, pdesc, poptional, pdefault] = parsePname(this.text);
					this.pname = pname;
					this.pdesc = pdesc;
					if (typeof poptional !== 'undefined') this.poptional = poptional;
					this.pdefault = pdefault;
				}
			}
		}
	}
	
	/**
		Given the source of a jsdoc comment, finds the tags.
		@private
		@function parse
		@param {string} commentSrc Unwrapped.
		@returns Array.<Object>
	 */
	exports.parse = function(commentSrc) {
		var tags = [];

		// split out the basic tags, keep surrounding whitespace
		commentSrc
		.replace(/^(\s*)@(\S)/gm, '$1\\@$2') // replace splitter ats with an arbitrary sequence (unicode_recordseperator+@)
		.split('\\@')                        // then split on that arbitrary sequence
		.forEach(function($) {
			var newTag = exports.fromTagText($);

			if (newTag.name) { tags.push(newTag); }
		});
		
		return tags;
	}
	
	Tag.prototype.toString = function() {
		return '@'+this.raw;
	}
	
	/**
		Split the parameter name and parameter desc from the tag text.
		@private
		@method parsePname
		@param {string} tagText
		@returns Array.<string> The pname and the pdesc.
	 */
	function parsePname(tagText) {
		var pname, pdesc, poptional, pdefault;
		
		tagText.match(/^(\[[^\]]+\]|\S+)(\s+(\S[\s\S]*))?$/);
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
		'description': 'desc',
		'function':    'method',
		'variable':    'member',
		'return':      'returns'
	}
	
	//TODO: move into a shared module?
	/** @private */
	function trim(text) {
		if (!text) { return ''; }
		return text.replace(/^\s+|\s+$/g, '');
	}
	
})();