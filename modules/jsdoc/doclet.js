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
		parse_tag = require('jsdoc/tag'),
		tagDictionary = require('jsdoc/tagdictionary');
	
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
			preprocess(tags, meta);
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
		this.setTag('name', nameToSet);

		nameToSet = name.resolve(this);
	}
	
	/**
		Return the value of the last tag with the given name.
		@method Doclet#tagValue
		@param {String} tagName
		@returns {*} The value of the found tag.
	 */
	Doclet.prototype.tagValue = function(tagName) {
		for (var i = 0, leni = this.tags.length; i < leni; i++) {
			if (this.tags[i].name === tagName) {
				return this.tags[i].value;
			}
		}
		
		return null;
	}
	
	
	/**
		Return the value of the last tag with the given name.
		@method Doclet#setTag
		@param {String} tagName
		@returns {*} The value of the found tag.
	 */
	Doclet.prototype.setTag = function(tagName, tagValue) {

		for (var i = 0, leni = this.tags.length; i < leni; i++) {
			if (this.tags[i].name === tagName) {
				this.tags[i].value = tagValue;
				return ;
			}
		}

		this.tags[this.tags.length] = parse_tag.fromText(tagName + ' ' + tagValue);
	}
	
	/**
		Return the first tag with the given name.
		@method Doclet#getTag
		@param {String} tagName
		@returns {Tag} The irst found tag with that name.
	 */
	Doclet.prototype.getTag = function(tagName) {
		for (var i = 0, leni = this.tags.length; i < leni; i++) {
			if (this.tags[i].name === tagName) {
				return this.tags[i];
			}
		}
		
		return null;
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
	
	/**
		Get a JSON-compatible object representing this Doclet.
		@method Doclet#toObject
		@param {string} [flavor='json'] Either: jason or xml.
		@returns {Object}
	 */
	Doclet.prototype.toObject = function(/*todo*/flavor) {
		var tag, tagName, tagValue, tagAbout,
			o = {};
		
		for (var i = 0, leni = this.tags.length; i < leni; i++) {
			tag = this.tags[i];
			tagName = tag.name;
			tagValue = {};
			tagAbout = tagDictionary.lookUp(tagName);
			
			if (!tagAbout.isExported) { continue; }

			// a long tag, like a @param
			if (tag.pname) {
				tagValue.name = tag.pname; // the parameter name
			}
			if (tag.type && tag.type.length && tag.type[0] !== '') {
				tagValue.type = tag.type;
			}
			if (tag.pdesc) { tagValue.desc = tag.pdesc; }
			if (typeof tag.poptional === 'boolean') { tagValue.optional = tag.poptional; }
			if (typeof tag.pnullable === 'boolean') { tagValue.nullable = tag.pnullable; }
			if (typeof tag.pdefault !== 'undefined') { tagValue.defaultvalue = tag.pdefault; }
			
			// tag value is not an object, it's just a simple string
			if (!tag.pname && !tag.pdesc && !(tag.type && tag.type.length)) { // TODO: should check the list instead?
				if (flavor === 'xml' && tagName === 'example') {
					tagValue['#cdata'] = tag.value; // TODO this is only meaningful to XML, move to a tag.format(style) method?
				}
				else {
					tagValue = tag.value;
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
	
	/**
		Expand some shortcut tags. Modifies the tags argument in-place.
		@private
		@method preprocess
		@param {Array.<Object>} tags
		@returns undefined
	 */
	function preprocess(tags, meta) {
		var name = '',
			taggedName = '',
			isa = '',
			taggedIsa = '',
			memberof = '',
			taggedMemberof = '',
			isFile = false, // TODO this should be handled by an event handler in tag dictionary
			tagAbout;
		
		for (var i = 0; i < tags.length; i++) {
			tagAbout = tagDictionary.lookUp(tags[i].name);
			
			if (tagAbout.setsDocletAccess) {
print('>>>> set access to '+tags[i].name);
				tags[tags.length] = parse_tag.fromText('access '+tags[i].name);
			}
			
			if (tagAbout.impliesTag) { // TODO allow a template string?
 				tags[tags.length] = parse_tag.fromText(tagAbout.impliesTag);
 			}
 			
 			if (tags[i].name === 'name') {
				if (name && name !== tags[i].value) {
					throw new DocTagConflictError('Conflicting names in documentation: "'+name+'", and "'+tags[i].value+'"');
				}
				taggedName = name = tags[i].value;
			}
			else if (tags[i].name === 'isa') {
				if (isa && isa !== tags[i].value) {
					throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + isa + ' and ' + tags[i].value);
				}
				taggedIsa = isa = tags[i].value;
			}
			else if (tags[i].name === 'memberof') {
				if (memberof) {
					throw new DocTagConflictError('doclet has too many tags of type: @memberof.');
				}
				taggedMemberof = memberof = tags[i].value;
			}
			
			if ( tagAbout.setsDocletName/*nameables.indexOf(tags[i].name) > -1*/ ) {
				if (tags[i].name === 'property' && (isa === 'constructor')) {
					// to avoid backwards compatability conflicts we just ignore a @property in a doclet after a @constructor
				}
				else if (tags[i].name === 'file') {
					isFile = true;
 					isa = 'file';
				}
				else {
					if (tags[i].value) {
						if (name && name !== tags[i].value) {
							throw new DocTagConflictError('Conflicting names in documentation: "'+name+'", and "'+tags[i].value+'"');
						}
						name = tags[i].value;
					}
				
					if (tags[i].pdesc) {
						tags[tags.length] = parse_tag.fromText('desc ' + tags[i].pdesc);
					}
				
					if (isa && isa !== tags[i].name) {
						throw new DocTagConflictError('Symbol has too many denominations, cannot be both: ' + isa + ' and ' + tags[i].name);
					}
					isa = tags[i].name;
				}
			}
		}
		
		if (name && !taggedName) {
			tags[tags.length] = parse_tag.fromText('name ' + name);
		}
		
		if ( isFile && !(name || taggedName) ) {
			tags[tags.length] = parse_tag.fromText('name file:'+meta.file+'');
		}
		
		if (isa && !taggedIsa) {
			tags[tags.length] = parse_tag.fromText('isa ' + isa);
		}
		
		if (memberof && !taggedMemberof) {
			tags[tags.length] = parse_tag.fromText('memberof ' + memberof);
		}
	}

// TODO should iterate over the tags here rather than letting doclet decide
// which ones to pick and choose from. the tag dictionary should tell us what to do
	
	// now that we have a doclet object we can do some final  adjustments
	function postprocess(doclet) {
		var tags = doclet.tags;
		
		for (var i = 0, leni = tags.length; i < leni; i++) {
			tagAbout = tagDictionary.lookUp(tags[i].name);
			
			
		// class tags imply a constructor tag
		if (tags[i].name === 'class' && !doclet.hasTag('constructor') ) {
			doclet.tags[doclet.tags.length] = parse_tag.fromText('isa constructor');
		}
		
		// enums have a defualt type of number
		if (tags[i].name === 'enum') {
			if ( !doclet.hasTag('type') ) {
				doclet.tags[doclet.tags.length] = parse_tag.fromText('type number');
			}
		}
				
		if ( tagAbout.setsDocletType ) {
			if ( doclet.hasTag('type') ) {
				DocTagConflictError('Cannot set the type of a doclet more than once.')
			}
				var docletTypes = [];
				if (tags[i].type) {
					if (typeof tags[i].type === 'string') docletTypes = [tags[i].type];
					else docletTypes = tags[i].type;
					
					for (var i = 0, leni = docletTypes.length; i < leni; i++) {
						doclet.tags[doclet.tags.length] = parse_tag.fromText('type '+docletTypes[i]);
					}
				}
			}
		}
	}
	
	function DocTagConflictError(message) {
		this.name = 'DocTagConflictError';
		this.message = (message || '');
	}
	DocTagConflictError.prototype = Error.prototype;

})();