(function() {
	var name = require('jsdoc/name'),
		doclet = require('jsdoc/doclet'),
		doclets = require('jsdoc/docset').doclets,
		Token  = Packages.org.mozilla.javascript.Token;
		
	exports.result = doclets;
	
	/**
	 */
	function visitNode(node) {
		var commentSrc = '',
			thisDoclet = null,
			thisDocletName = '';
		
		// look for all comments that have names provided
		if (node.type === Token.SCRIPT && node.comments) { 			
			for each (var comment in node.comments.toArray()) {
				if (comment.commentType === Token.CommentType.JSDOC) {
					commentSrc = '' + comment.toSource();

					if (commentSrc) {
						thisDoclet = doclet.makeDoclet(commentSrc, comment, currentSourceName);
						if ( thisDoclet.hasTag('name') ) {
							doclets.push(thisDoclet);
							if (thisDoclet.tagText('denom') === 'module') {
								name.setCurrentModule( thisDoclet.tagText('path') );
							}
						}
					}
				}
			}
		}
		
		// like function foo() {}
		if (node.type == Token.FUNCTION) {
			if (node.jsDoc) {
				commentSrc = '' + node.jsDoc;
				
				if (commentSrc) {
					thisDoclet = doclet.makeDoclet(commentSrc, node, currentSourceName);
					thisDocletName = thisDoclet.tagText('path');
					
					if (!thisDocletName) {
						thisDoclet.setName('' + node.name);
						doclets.push(thisDoclet);
					}
					
					name.refs.push([node, thisDoclet]);
				}
			}
			
			return true;
		}
		
		// like foo = function(){} or foo: function(){}
		if (node.type === Token.ASSIGN || node.type === Token.COLON) {
			var nodeName = nodeToString(node.left),
				nodeKind = '';
			commentSrc = node.jsDoc || node.left.jsDoc;

			if (commentSrc) {
				commentSrc = '' + commentSrc;

				thisDoclet = doclet.makeDoclet(commentSrc, node, currentSourceName);
				thisDocletName = thisDoclet.tagText('name');
				nodeKind = thisDoclet.tagText('denom');

				if (!thisDocletName) {
					nodeName = name.resolveThis( nodeName, node, thisDoclet );
					thisDoclet.setName(nodeName);
					doclets.push(thisDoclet);
				}
				name.refs.push([node.right, thisDoclet]);
			}
			
			return true;
		}
		
		// like var foo = function(){} or var bar = {}
		if (node.type == Token.VAR || node.type == Token.LET  || node.type == Token.CONST) {
			var counter = 0,
				nodeKind;
			
			if (node.variables) for each (var n in node.variables.toArray()) {

				if (n.target.type === Token.NAME && n.initializer) {
					commentSrc = (counter++ === 0 && !n.jsDoc)? node.jsDoc : n.jsDoc;
					if (commentSrc) {
						thisDoclet = doclet.makeDoclet('' + commentSrc, node, currentSourceName);
						thisDocletName = thisDoclet.tagText('path');
						nodeKind = thisDoclet.tagText('denom');
						
						if ( !thisDocletName ) {
							thisDocletName = n.target.string;
							thisDoclet.setName(thisDocletName);
							doclets.push(thisDoclet);
						}
					}
				}
				name.refs.push([n.initializer, thisDoclet]);
			}
			return true;
		}
		
		return true;
	}
	
	var currentSourceName = '';
	
	/**
	 */
	exports.parseSource = function(source, sourceName) {
		currentSourceName = sourceName;
		var ast = getParser().parse(source, sourceName, 1);
			
		ast.visit(
			new Packages.org.mozilla.javascript.ast.NodeVisitor({
				visit: visitNode
			})
		);
		
		currentSourceName = '';
	}
	
	/**
	 */
	exports.parseFiles = function(sourceFiles, encoding) {
		var ast = getParser(),
			fs = require('common/fs'),
			source = '';
		
		if (arguments.length === 0) {
			throw 'module:jsdoc/parser.parseFiles requires argument sourceFiles(none provided).';
		}
		
		if (typeof sourceFiles[0] === 'string') { sourceFiles = [sourceFiles]; }
		
		for (i = 0, leni = sourceFiles.length; i < leni; i++) {
			try {
				source = fs.read(sourceFiles[i], encoding);
			}
			catch(e) {
				print('FILE READ ERROR: ' + e);
				continue;
			}
			
			exports.parseSource(source, sourceFiles[i]);
		}
	}
	
	/**
		@private
		@function getParser
	 */
	function getParser() {
		var cx = Packages.org.mozilla.javascript.Context.getCurrentContext();
		
		var ce = new Packages.org.mozilla.javascript.CompilerEnvirons();
		ce.setRecordingComments(true);
		ce.setRecordingLocalJsDocComments(true);
		ce.initFromContext(cx);
		return new Packages.org.mozilla.javascript.Parser(ce, ce.getErrorReporter());
	}
	
	/**
		@private
		@function nodeToString
		@param {org.mozilla.javascript.ast.AstNode} node
		@returns {string}
	 */
	// credit: ringojs ninjas
	function nodeToString(node) {
		var str;
		
		if (node.type === Token.GETPROP) {
			str = [nodeToString(node.target), node.property.string].join('.');
		}
		else if (node.type === Token.NAME) {
			str = node.string;
		}
		else if (node.type === Token.STRING) {
			str = node.value;
		}
		else if (node.type === Token.THIS) {
			str = 'this';
		}
		else if (node.type === Token.GETELEM) {
			str = node.toSource(); // like: Foo['Bar']
		}
		else {
			str = getTypeName(node);
		}
		
		return '' + str;
	};
	
	/**
		@private
		@function getTypeName
		@param {org.mozilla.javascript.ast.AstNode} node
		@returns {string}
	 */
	// credit: ringojs ninjas
	function getTypeName(node) {
		return node ? ''+Packages.org.mozilla.javascript.Token.typeToName(node.getType()) : '' ;
	}
	
})();