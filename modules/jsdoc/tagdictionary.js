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
		'variable':    'property',
		'return':      'returns',
		'member':      'memberof',
		'overview':    'file',
		'fileoverview':'file'
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
	
//// default properties of all tags
	TagDefinition.prototype = {
		isExported     : false, // this tag should appear as a top level property in the doclet?
		canProvideIsa  : false, // the name of this tag is used to define the doclet's isa property
		canProvideName : false, // this tag can be used to name the doclet
		isDocspace     : false, // the name of this tag becomes the docspace for the doclet name, like "event:"
		canHaveType    : false, // this tag can have a {type}
		canHavePname   : false, // this tag can have a parameter-type name
		canHavePdesc   : false, // this tag can have a parameter-type desc
		keepsWhitespace: false  // don't try to tidy up the whitespace in this tag?
	};
	
//// default event handlers?
// 	TagDefinition.prototype.onAddTagToDoclet = function(tag, doclet) {
// 		if (this.canProvideIsa) {
// 			if (doclet.isa) {
// 				throw 'Overwriting existing isa in doclet: was "'+doclet.isa+'", now "'+this.title+'"';
// 			}
// 			doclet.isa = this.title;
// 		}
// 		
// 		if (this.canProvideName) {
// 			if (doclet.name) {
// 				throw 'Overwriting existing name in doclet: was "'+doclet.name+'", now "'+this.title+'"';
// 			}
// 			doclet.name = this.title;
// 		}
// 	}

	// @desc <text>
	new TagDefinition('desc', {
		isExported: true
	});
	
	// @isa <docletName>
	new TagDefinition('isa', {
		isExported: true
	});
	
	// @name <docletName>
	new TagDefinition('name', {
		isExported: true
	});
	
	// @path <text>
	new TagDefinition('path', {
		isExported: true
	});
	
	// @memberof <text>
	new TagDefinition('memberof', {
		isExported: true
	});
	
	// @namespace <docletName>
	new TagDefinition('namespace', {
		canProvideIsa: true,
		canProvideName: true
	});
	
	// @constructor <docletName>
	new TagDefinition('constructor', {
		canProvideIsa: true,
		canProvideName: true
	});
	
	// @const <docletName>
	new TagDefinition('const', {
		canProvideIsa: true,
		canProvideName: true
	});
	
	// @enum <docletName>
	new TagDefinition('enum', {
		canProvideIsa: true,
		canProvideName: true
	});
	
	// @file|overview|fileoverview <docletName>
	new TagDefinition('file', {
		canProvideIsa: true,
		canProvideName: true,
		isDocspace: true
	});
	
	// @method <docletType> <docletName> <docletDesc>
	new TagDefinition('method', {
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		canProvideName: true
	});
	
	// @property <docletType> <docletName> <docletDesc>
	new TagDefinition('property', {
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true,
		canProvideName: true
	});
	
	// @event <docletName>
	new TagDefinition('event', {
		canProvideIsa: true,
		canProvideName: true,
		isDocspace: true
	});
	
	// @module <docletName>
	new TagDefinition('module', {
		canProvideIsa: true,
		canProvideName: true,
		isDocspace: true
	});
	
	// @example <text>
	new TagDefinition('example', {
		isExported: true,
		keepsWhitespace: true
	});
	
	// @param <type> <pname> <pdesc>
	new TagDefinition('param', {
		isExported: true,
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true
	});
	
	// @type <type>
	new TagDefinition('type', {
		isExported: true,
		canHaveType: true
	});
	
	// @returns|return <type> <text>
	new TagDefinition('returns', {
		isExported: true,
		canHaveType: true,
		canHavePdesc: true
	});
	
})();