/**
	@overview Defines the various different types of tags recognized by JSDoc.
 */

(function() {
	/**
		@module jsdoc/tagdictionary
	 */
	var tagDefinitions = {};
	
	/**
		@method module:jsdoc/tagdictionary.lookup
		@param tagTitle Like "param" or "desc"
		@returns {TagDefinition} The definition for that tag or an empty object.
	 */
	exports.lookUp = function(tagTitle) {
		return tagDefinitions['@'+tagTitle] || {};
	}
	
	exports.synonyms = {
		/*synonym   =>  canonical*/
		'description': 'desc',
		'function':    'method',
		'var':         'property',
		'field':       'property',
		'return':      'returns',
		'member':      'memberof',
		'overview':    'file',
		'fileoverview':'file',
		'const':       'constant',
		'augments':    'extends',
		'throws':      'exception',
		'class':       'classdesc',
		'this':        'thisobj',
		'preserve':    'ignore'
	};
	
	exports.resolveSynonyms = function(name) {
		if ( exports.synonyms.hasOwnProperty(name) ) {
			return exports.synonyms[name];
		}
		else {
			return name;
		}
	}
	
	/** @inner
		@constructor
		@member module:jsdoc/tagdictionary
	*/
	function TagDefinition(title, opts) {
		this.title = title;
		
		for (var p in opts) {
			if (typeof opts[p] !== 'undefined') {
				this[p] = opts[p];
			}
		}
		
		tagDefinitions['@'+title] = this;
	}
	
	// default properties of all tags
	TagDefinition.prototype = {
		isExported        : false, // this tag should appear as a top level property in the doclet?
		setsDocletKind    : false, // the name of this tag is used to define the doclet's kind property
		setsDocletDesc    : false,
		setsDocletName    : false, // this tag can be used to name the doclet
		setsDocletAttrib  : false, // the name of this tag becomes the attribute of the doclet
		setsDocletScope   : false,
		setsDocletType    : false, // the type of this tag becomes th type of the doclet
		setsDocletDocspace: false, // the name of this tag becomes the docspace for the doclet name, like "event:"
		canHaveType       : false, // this tag can have a {type}
		canHavePname      : false, // this tag can have a parameter-type name
		canHavePdesc      : false, // this tag can have a parameter-type desc
		keepsWhitespace   : false, // don't try to tidy up the whitespace in this tag?
		impliesTag        : false, // this tag implies another tag
		isScalar          : false  // can only have a single value (first wins)
	};

	/** Syntax: @access <text> (private|public|protected)
		@private
		@inner
		@property {TagDefinition} access
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('access', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @scope <text> (global|static|inner|instance)
		@private
		@inner
		@property {TagDefinition} scope
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('scope', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @desc <text>
		@inner
		@property {TagDefinition} desc
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('desc', { // t
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @kind <text>
		@private
		@inner
		@property {TagDefinition} kind
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('kind', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @name <docletName>
		@inner
		@property {TagDefinition} name
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('name', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @path <text>
		@private
		@inner
		@property {TagDefinition} path
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('path', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @memberOf <text>
		@inner
		@property {TagDefinition} memberof
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('memberof', { //t
		isExported: true
	});
	
	/** Syntax: @namespace <docletType> <docletName>
		@inner
		@property {TagDefinition} namespace
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('namespace', { //t
		canHaveType: true,
		setsDocletType: true,
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @constructor <docletName>
		@inner
		@property {TagDefinition} constructor
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('constructor', { //t
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @classdesc|class <text>
		@inner
		@property {TagDefinition} classdesc
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('classdesc', { //t
		isExported: true,
		impliesTag: 'constructor',
		isScalar: true
	});
	
	/** Syntax: @constant|const <docletType> <docletName>
		@inner
		@property {TagDefinition} constant
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('constant', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @enum <docletType> <docletName>
		@inner
		@property {TagDefinition} enum
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('enum', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @file|overview|fileoverview <docletName>
		@inner
		@property {TagDefinition} file
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('file', { //t
		setsDocletKind: true,
		setsDocletDesc: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @method|function <returnType> <docletName> <docletDesc>
		@inner
		@property {TagDefinition} method
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('method', { //t
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true
	});
	
	/** Syntax: @inner
		@property|field|var <docletType> <docletName> <docletDesc>
		@inner
		@property {TagDefinition} property
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('property', { //t
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true,
		setsDocletType: true
	});
	
	/** Syntax: @event <docletName>
		@inner
		@property {TagDefinition} event
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('event', {
		setsDocletKind: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @module <docletName>
		@inner
		@property {TagDefinition} module
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('module', {
		setsDocletKind: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @example <text>
		@inner
		@property {TagDefinition} example
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('example', {
		isExported: true,
		keepsWhitespace: true
	});
	
	/** Syntax: @param <type> <pname> <pdesc>
		@inner
		@property {TagDefinition} param
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('param', {
		isExported: true,
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true
	});
	
	/** Syntax: @type <type>
		@inner
		@property {TagDefinition} type
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('type', { //t
		isExported: true,
		canHaveType: true
	});
	
	/** Syntax: @returns|return <returnType> <text>
		@inner
		@property {TagDefinition} returns
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('returns', { //t
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
	/** Syntax: @thisobj|this <thisobjType> <text>
		@inner
		@property {TagDefinition} thisobj
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('thisobj', { //t
		isExported: true,
		canHaveType: true,
		canHavePdesc: true,
		isScalar: true
	});
	
	/** Syntax: @attrib <docletAttrib> (readonly)
		@private
		@inner
		@property {TagDefinition} attrib
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('attrib', {
		isExported: true
	});
	
	/** Syntax: @private
		@inner
		@property {TagDefinition} private
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('private', {
		setsDocletAccess: true
	});
	
	/** Syntax: @protected
		@inner
		@property {TagDefinition} protected
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('protected', {
		setsDocletAccess: true
	});
	
	/** Syntax: @public
		@inner
		@property {TagDefinition} public
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('public', {
		setsDocletAccess: true
	});
	
	/** Syntax: @readonly
		@inner
		@property {TagDefinition} readonly
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('readonly', {
		setsDocletAttrib: true
	});
	
	/** Syntax: @inner
		@inner
		@property {TagDefinition} inner
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('inner', {
		setsDocletScope: true
	});
	
	/** Syntax: @static
		@inner
		@property {TagDefinition} static
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('static', {
		setsDocletScope: true
	});
	
	/** Syntax: @global
		@inner
		@property {TagDefinition} global
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('global', {
		setsDocletScope: true
	});
	
	/** Syntax: @instance
		@inner
		@property {TagDefinition} instance
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('instance', {
		setsDocletScope: true
	});
	
	/** Syntax: @exception|throws {type} <text>
		@inner
		@property {TagDefinition} exception
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('exception', {
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
	/** Syntax: @fires <text>
		@inner
		@property {TagDefinition} fires <text>
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('fires', { //t
		isExported: true
	});
	
	/** Syntax: @extends|augments <type>
		@inner
		@property {TagDefinition} extends
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('extends', {
		isExported: true
	});
	
	/** Syntax: @author <text>
		@inner
		@property {TagDefinition} author
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('author', {
		isExported: true
	});
	
	/** Syntax: @since <text>
		@inner
		@property {TagDefinition} since
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('since', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @version <text>
		@inner
		@property {TagDefinition} version
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('version', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @requires <text>
		@inner
		@property {TagDefinition} requires
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('requires', {
		isExported: true
	});
	
	/** Syntax: @tag <tagname> <tagtext>
		@inner
		@property {TagDefinition} tag
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('tag', {
		isExported: true,
		canHavePname: true,
		canHavePdesc: true
	});
	
	/** Syntax: @deprecated <text>
		@inner
		@property {TagDefinition} deprecated
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('deprecated', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @see <text>
		@inner
		@property {TagDefinition} see
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('see', {
		isExported: true
	});
})();