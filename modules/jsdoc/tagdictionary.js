/**
	@overview Provides information about the various differnt types of tags.
 */

(function() {
	/** */
	exports.TagDictionary = {};
	exports.TagDictionary.lookUp = function(tagTitle) {
		return this['@'+tagTitle] || {};
	}
	exports.TagDictionary.synonyms = {
	};
	
	/** */
	function TagDefinition(tagTitle, opts) {
		this.title = tagTitle;
		
		this.isIsa = false;          // the name of this tag is used to define the doclet's isa property
		this.canProvideName = false; // this tag can be used to name the doclet
		this.isDocspace = false;     // The name of this tag becomes the docspace for the doclet name, like event:
		this.canHaveType = false;    // this tag can have a {type}
		this.canHavePname = false;   // this tag can have a parameter-type name
		this.canHavePdesc = false;
		this.keepsWhitespace = false;
		
		for (var p in opts) {
			if (typeof opts[p] !== 'undefined') {
				this[p] = opts[p];
			}
		}
		
		exports.TagDictionary['@'+tagTitle] = this;
	}
	// event handlers?
	TagDefinition.prototype.onDoclet = function(tag, doclet) {
		if (this.isIsa) {
			if (doclet.isa) {
				throw 'Overwriting isa: "'+doclet.isa+'" with "'+this.title+'"';
			}
			doclet.isa = this.title;
		}
		
		if (this.canProvideName) {
			if (doclet.isa) {
				throw 'Overwriting isa: "'+doclet.isa+'" with "'+this.title+'"';
			}
			doclet.isa = this.title;
		}
	}
	
	new TagDefinition('namespace', {
		isIsa: true,
		canProvideName: true
	});
	
	new TagDefinition('constructor', {
		isIsa: true,
		canProvideName: true
	});
	
	new TagDefinition('file', {
		isIsa: true,
		canProvideName: true,
		isDocspace: true
	});
	
	new TagDefinition('event', {
		isIsa: true,
		canProvideName: true,
		isDocspace: true
	});
	
	new TagDefinition('example', {
		keepsWhitespace: true
	});
	
	new TagDefinition('param', {
		canHaveType: true,
		canHavePname: true,
		canHavePdesc: true
	});
	
	new TagDefinition('returns', {
		canHaveType: true,
		canHavePdesc: true
	});
	
})();