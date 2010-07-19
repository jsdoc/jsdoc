/**
	@overview Describes about the various differnt types of tags.
 */

(function() {
	var TagDictionary = exports,
		tagDefinitions = {};
	
	TagDictionary.lookUp = function(title) {
		return tagDefinitions['@'+title] || {};
	}
	
	TagDictionary.synonyms = {
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
		'preserve':    'ignore',
		'license':     'ignore'
	};
	
	TagDictionary.resolveSynonyms = function(name) {
		if ( TagDictionary.synonyms.hasOwnProperty(name) ) {
			return TagDictionary.synonyms[name];
		}
		else {
			return name;
		}
	}
	
	/** @constructor */
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
		setsDocletIsa     : false, // the name of this tag is used to define the doclet's isa property
		setsDocletDesc    : false,
		setsDocletName    : false, // this tag can be used to name the doclet
		setsDocletAccess  : false, // the name of this tag becomes the access of the doclet
		setsDocletType    : false, // the type of this tag becomes th type of the doclet
		setsDocletDocspace: false, // the name of this tag becomes the docspace for the doclet name, like "event:"
		canHaveType       : false, // this tag can have a {type}
		canHavePname      : false, // this tag can have a parameter-type name
		canHavePdesc      : false, // this tag can have a parameter-type desc
		keepsWhitespace   : false, // don't try to tidy up the whitespace in this tag?
		impliesTag        : false  // this tag implies another tag
	};

	/** Syntax: @attribute <text>
		@property {TagDefinition} attribute
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('attribute', {
		isExported: true
	});
	
	/** Syntax: @desc <text>
		@property {TagDefinition} desc
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('desc', { // t
		isExported: true
	});
	
	/** Syntax: @isa <text>
		@property {TagDefinition} isa
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('isa', {
		isExported: true
	});
	
	/** Syntax: @name <docletName>
		@property {TagDefinition} name
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('name', {
		isExported: true
	});
	
	/** Syntax: @path <text>
		@property {TagDefinition} path
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('path', {
		isExported: true
	});
	
	/** Syntax: @memberOf <text>
		@property {TagDefinition} memberof
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('memberof', { //t
		isExported: true
	});
	
	/** Syntax: @namespace <docletType> <docletName>
		@property {TagDefinition} namespace
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('namespace', { //t
		canHaveType: true,
		setsDocletType: true,
		setsDocletIsa: true,
		setsDocletName: true
	});
	
	/** Syntax: @constructor <docletName>
		@property {TagDefinition} constructor
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('constructor', { //t
		setsDocletIsa: true,
		setsDocletName: true
	});
	
	/** Syntax: @classdesc|class <text>
		@property {TagDefinition} class
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('classdesc', { //t
		isExported: true,
		impliesTag: 'constructor'
	});
	
	/** Syntax: @constant|const <docletType> <docletName>
		@property {TagDefinition} constant
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('constant', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletIsa: true,
		setsDocletName: true
	});
	
	/** Syntax: @enum <docletType> <docletName>
		@property {TagDefinition} enum
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('enum', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletIsa: true,
		setsDocletName: true
	});
	
	/** Syntax: @file|overview|fileoverview <docletName>
		@property {TagDefinition} file
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('file', { //t
		setsDocletIsa: true,
		setsDocletDesc: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @method|function <returnType> <docletName> <docletDesc>
		@property {TagDefinition} method
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('method', { //t
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true
	});
	
	/** Syntax: @property <docletType> <docletName> <docletDesc>
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
		@property {TagDefinition} event
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('event', {
		setsDocletIsa: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @module <docletName>
		@property {TagDefinition} module
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('module', {
		setsDocletIsa: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @example <text>
		@property {TagDefinition} example
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('example', {
		isExported: true,
		keepsWhitespace: true
	});
	
	/** Syntax: @param <type> <pname> <pdesc>
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
		@property {TagDefinition} type
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('type', { //t
		isExported: true,
		canHaveType: true
	});
	
	/** Syntax: @returns|return <returnType> <text>
		@property {TagDefinition} returns
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('returns', { //t
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
	/** Syntax: @thisobj|this <thisobjType> <text>
		@property {TagDefinition} thisobj
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('thisobj', { //t
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
	/** Syntax: @access <docletAccess>
		@property {TagDefinition} access
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('access', {
		isExported: true
	});
	
	/** Syntax: @private
		@property {TagDefinition} private
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('private', {
		setsDocletAccess: true
	});
	
	/** Syntax: @protected
		@property {TagDefinition} protected
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('protected', {
		setsDocletAccess: true
	});
	
	/** Syntax: @readonly
		@property {TagDefinition} readonly
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('readonly', {
		setsDocletAccess: true
	});
	
	/** Syntax: @inner
		@property {TagDefinition} inner
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('inner', {
		setsDocletAccess: true
	});
	
	/** Syntax: @public
		@property {TagDefinition} public
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('public', {
		setsDocletAccess: true
	});
	
	/** Syntax: @exception|throws <text>
		@property {TagDefinition} exception
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('exception', {
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
	/** Syntax: @fires <text>
		@property {TagDefinition} fires
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('fires', { //t
		isExported: true
	});
	
	/** Syntax: @uses <text>
		@property {TagDefinition} uses
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('uses', {
		isExported: true
	});
	
	/** Syntax: @extends|augments <type>
		@property {TagDefinition} extends
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('extends', {
		isExported: true
	});
	
	/** Syntax: @author <text>
		@property {TagDefinition} author
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('author', {
		isExported: true
	});
	
	/** Syntax: @since <text>
		@property {TagDefinition} since
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('since', {
		isExported: true
	});
	
	/** Syntax: @version <text>
		@property {TagDefinition} version
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('version', {
		isExported: true
	});
	
	/** Syntax: @api <text>
		@property {TagDefinition} api
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('api', {
		isExported: true
	});
	
	/** Syntax: @deprecated <text>
		@property {TagDefinition} deprecated
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('deprecated', {
		isExported: true
	});
	
	/** Syntax: @requires <text>
		@property {TagDefinition} requires
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('requires', {
		isExported: true
	});
	
	/** Syntax: @see <text>
		@property {TagDefinition} see
		@memberOf module:jsdoc/tagdictionary.tagDefinitions
	 */
	 new TagDefinition('see', {
		isExported: true
	});
})();