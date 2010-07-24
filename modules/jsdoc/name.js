/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	Functionality relating to symbol name manipulation.
	@module jsdoc/name
 */
(function() {

	var Token  = Packages.org.mozilla.javascript.Token,
		currentModule = '',
		tagDictionary = require('jsdoc/tagdictionary');
	
	exports.setCurrentModule = function(moduleName) {
		currentModule = moduleName;
	}
	
	var puncToScope = { '.':'static', '~':'inner', '#':'instance' },
		scopeToPunc = { 'static':'.', 'inner':'~', 'instance':'#' };
	/**
		Calculates the path, memberof and name values.
		@method resolve
		@param {Doclet} doclet
	 */
	exports.resolve = function(doclet) {
		var kind = doclet.tagValue('kind'),
			ns = '',
			name = doclet.tagValue('name') || '',
			memberof = doclet.tagValue('memberof') || '',
			path,
			scope,
			prefix;

		// only keep the first word of the first tagged name
		name = name.split(/\s+/g)[0]; // TODO allow spaces in quoted names?

		if (currentModule) {
			name = name.replace(/^exports\.(?=.+$)/, currentModule + '.');
		}
		
		path = name = name? (''+name).replace(/\.prototype\.?/g, '#') : '';

		if (memberof) { // @memberof tag given
			// like @name foo.bar, @memberof foo
			if (name.indexOf(memberof) === 0) {
				[prefix, scope, name] = exports.shorten(name);
			}
			else { // like @name bar, @memberof foo
				if ( /([.~#])$/.test(memberof) ) { // like @memberof foo# or @memberof foo~
					path = memberof + name;
					scope = RegExp.$1;
					if (name) { doclet.addTag('scope', puncToScope[scope]); }
				}
				else {
					scope = doclet.getScope();

					if (!scope) {
						scope = 'static'; // default scope is static
						if (name) { doclet.addTag('scope', 'static'); }
						path = memberof + '.' + name;
					}
					else {
						path = memberof + (scopeToPunc[scope] || '.') + name;
					}
				}
			}
		}
		else if (kind !== 'file') {
			[prefix, scope, name] = exports.shorten(name);
			
			if (prefix) {
				doclet.setTag('memberof', prefix);
				if (name) { doclet.addTag('scope', puncToScope[scope]); }
			}
			else if (name) {
				// global symbol
				doclet.addTag('scope', 'global');
			}
		}
		
		// if name doesn't already have a docspace and needs one
		// the namespace should appear in the path but not the name
		if (tagDictionary.lookUp(kind).setsDocletDocspace) {
			if ( /^[a-z_$-]+:(\S+)/i.test(name) ) {
				name = RegExp.$1;
			}
			
			// add doc-namespace to path
			ns = kind + ':';
		}

		if (name) doclet.setTag('name', name);
		
		if (!path && memberof && name.indexOf(memberof) !== 0) {
			path = memberof + (scope? scope : '') + ns  + name;
		}
		else if (ns) { path = ns + name };
		
		if (path) {
			doclet.setTag('path', path);
		}
		
		return path;
	}
	
	
	exports.shorten = function(path) {
		// quoted strings in a path are atomic
		var atoms = [],
			scope; // ., ~, or #
			
		path = path.replace(/(".+?")/g, function($) {
			var token = '@{' + atoms.length + '}@';
			atoms.push($);
			return token;
		});

		var shortname = path.split(/([#.~])/).pop(),
			splitOn = RegExp.$1 || '.',
			scope = splitOn,
			splitAt = path.lastIndexOf(splitOn),
			prefix = (splitOn && splitAt !== -1)? path.slice(0, splitAt) : '';
		
		//if (splitOn === '#' || splitOn === '~') { prefix = prefix + splitOn; }
		
		// restore quoted strings back again
		for (var i = 0, leni = atoms.length; i < leni; i++) {
			prefix = prefix.replace('@{'+i+'}@', atoms[i]);
			shortname = shortname.replace('@{'+i+'}@', atoms[i]);
		}
		
		return [prefix, scope, shortname];
	}
	
	/**
		Resolve how to document the `this.` portion of a symbol name.
	 */
	exports.resolveThis = function(name, node, doclet) {

		var enclosing,
			enclosingDoc,
			memberof = (doclet.tagValue('memberof') || '').replace(/\.prototype\.?/g, '#');

		if (node.parent && node.parent.type === Token.OBJECTLIT) {
			if (enclosing = node.parent) {
				enclosingDoc = exports.docFromNode(enclosing);
				if (enclosingDoc) {
					memberof = (enclosingDoc.tagValue('path') || '').replace(/\.prototype\.?/g, '#');
				
					if (!memberof) {
						memberof = enclosingDoc.path;
						memberof = memberof || '[[anonymousObject]]';
					}
	
					if (memberof) {
						name = memberof + (memberof[memberof.length-1] === '#'?'':'.') + name;
					}
				}
			}
		}
		else if (name.indexOf('this.') === 0) {
			if (!memberof || memberof === 'this') {
				enclosing = node.getEnclosingFunction()
				
				enclosingDoc = exports.docFromNode(enclosing);
				
				if (enclosingDoc) {
					if (enclosingDoc.getScope() === 'inner') memberof = ''; // inner functions have `this` scope of global
					else memberof = enclosingDoc.tagValue('path');
				}
				else {
					memberof = '';
				}
				
				if (enclosing && !memberof) {
					memberof = ''; // [[anonymousFunction]]
					name = name.slice(5); // remove `this.`
				}
				else if (!enclosing) {
					memberof = ''; // [[globalObject]]
				}

				if (memberof || !enclosing) {
					// `this` refers to nearest non-inner member in the name path
					if (enclosingDoc && enclosingDoc.tagValue('kind') !== 'constructor') {
						var parts = memberof.split(/[#~.]/);
						var suffix = parts.pop();
						memberof = memberof.slice(0, -suffix.length); // remove suffix from memberof
					}
					
					var joiner = (memberof === '')? '' : (/[#~.]$/.test(memberof))? '' : '#'; 
					name = memberof + joiner + name.slice(5); // replace `this.` with memberof
				}
			}
			else {
				name = name.slice(5); // this means global?
			}
		}
		return name;
	}

	/**
		Resolve how to document the name of an inner symbol.
	 */
	exports.resolveInner = function(name, node, doclet) {
		var enclosing = node.getEnclosingFunction(),
			enclosingDoc = exports.docFromNode(enclosing);
		
		if (enclosingDoc) {
			memberof = enclosingDoc.tagValue('path');
		}
		else {
			memberof = (enclosing && enclosing.name == '')? '[[anonymous]]' : '';
		}
		if (memberof) {
			name = memberof + '~' + name;
		}
		
		return name;
	}

	/**
		Keep track of anonymous functions that have been assigned to documented symbols.
		@private
		@method docFromNode
		@param {org.mozilla.javascript.ast.AstNode} node
		@return {Object} The associated doclet.
	 */
	exports.docFromNode = function(node) {
		var i = exports.refs.length;
		while (i--) {
			if (exports.refs[i][0] === node) {
				return exports.refs[i][1];
			}
		}
		
		return null;
	}
	// tuples, like [ [noderef, doclet], [noderef, doclet] ]
	exports.refs = [];
	
	function getTypeName(node) {
		return node ? ''+org.mozilla.javascript.Token.typeToName(node.getType()) : '' ;
	}
})();