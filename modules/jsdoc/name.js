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
		currentModule = '';
	
	exports.setCurrentModule = function(moduleName) {
		currentModule = moduleName;
	}
	
	/**
		@method resolve
		@param {Doclet} doclet
	 */
	exports.resolve = function(doclet) {
		var denom = doclet.tagText('denom'),
			name = doclet.tagText('name'),
			memberof = doclet.tagText('memberof'),
			path,
			shortname,
			prefix,
			supportedNamespaces = ['module', 'event'];
			
		// only keep the first word of the tagged name
		name = doclet.tagText('name', name.split(/\s+/g)[0]);

		if (currentModule) {
			name = name.replace(/^exports\.(?=.+$)/, currentModule + '.');
		}
		
		name = name.replace(/\.prototype\.?/g, '#');
		
		path = shortname = name;
		
		doclet.tagText('name', shortname);
		
		if (memberof) {
			if (name.indexOf(memberof) === 0) {
				path = name;
				[prefix, shortname] = exports.shorten(name);
				doclet.tagText('name', shortname);
			}
		}
		else {
			[memberof, name] = exports.shorten(name);
			doclet.tagText('memberof', memberof);
			doclet.tagText('name', name);
		}

		// if name doesn't already have a doc-namespace and needs one
		if (!/^[a-z_$-]+:\S+/i.test(name) && supportedNamespaces.indexOf(denom) > -1) {
			// add doc-namespace to path
			name = denom + ':' + name;
		}
		
		// overlapping member of, like @name foo.Bar, @memberof foo
		if (memberof && name.indexOf(memberof) !== 0) {
			path = memberof + (/#$/.test(memberof)? '' : '.') + name;
		}
		
		if (path) doclet.tagText('path', path);
		
		return path;
	}
	
	exports.shorten = function(path) {
		var shortname = path.split(/([#.-])/).pop(),
			splitOn = RegExp.$1,
			splitAt = path.lastIndexOf(splitOn),
			prefix = (splitOn && splitAt !== -1)? path.slice(0, splitAt) : '';
		
		if (splitOn === '#') { prefix = prefix + splitOn; }
		return [prefix, shortname];
	}
	
	/**
		Resolve how to document the `this.` portion of a symbol name.
	 */
	exports.resolveThis = function(name, node, doclet) {
		var enclosing,
			enclosingDoc,
			memberof = (doclet.tagText('memberof') || '').replace(/\.prototype\.?/g, '#');

		if (node.parent && node.parent.type === Token.OBJECTLIT) {
			if (enclosing = node.parent) {
				enclosingDoc = exports.docFromNode(enclosing) || {};
				memberof = (enclosingDoc.tagText('path') || '').replace(/\.prototype\.?/g, '#');
			
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
				memberof = enclosingDoc? enclosingDoc.tagText('path') : '';

				if (enclosing && !memberof) {
					memberof = ''; //[[anonymousFunction]]
					name = name.slice(5); // remove `this.`
				}
				else if (!enclosing) {
					memberof = ''; // [[globalObject]]
				}

				if (memberof || !enclosing) {
					// `this` refers to nearest instance in the name path
					if (enclosingDoc && enclosingDoc.tagText('denom') !== 'constructor') {
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