/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	Functionality relating to jsdoc comments and their tags.
	@module jsdoc/doclet
 */
(function() {	
	var name = require('jsdoc/name'),
		tag = require('jsdoc/tag');
	
	/**
		Factory that builds a Doclet object.
		@param {string} commentSrc
		@param {ASTNode} node
		@param {string} sourceName
		@returns {Doclet}
	 */
	exports.makeDoclet = function(commentSrc, node, sourceName) {
		var tags = [],
			meta = {},
			doclet;
		
		meta.file = sourceName;
		meta.line = node? node.getLineno() : '';
		
		commentSrc = unwrapComment(commentSrc);
		commentSrc = fixDesc(commentSrc);
		
		tags = parseTags(commentSrc);
		
		try {
			preprocess(tags);
		}
		catch(e) {
			e.message = 'Cannot make doclet from JSDoc comment found at '+ meta.file + ' ' + meta.line
			+ ': ' + e.message
			+ '\n "' + commentSrc.replace(/\n\s+/g, '\n  ') + '"';
			throw e;
		}
		
		doclet = new Doclet(tags);
		
		doclet.meta = meta;
		
		postprocess(doclet);
		
		name.resolve(doclet);
		
		return doclet
	}
	
	/**
		@private
		@constructor Doclet
		@param {Array.<Object>} tags
	 */
	function Doclet(tags) {
		/**
			An array of Objects representing tags.
			@type Array.<Tag>
			@member Doclet#tags
		 */
		this.tags = tags;
	}
	
	/**
		Set the name of the Doclet.
		@method Doclet#setName
		@param {string name
	 */
	Doclet.prototype.setName = function(nameToSet) {
		this.tagText('name', nameToSet);

		nameToSet = name.resolve(this);
	}
	
	/**
		Return the text of the first tag with the given name.
		@method Doclet#tagText
		@param {String} tagName
		@returns {String} The text of the found tag.
	 */
	Doclet.prototype.tagText = function(tagName, text) {
		var i = this.tags.length;
		while(i--) {
			if (this.tags[i].name === tagName) {
				if (text) { this.tags[i].text = text; }
				return this.tags[i].text;
			}
		}
		
		// still here?
		if (text) {
			this.tags.push( tag.fromTagText(tagName + ' ' + text) );
			return text;
		}
		
		return '';
	}
	
	/**
		Does a tag with the given name exist in this doclet?
		@method Doclet#hasTag
		@param {String} tagName
		@returns {boolean} True if the tag is found, false otherwise.
	 */
	Doclet.prototype.hasTag = function(tagName) {
		var i = this.tags.length;
		while(i--) {
			if (this.tags[i].name === tagName) {
				return true;
			}
		}
		return false;
	}
	
	// safe to export to JSON
	var exportTags = ['name', 'path', 'denom', 'desc', 'type', 'param', 'returns', 'exports', 'requires', 'memberof', 'access', 'attribute'];
	
	/**
		Get a JSON-compatible object representing this Doclet.
		@method Doclet#toObject
		@returns {Object}
	 */
	Doclet.prototype.toObject = function() {
		var tag, tagName, tagValue,
			o = {};
		
		for (var i = 0, leni = this.tags.length; i < leni; i++) {
			tag = this.tags[i];
			
			if ( exportTags.indexOf(tag.name) === -1 ) { continue; }
		
			tagName = tag.name;
			tagValue = {};

// 			if (tag.type && tag.type.length) {
// 				tagValue.type = tag.type;
// 				// not a long tag
// 				if (!tag.pname && tag.text) { tagValue.text = tag.text; }
//			}
			
			// a long tag
			if (tag.pname) {
				
				if ( /^\[(.+)\]$/.test(tag.pname) ) {
					tagValue.name = RegExp.$1;
					tag.poptional = true;
				}
				else {
					tagValue.name = tag.pname;
				}
				tagValue.type = tag.type;
//				print('```` name is '+tagName+': '+tagValue);
			}
			if (tag.pdesc) { tagValue.desc = tag.pdesc; }
			if (typeof tag.poptional === 'boolean') { tagValue.optional = tag.poptional; }
			if (typeof tag.pnullable === 'boolean') { tagValue.nullable = tag.pnullable; }
			
			// tag value is not an object, it's just a simple string
			if (!tag.pname) {
				tagValue = tag.text;
			}

			if (typeof o[tagName] === 'undefined') { // not defined
				o[tagName] = tagValue;
			}
			else if (o[tagName].push) { // is an array
				o[tagName].push(tagValue);
			}
			else { // is a string, but needs to be an array
				o[tagName] = [ o[tagName] ];
				o[tagName].push(tagValue);
			}
			
			o.meta = this.meta;
		}
		
		return o;
	}
	
	/**
		Remove JsDoc comment slash-stars. Trims white space.
		@private
		@function unwrapComment
		@param {string} commentSrc
		@return {string} Coment wit stars and slashes removed.
	 */
	function unwrapComment(commentSrc) {
		if (!commentSrc) { return ''; }
	
		// TODO keep leading white space for @examples
		return commentSrc ? commentSrc.replace(/(^\/\*\*+\s*|\s*\**\*\/$)/g, "").replace(/^\s*\* ?/gm, "") : "";
	}
	
	/**
		Add a @desc tag if none exists on untagged text at start of comment.
		@private
		@function fixDesc
		@param {string} commentSrc
		@return {string} With needed @desc tag added.
	 */
	function fixDesc(commentSrc) {
		if (!/^\s*@/.test(commentSrc)) {
			commentSrc = '@desc ' + commentSrc;
		}
		return commentSrc;
	}
	
	/**
		Given the source of a jsdoc comment, finds the tags.
		@private
		@function parseTags
		@param {string} commentSrc Unwrapped.
		@returns Array.<Object>
	 */
	function parseTags(commentSrc) {
		var tags = [];

		// split out the basic tags
		commentSrc
		.split(/(^|[\r\n])\s*@/)
		.filter( function($){ return $.match(/\S/); } )
		.forEach(function($) {
			var newTag = tag.fromTagText($);

			if (newTag.name) {
				tags.push(newTag);
			}
		});
		
		return tags;
	}
	
	// other tags that can provide the memberof
	var memberofs = {methodof: 'method', eventof: 'event'};
	// other tags that can provide the symbol name
	var nameables = ['constructor', 'const', 'module', 'event', 'namespace', 'method', 'member', 'function', 'variable', 'enum'];
	
	/**
		Expand some shortcut tags. Modifies the tags argument in-place.
		@private
		@method preprocess
		@param {Array.<Object>} tags
		@returns undefined
	 */
	function preprocess(tags) {
		var name = '',
			taggedName = '',
			denom = '',
			taggedDenom = '',
			memberof = '',
			taggedMemberof = '';
		
		var i = tags.length;
		while(i--) {
		
 			if (tags[i].name === 'private') {
 				tags[tags.length] = tag.fromTagText('access private');
 			}
 			else if (tags[i].name === 'protected') {
 				tags[tags.length] = tag.fromTagText('access protected');
 			}
 			else if (tags[i].name === 'const') {
 				tags[tags.length] = tag.fromTagText('attribute constant');
 			}
 			else if (tags[i].name === 'readonly') {
 				tags[tags.length] = tag.fromTagText('attribute readonly');
 			}
			else if (tags[i].name === 'name') {
				if (name && name !== tags[i].text) {
					throw new DocTagConflictError('Conflicting names in documentation: '+name+', '+tags[i].text);
				}
				taggedName = name = tags[i].text;
			}
			else if (tags[i].name === 'denom') {
				if (denom && denom !== tags[i].text) {
					throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + denom + ' and ' + tags[i].text);
				}
				taggedDenom = denom = tags[i].text;
			}
			else if (tags[i].name === 'memberof') {
				if (memberof) {
					throw new DocTagConflictError('doclet has too many tags of type: @memberof.');
				}
				taggedMemberof = memberof = tags[i].text+'ZZZ_0';
			}
			
			if ( nameables.indexOf(tags[i].name) > -1 ) {
				if (tags[i].text) {
					if (name && name !== tags[i].text) {
						throw new DocTagConflictError('Conflicting names in documentation: '+name+', '+tags[i].text);
					}
					name = tags[i].text;
				}
				
				if (tags[i].pdesc) {
					tags[tags.length] = tag.fromTagText('desc ' + tags[i].pdesc);
				}
				
				if (tags[i].type) {
					tags[tags.length] = tag.fromTagText('type ' + tags[i].type.join('|'));
				}
				
				if (denom && denom !== tags[i].name) {
					throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + denom + ' and ' + tags[i].name);
				}
				denom = tags[i].name;
				if (denom === 'const') { denom = 'member'; } // an exception to the namebale rule
			}
			
			if ( memberofs.hasOwnProperty(tags[i].name) ) {
				if (tags[i].text) {
					if (memberof) {
						throw new DocTagConflictError('doclet has too many tags of type: @memberof.');
					}
					memberof = tags[i].text+'ZZZ_1';
				}
				
				if (denom && denom !== memberofs[tags[i].name]) {
					throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + denom + ' and ' + tags[i].name);
				}
				denom = memberofs[tags[i].name];
			}
		}
		
		if (name && !taggedName) {
			tags[tags.length] = tag.fromTagText('name ' + name);
		}
		
		if (denom && !taggedDenom) {
			tags[tags.length] = tag.fromTagText('denom ' + denom);
		}
		
		if (memberof && !taggedMemberof) {
			tags[tags.length] = tag.fromTagText('memberof ' + memberof+'ZZZ_2');
		}
	}
	
	function postprocess(doclet) {
		if ( doclet.hasTag('class') && !doclet.hasTag('constructor') ) {
			doclet.tags[doclet.tags.length] = tag.fromTagText('denom constructor');
		}
		
		if ( doclet.hasTag('enum')) {
			if (!doclet.hasTag('type')) {
				doclet.tags[doclet.tags.length] = tag.fromTagText('type number');
			}
			
			if (!doclet.hasTag('readonly') && !doclet.hasTag('const')) {
				doclet.tags[doclet.tags.length] = tag.fromTagText('attribute constant');
			}
		}
		
		if ( doclet.hasTag('const')) {
			if (!doclet.hasTag('denom')) {
				doclet.tags[doclet.tags.length] = tag.fromTagText('denom member');
			}
			
			if (!doclet.hasTag('readonly') && !doclet.hasTag('const')) {
				doclet.tags[doclet.tags.length] = tag.fromTagText('attribute constant');
			}
		}
	}
	
	function DocTagConflictError(message) {
		this.name = "DocTagConflictError";
		this.message = (message || "");
	}
	DocTagConflictError.prototype = Error.prototype;

})();