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
			doclet;
		
		commentSrc = unwrapComment(commentSrc);
		commentSrc = fixDesc(commentSrc);
		
		tags = parseTags(commentSrc);
		preprocess(tags);
		
		doclet = new Doclet(tags);
		
		postprocess(doclet);

		name.resolve(doclet);
		
		doclet.meta = { file: sourceName };
		if (node) { doclet.meta.line = node.getLineno(); }
		
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
			if (exportTags.indexOf(this.tags[i].name) === -1) { continue; }
		
			tag = this.tags[i];
			tagName = tag.name;
			tagValue = {};
			 
			if (tag.type) {
				tagValue.type = tag.type;
				// not a long tag
				if (!tag.pname && tag.text) { tagValue.text = tag.text; }
			}
			// a long tag
			if (tag.pname) { tagValue.name = tag.pname; }
			if (tag.pdesc) { tagValue.desc = tag.pdesc; }
			
			// tag value is not an object, it's just a simple string
			if (!tag.pname && !tag.type) { tagValue = tag.text; }
			
			if (!o[tagName]) { o[tagName] = tagValue; }
			else if (o[tagName].push) { o[tagName].push(tagValue); }
			else {
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
			taggedKind = '',
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
				if (name && name !== tags[i].text) { tooManyNames(name, tags[i].text); }
				taggedName = name = tags[i].text;
			}
			else if (tags[i].name === 'denom') {
				if (denom && denom !== tags[i].text) { tooManyKinds(denom, tags[i].text); }
				taggedKind = denom = tags[i].text;
			}
			else if (tags[i].name === 'memberof') {
				if (memberof) { tooManyTags('memberof'); }
				taggedMemberof = memberof = tags[i].text;
			}
			
			if ( nameables.indexOf(tags[i].name) > -1 ) {
				if (tags[i].text) {
					if (name && name !== tags[i].text) { tooManyNames(name, tags[i].text); }
					name = tags[i].text;
				}
				
				if (tags[i].pdesc) {
					tags[tags.length] = tag.fromTagText('desc ' + tags[i].pdesc);
				}
				
				if (tags[i].type) {
					tags[tags.length] = tag.fromTagText('type ' + tags[i].type);
				}
				
				if (denom && denom !== tags[i].name) { tooManyKinds(denom, tags[i].name); }
				denom = tags[i].name;
				if (denom === 'const') { denom = 'member'; } // an exception to the namebale rule
			}
			
			if ( memberofs.hasOwnProperty(tags[i].name) ) {
				if (tags[i].text) {
					if (memberof) { tooManyTags(tags[i].name); }
					memberof = tags[i].text;
				}
				
				if (denom && denom !== memberofs[tags[i].name]) { tooManyKinds(denom, memberofs[tags[i].name]); }
				denom = memberofs[tags[i].name];
			}
		}
		
		if (name && !taggedName) {
			tags[tags.length] = tag.fromTagText('name ' + name);
		}
		
		if (denom && !taggedKind) {
			tags[tags.length] = tag.fromTagText('denom ' + denom);
		}
		
		if (memberof && !taggedMemberof) {
			tags[tags.length] = tag.fromTagText('memberof ' + memberof);
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
	
	/**
		Throw error when two conflicting names are defined in the same doc.
	 	@private
		@function tooManyNames
	 */
	function tooManyNames(name1, name2) {
		throw new Error('Conflicting names in documentation: '+name1+', '+name2);
	}
	
	/**
		Throw error when two conflicting kinds are defined in the same doc.
	 	@private
		@function tooManyKinds
	 */
	function tooManyKinds(kind1, kind2) {
		throw new Error('Conflicting kinds in documentation: '+kind1+', '+kind2);
	}
	
	/**
		Throw error when conflicting tags are found.
		@private
		@function tooManyTags
	 */
	function tooManyTags(tagName) {
		throw new Error('Symbol has too many tags of type: @'+tagName);
	}
})();