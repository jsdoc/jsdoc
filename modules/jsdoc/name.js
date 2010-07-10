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
	
	/**
		Calculates the path, memberof and name values.
		@method resolve
		@param {Doclet} doclet
	 */
	exports.resolve = function(doclet) {
		var isa = doclet.tagValue('isa'),
			ns = '',
			name = doclet.tagValue('name') || '',
			memberof = doclet.tagValue('memberof') || '',
			path,
			shortname,
			prefix;
			//,
			//supportedNamespaces = ['module', 'event', 'file'];

		// only keep the first word of the first tagged name
		name = name.split(/\s+/g)[0];

		if (currentModule) {
			name = name.replace(/^exports\.(?=.+$)/, currentModule + '.');
		}
		
		name = name.replace(/\.prototype\.?/g, '#');
		
		path = shortname = name;

		if (memberof) {
			// like @name foo.bar, @memberof foo
			if (name.indexOf(memberof) === 0) {
				path = name;
				[prefix, name] = exports.shorten(name);
			}
		}
		else if (isa !== 'file') {
			[memberof, name] = exports.shorten(name);
			if (memberof) { doclet.setTag('memberof', memberof); }
		}
		
		// if name doesn't already have a docspace and needs one
		// the namespace should appear in the path but not the name
		if (tagDictionary.lookUp(isa).setsDocletDocspace) {
			if ( /^[a-z_$-]+:(\S+)/i.test(name) ) {
				name = RegExp.$1;
			}
			
			// add doc-namespace to path
			ns = isa + ':';
		}

		if (name) doclet.setTag('name', name);
		
		if (memberof && name.indexOf(memberof) !== 0) {
			path = memberof + (/[#~]$/.test(memberof)? '' : '.') + ns + name;
		}
		
		if (path) {
			doclet.setTag('path', path);
		}
		
		return path;
	}
	
	exports.shorten = function(path) {
		// quoted strings in a path are atomic
		var atoms = [],
			cursor = 0;
		path = path.replace(/(".+?")/g, function($) {
			$ = $.slice(1, -1);

			var token = '@' + atoms.length + '@';
			atoms.push($);
			return token;
		});

		var shortname = path.split(/([#.~])/).pop(),
			splitOn = RegExp.$1,
			splitAt = path.lastIndexOf(splitOn),
			prefix = (splitOn && splitAt !== -1)? path.slice(0, splitAt) : '';
		
		if (splitOn === '#' || splitOn === '~') { prefix = prefix + splitOn; }
		
		// restore quoted strings back again
		for (var i = 0, leni = atoms.length; i < leni; i++) {
			prefix = prefix.replace('@'+i+'@', atoms[i]);
			shortname = shortname.replace('@'+i+'@', atoms[i]);
			
			// remove quotes from shortnames
			///^"(.+)"$/.test(shortname);
			//if (RegExp.$1) { shortname = RegExp.$1; }
		}
		
		return [prefix, shortname];
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
				enclosingDoc = exports.docFromNode(enclosing) || {};
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
		else if (name.indexOf('this.') === 0) { // assume `this` refers to innermost constructor
			if (!memberof || memberof === 'this') {
				enclosing = node.getEnclosingFunction()
				
				enclosingDoc = exports.docFromNode(enclosing);
				memberof = enclosingDoc? enclosingDoc.tagValue('path') : '';

				if (enclosing && !memberof) {
					memberof = ''; //[[anonymousFunction]]
					name = name.slice(5); // remove `this.`
				}
				else if (!enclosing) {
					memberof = ''; // [[globalObject]]
				}

				if (memberof || !enclosing) {
					// `this` refers to nearest instance in the name path
					if (enclosingDoc && enclosingDoc.tagValue('isa') !== 'constructor') {
						var parts = memberof.split('#');
						parts.pop();
						memberof = parts.join('#');
					}
					
					name = memberof + (memberof? '#':'') + name.slice(5); // replace `this.` with memberof
				}
			}
			else {
				name = name.slice(5);
			}
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