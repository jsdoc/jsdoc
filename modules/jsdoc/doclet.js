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
		parse_tag = require('jsdoc/tag');
	
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
		
		tags = parse_tag.parse(commentSrc);

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
		Return the text of the last tag with the given name.
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
			this.tags.push( parse_tag.fromTagText(tagName + ' ' + text) );
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
	var exportTags = ['name', 'path', 'isa', 'desc', 'type', 'param', 'returns', 'exports', 'requires', 'memberof', 'access', 'attribute', 'example', 'see'];
	
	/**
		Get a JSON-compatible object representing this Doclet.
		@method Doclet#toObject
		@param {string} [flavor='json'] Either: jason or xml.
		@returns {Object}
	 */
	Doclet.prototype.toObject = function(/*todo*/flavor) {
		var tag, tagName, tagValue,
			o = {};
		
		for (var i = 0, leni = this.tags.length; i < leni; i++) {
			tag = this.tags[i];

			if ( exportTags.indexOf(tag.name) === -1 ) { continue; }
		
			tagName = tag.name;
			tagValue = {};

			// a long tag, like a @param
			if (tag.pname) {
				tagValue.name = tag.pname; // the parameter name
			}
			if (tag.type && tag.type.length) {
				tagValue.type = tag.type;
			}
			if (tag.pdesc) { tagValue.desc = tag.pdesc; }
			if (typeof tag.poptional === 'boolean') { tagValue.optional = tag.poptional; }
			if (typeof tag.pnullable === 'boolean') { tagValue.nullable = tag.pnullable; }
			if (typeof tag.pdefault !== 'undefined') { tagValue.defaultvalue = tag.pdefault; }
			
			// tag value is not an object, it's just a simple string
			if (!tag.pname && !tag.pdesc && !(tag.type && tag.type.length)) { // TODO: should check the list instead?
				if (flavor === 'xml' && tagName === 'example') {
					tagValue['#cdata'] = tag.text; // TODO this is only meaningful to XML, move to a tag.format(style) method?
				}
				else {
					tagValue = tag.text;
				}
			}

			if (tagValue) {
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
	
		// note: keep trailing whitespace for @examples
		// extra opening/closing stars are ignored
		// left margin is considered a star and a space
		// use the /m flag on regex to avoid having to guess what this platform's newline is
		commentSrc =
			commentSrc.replace(/^\/\*\*+/, '') // remove opening slash+stars
			.replace(/\**\*\/$/, "\\Z")        // replace closing star slash with end-marker
			.replace(/^\s*(\* ?|\\Z)/gm, '')   // remove left margin like: spaces+star or spaces+end-marker
			.replace(/\s*\\Z$/g, '');          // remove end-marker

		return commentSrc;
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
	
	// other tags that can provide the memberof
	var memberofs = {methodof: 'method', propertyof: 'property', eventof: 'event'};
	// other tags that can provide the symbol name
	var nameables = ['constructor', 'const', 'module', 'event', 'namespace', 'method', 'property', 'function', 'variable', 'enum'];
	
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
			isa = '',
			taggedDenom = '',
			memberof = '',
			taggedMemberof = '';
		
		for (var i = 0, leni = tags.length; i < leni; i++) {
		
 			if (tags[i].name === 'private') {
 				tags[tags.length] = parse_tag.fromTagText('access private');
 			}
 			else if (tags[i].name === 'protected') {
 				tags[tags.length] = parse_tag.fromTagText('access protected');
 			}
 			else if (tags[i].name === 'public') {
 				tags[tags.length] = parse_tag.fromTagText('access public');
 			}
 			else if (tags[i].name === 'const') {
 				tags[tags.length] = parse_tag.fromTagText('attribute constant');
 			}
 			else if (tags[i].name === 'readonly') {
 				tags[tags.length] = parse_tag.fromTagText('attribute readonly');
 			}
			else if (tags[i].name === 'name') {
				if (name && name !== tags[i].text) {
					throw new DocTagConflictError('Conflicting names in documentation: '+name+', '+tags[i].text);
				}
				taggedName = name = tags[i].text;
			}
			else if (tags[i].name === 'isa') {
				if (isa && isa !== tags[i].text) {
					throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + isa + ' and ' + tags[i].text);
				}
				taggedDenom = isa = tags[i].text;
			}
			else if (tags[i].name === 'memberof') {
				if (memberof) {
					throw new DocTagConflictError('doclet has too many tags of type: @memberof.');
				}
				taggedMemberof = memberof = tags[i].text;
			}
			
			if ( nameables.indexOf(tags[i].name) > -1 ) {
				if (tags[i].name === 'property' && (isa === 'constructor')) {
					// for backwards compatability we ignore a @property in a doclet after a @constructor
				}
				else {
					if (tags[i].text) {
						if (name && name !== tags[i].text) {
							throw new DocTagConflictError('Conflicting names in documentation: '+name+', '+tags[i].text);
						}
						name = tags[i].text;
					}
				
					if (tags[i].pdesc) {
						tags[tags.length] = parse_tag.fromTagText('desc ' + tags[i].pdesc);
					}
				
					if (tags[i].type) {
						tags[tags.length] = parse_tag.fromTagText('type ' + tags[i].type.join('|'));
					}
				
					if (isa && isa !== tags[i].name) {
						throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + isa + ' and ' + tags[i].name);
					}
					isa = tags[i].name;
					if (isa === 'const') { isa = 'property'; } // an exception to the namebale rule
				}
			}
			
			if ( memberofs.hasOwnProperty(tags[i].name) ) {
				if (tags[i].text) {
					if (memberof) {
						throw new DocTagConflictError('doclet has too many tags of type: @memberof.');
					}
					memberof = tags[i].text;
				}
				
				if (isa && isa !== memberofs[tags[i].name]) {
					throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + isa + ' and ' + tags[i].name);
				}
				isa = memberofs[tags[i].name];
			}
		}
		
		if (name && !taggedName) {
			tags[tags.length] = parse_tag.fromTagText('name ' + name);
		}
		
		if (isa && !taggedDenom) {
			tags[tags.length] = parse_tag.fromTagText('isa ' + isa);
		}
		
		if (memberof && !taggedMemberof) {
			tags[tags.length] = parse_tag.fromTagText('memberof ' + memberof);
		}
	}
	
	function postprocess(doclet) {
		if ( doclet.hasTag('class') && !doclet.hasTag('constructor') ) {
			doclet.tags[doclet.tags.length] = parse_tag.fromTagText('isa constructor');
		}
		
		if ( doclet.hasTag('enum')) {
			if (!doclet.hasTag('type')) {
				doclet.tags[doclet.tags.length] = parse_tag.fromTagText('type number');
			}
			
			if (!doclet.hasTag('readonly') && !doclet.hasTag('const')) {
				doclet.tags[doclet.tags.length] = parse_tag.fromTagText('attribute constant');
			}
		}
		
		if ( doclet.hasTag('const')) {
			if (!doclet.hasTag('isa')) {
				doclet.tags[doclet.tags.length] = parse_tag.fromTagText('isa property');
			}
			
			if (!doclet.hasTag('readonly') && !doclet.hasTag('const')) {
				doclet.tags[doclet.tags.length] = parse_tag.fromTagText('attribute constant');
			}
		}
	}
	
	function DocTagConflictError(message) {
		this.name = "DocTagConflictError";
		this.message = (message || "");
	}
	DocTagConflictError.prototype = Error.prototype;

})();