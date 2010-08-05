(function() {
	var fs = require('common/fs');

	publish = function(docs, opts) { // global
		var classes;
		
		classes = docs.doc.filter(function(element, index, array) {
			return (element.kind === 'constructor');
		});
		
		// add properties and methods
		classes.forEach(function(classElement) {
			classElement.properties = docs.doc.filter(function(memberElement) {
				return (
					memberElement.kind === 'property'
					&& memberElement.memberof === classElement.path
				);
			});
			
			classElement.methods = docs.doc.filter(function(memberElement) {
				return (
					memberElement.kind === 'method'
					&& memberElement.memberof === classElement.path
				);
			});
			
			
		});
		
		
		// templates!
		var normal   = require('normal/template'),
			src      = fs.read( BASEDIR + 'templates/haruki/tmpl/docs.json' ),
			template = normal.compile(src, 
				{
					'filters': {
					'json': function(str) {
							return str.replace(/\\/g, "\\\\")
								.replace(/"/g, '\\"')
								.replace(/\f/g, "\\f")
								.replace(/\n/g, "\\n")
								.replace(/\r/g, "\\r")
								.replace(/\t/g, "\\t");
						}
					}
				}
			);
		
		print( template( {classes: classes} ) );
	}
	
	function getDoc(docpath) {
		var i, doc;
		
		if ( doc = getDoc.cache[docpath] ) {
			return doc;
		}
		
		i = docs.doc.length;
		while (i--) {
			if (docs.doc[i].path === docpath) {
				return docs.doc[i];
			}
		}
	}
	getDoc.cache = {};
	
	// helpers
	publish.summarize = function(desc) { // just the first line
		return /(.*)/.test(desc), RegExp.$1;
	} 

})();