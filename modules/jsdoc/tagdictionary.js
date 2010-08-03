/**
	@overview Defines the various different types of tags recognized by JSDoc.
 */

(function() {
	/**
		@module jsdoc/tagdictionary
	 */
	
	/** @namespace
		@inner
		@member module:jsdoc/tagdictionary
	 */
	var tagDefinitions = {};
	
	/**
		Return a tag definition for the tag with the given title.
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
	
	/** 
		@deprecated
		@memberOf module:jsdoc/tagdictionary
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
		isScalar          : false, // can only have a single value (first wins)
		forceArray        : false, // must always be an array,
		typeIsValue       : false,
		exportName        : ''     // what name will this tag be exported as (defaults to tag name)
	};

	/** Syntax: @access <text> (private|public|protected)
		@private
		@property {module:jsdoc/tagdictionary~TagDefinition} access
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('access', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @scope <text> (global|static|inner|instance)
		@private
		@property {module:jsdoc/tagdictionary~TagDefinition} scope
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('scope', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @desc <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} desc
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('desc', { // t
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @kind <text>
		@private
		@property {module:jsdoc/tagdictionary~TagDefinition} kind
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('kind', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @name <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} name
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('name', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @path <text>
		@private
		@property {module:jsdoc/tagdictionary~TagDefinition} path
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('path', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @memberOf <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} memberof
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('memberof', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @namespace <docletType> <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} namespace
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('namespace', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @constructor <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} constructor
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('constructor', {
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @classdesc|class <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} classdesc
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('classdesc', {
		isExported: true,
		impliesTag: 'constructor',
		isScalar: true
	});
	
	/** Syntax: @constant|const <docletType> <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} constant
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('constant', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @enum <docletType> <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} enum
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('enum', {
		canHaveType: true,
		setsDocletType: true,
		setsDocletKind: true,
		setsDocletName: true
	});
	
	/** Syntax: @file|overview|fileoverview <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} file
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('file', {
		setsDocletKind: true,
		setsDocletDesc: true,
		setsDocletName: true,
		setsDocletDocspace: true,
		impliesTag: 'scope global'
	});
	
	/** Syntax: @method|function <returnType> <docletName> <docletDesc>
		@property {module:jsdoc/tagdictionary~TagDefinition} method
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('method', {
		canHaveType: true,
		setsDocletKind: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true
	});
	
	/** Syntax: @mixin <docletType> <docletName> <docletDesc>
		@property {module:jsdoc/tagdictionary~TagDefinition} mixin
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('mixin', {
		setsDocletKind: true,
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true,
		setsDocletType: true
	});
	
	/** Syntax: @property|field|var <docletType> <docletName> <docletDesc>
		@property {module:jsdoc/tagdictionary~TagDefinition} property
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('property', {
	 	setsDocletKind: true,
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true,
		setsDocletType: true
	});
	
	/** Syntax: @interface <type> <pname> <pdesc>
		@property {module:jsdoc/tagdictionary~TagDefinition} interface
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('interface', {
	 	setsDocletKind: true,
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		setsDocletName: true,
		setsDocletType: true
	});
	
	/** Syntax: @event <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} event
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('event', {
		setsDocletKind: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @module <docletName>
		@property {module:jsdoc/tagdictionary~TagDefinition} module
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('module', {
		setsDocletKind: true,
		setsDocletName: true,
		setsDocletDocspace: true
	});
	
	/** Syntax: @example <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} example
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('example', {
		isExported: true,
		keepsWhitespace: true
	});
	
	/** Syntax: @param <type> <pname> <pdesc>
		@property {module:jsdoc/tagdictionary~TagDefinition} param
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('param', {
		isExported: true,
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		forceArray: true
	});
	
	/** Syntax: @type <type>
		@property {module:jsdoc/tagdictionary~TagDefinition} type
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('type', {
		isExported: true,
		canHaveType: true,
		typeIsValue: true
	});
	
	/** Syntax: @returns|return <returnType> <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} returns
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('returns', {
		isExported: true,
		canHaveType: true,
		canHavePdesc: true,
		isScalar: true
	});
	
	/** Syntax: @thisobj|this <thisobjType> <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} thisobj
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('thisobj', {
		isExported: true,
		canHaveType: true,
		typeIsValue: true,
		isScalar: true
	});
	
	/** Syntax: @attrib <docletAttrib> (readonly)
		@private
		@property {module:jsdoc/tagdictionary~TagDefinition} attrib
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('attrib', {
		isExported: true
	});
	
	/** Syntax: @private
		@property {module:jsdoc/tagdictionary~TagDefinition} private
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('private', {
		setsDocletAccess: true
	});
	
	/** Syntax: @protected
		@property {module:jsdoc/tagdictionary~TagDefinition} protected
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('protected', {
		setsDocletAccess: true
	});
	
	/** Syntax: @public
		@property {module:jsdoc/tagdictionary~TagDefinition} public
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('public', {
		setsDocletAccess: true
	});
	
	/** Syntax: @readonly
		@property {module:jsdoc/tagdictionary~TagDefinition} readonly
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('readonly', {
		setsDocletAttrib: true
	});
	
	/** Syntax: @inner
		@property {module:jsdoc/tagdictionary~TagDefinition} inner
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('inner', {
		setsDocletScope: true
	});
	
	/** Syntax: @static
		@property {module:jsdoc/tagdictionary~TagDefinition} static
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('static', {
		setsDocletScope: true
	});
	
	/** Syntax: @global
		@property {module:jsdoc/tagdictionary~TagDefinition} global
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('global', {
		setsDocletScope: true
	});
	
	/** Syntax: @instance
		@property {module:jsdoc/tagdictionary~TagDefinition} instance
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('instance', {
		setsDocletScope: true
	});
	
	/** Syntax: @exception|throws {type} <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} exception
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('exception', {
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
	/** Syntax: @fires <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} fires <text>
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('fires', {
		isExported: true
	});
	
	/** Syntax: @extends|augments <type>
		@property {module:jsdoc/tagdictionary~TagDefinition} extends
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('extends', {
		isExported: true
	});
	
	/** Syntax: @author <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} author
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('author', {
		isExported: true
	});
	
	/** Syntax: @since <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} since
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('since', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @version <text>
		
		@property {module:jsdoc/tagdictionary~TagDefinition} version
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('version', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @requires <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} requires
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('requires', {
		isExported: true
	});
	
	/** Syntax: @tag <tagname> <tagtext>
		@property {module:jsdoc/tagdictionary~TagDefinition} tag
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('tag', {
		isExported: true,
		exportName: 'tags',
		forceArray: true
	});
	
	/** Syntax: @deprecated <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} deprecated
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('deprecated', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @see <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} see
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('see', {
		isExported: true
	});
	
	/** Syntax: @refersto <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} refersto
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('refersto', {
		isExported: true,
		isScalar: true
	});
	
	/** Syntax: @implements <text>
		@property {module:jsdoc/tagdictionary~TagDefinition} implements
		@memberOf module:jsdoc/tagdictionary~tagDefinitions
	 */
	 new TagDefinition('implements', {
		isExported: true,
		canHaveType: true,
		typeIsValue: true
	});
})();